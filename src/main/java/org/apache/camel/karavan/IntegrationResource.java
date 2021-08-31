package org.apache.camel.karavan;

import io.vertx.core.Vertx;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Path("/integration")
public class IntegrationResource {

    @ConfigProperty(name = "karavan.folder")
    String folder;

    @ConfigProperty(name = "karavan.git.path")
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
}