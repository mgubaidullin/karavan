package org.apache.camel.karavan;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.reactive.RestResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Map;

@Path("/configuration")
public class ConfigurationResource {

    @ConfigProperty(name = "karavan.version")
    String version;

    @ConfigProperty(name = "karavan.git.uri")
    String uri;

    @ConfigProperty(name = "karavan.git.path")
    String path;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<Map<String, String>> getVersion() throws Exception {
        return RestResponse.ResponseBuilder.ok(
                Map.of(
                        "version", version,
                        "karavan.git.uri", uri,
                        "karavan.git.path", path
                )
        ).build();
    }

}