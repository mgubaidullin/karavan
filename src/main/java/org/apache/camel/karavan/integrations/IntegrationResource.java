package org.apache.camel.karavan.integrations;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import org.apache.camel.catalog.CamelCatalog;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Path("/integration")
public class IntegrationResource {

    private static final String FILENAME = "kustomization.yaml";

    @ConfigProperty(name = "karavan.folder.root")
    String root;

    @ConfigProperty(name = "karavan.folder.integrations")
    String integrations;

    @Inject
    Vertx vertx;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getList() {
        return vertx.fileSystem().readDirBlocking(Paths.get(root, integrations).toString())
                .stream()
                .filter(s -> s.endsWith(".yaml"))
                .filter(s -> !s.endsWith(FILENAME))
                .map(s -> {
                    String[] parts = s.split("/");
                    return parts[parts.length - 1];
                }).collect(Collectors.toList());
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String getYaml(@PathParam("name") String name) {
        return vertx.fileSystem().readFileBlocking(Paths.get(root, integrations, name).toString()).toString();
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String postYaml(@PathParam("name") String name, String yaml) {
        vertx.fileSystem().writeFileBlocking(Paths.get(root, integrations, name).toString(), Buffer.buffer(yaml));
        createKustomization();
        return yaml;
    }

    @DELETE
    @Path("/{name}")
    public void delete(@PathParam("name") String name) {
        vertx.fileSystem().deleteBlocking(Paths.get(root, integrations, name).toString());
    }

    private void createKustomization(){
        StringBuilder template = new StringBuilder(getTemplate()).append("\n");
        Arrays.stream(Paths.get(root, integrations).toFile().list())
                .filter(s -> !s.equalsIgnoreCase(FILENAME))
                .forEach(s -> template.append("  - ").append(s).append("\n"));
        Buffer kust = Buffer.buffer(template.toString());
        vertx.fileSystem().writeFileBlocking(Paths.get(root, integrations, FILENAME).toString(), kust);
    }

    private String getTemplate() {
        try {
            InputStream inputStream = this.getClass().getResourceAsStream("/kustomization.yaml");
            String data = new BufferedReader(new InputStreamReader(inputStream))
                    .lines().collect(Collectors.joining(System.getProperty("line.separator")));
            return data;
        } catch (Exception e) {
            return null;
        }
    }
}