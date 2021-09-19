package org.apache.camel.karavan.integrations;

import io.vertx.core.Vertx;
import org.apache.camel.karavan.fs.FileSystemService;
import org.apache.camel.karavan.git.GitService;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Path("/integration")
public class IntegrationResource {

    private static final String FILENAME = "kustomization.yaml";

    @ConfigProperty(name = "karavan.mode", defaultValue = "local")
    String mode;

    @Inject
    Vertx vertx;

    @Inject
    GitService gitService;

    @Inject
    FileSystemService fileSystemService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getList(@HeaderParam("username") String username) throws GitAPIException {
        if (mode.equals("cloud")){
            String dir = gitService.pullIntegrations(username);
            return fileSystemService.getIntegrationList(dir);
        } else {
            return fileSystemService.getIntegrationList();
        }
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String getYaml(@HeaderParam("username") String username, @PathParam("name") String name) throws GitAPIException {
        if (mode.equals("cloud")){
            String dir = gitService.pullIntegrations(username);
            return fileSystemService.getFile(dir, name);
        } else {
            return fileSystemService.getIntegrationsFile(name);
        }
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String save(@HeaderParam("username") String username, @PathParam("name") String name, String yaml) throws GitAPIException, IOException {
        if (mode.equals("cloud")){
            String dir = gitService.pullIntegrations(username);
            fileSystemService.saveFile(dir, name, yaml);
            fileSystemService.createKustomization(dir);
            gitService.commitAndPush(dir, username, name, LocalDate.now().toString());
        } else {
            fileSystemService.saveIntegrationsFile(name, yaml);
            fileSystemService.createIntegrationsKustomization();
        }
        return yaml;
    }

    @DELETE
    @Path("/{name}")
    public void delete(@HeaderParam("username") String username, @PathParam("name") String name) throws GitAPIException, IOException {
        if (mode.equals("cloud")){
            String dir = gitService.pullIntegrations(username);
            fileSystemService.delete(dir, name);
            fileSystemService.createKustomization(dir);
            gitService.commitAndPush(dir, username, name, LocalDate.now().toString());
        } else {
            fileSystemService.deleteIntegration(name);
            fileSystemService.createIntegrationsKustomization();
        }
    }
}