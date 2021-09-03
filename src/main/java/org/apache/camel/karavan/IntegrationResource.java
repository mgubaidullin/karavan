package org.apache.camel.karavan;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Path("/integration")
public class IntegrationResource {

    @ConfigProperty(name = "karavan.folder")
    String folder;

    @ConfigProperty(name = "karavan.path")
    String path;

    @Inject
    Vertx vertx;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getList() {
        return vertx.fileSystem().readDirBlocking(Paths.get(folder, path).toString())
                .stream()
                .filter(s -> s.endsWith(".yaml"))
                .map(s -> {
                    String[] parts = s.split("/");
                    return parts[parts.length - 1];
                }).collect(Collectors.toList());
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String getYaml(@PathParam("name") String name) {
        return vertx.fileSystem().readFileBlocking(Paths.get(folder, path, name).toString()).toString();
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String postYaml(@PathParam("name") String name, String yaml) {
        vertx.fileSystem().writeFileBlocking(Paths.get(folder, path, name).toString(), Buffer.buffer(yaml));
        return yaml;
    }

    @DELETE
    @Path("/{name}")
    public void delete(@PathParam("name") String name) {
        vertx.fileSystem().deleteBlocking(Paths.get(folder, path, name).toString());
    }
}