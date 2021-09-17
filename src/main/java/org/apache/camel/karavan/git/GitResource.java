package org.apache.camel.karavan.git;

import org.eclipse.jgit.api.errors.GitAPIException;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/git")
public class GitResource {

    @Inject
    GitService gitService;

   @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.TEXT_PLAIN)
    @Path("/push")
    public String push(String message) throws GitAPIException, IOException {
        gitService.commitAndPush(message);
        return message;
    }
}