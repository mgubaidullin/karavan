package org.apache.camel;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/integration")
public class IntegrationResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public List<String> get() {
        return List.of("demo1.yaml", "demo2.yaml");
    }
}