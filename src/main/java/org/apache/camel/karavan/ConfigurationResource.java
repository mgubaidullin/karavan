package org.apache.camel.karavan;

import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.reactive.RestResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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
    public RestResponse<Map<String, Object>> getConfiguration() throws Exception {

        List<String> catalogs = StreamSupport.stream(ConfigProvider.getConfig().getPropertyNames().spliterator(), false)
                .filter(s -> s.startsWith("karavan.kamelets.catalog"))
                .map(s -> ConfigProvider.getConfig().getValue(s, String.class))
                .collect(Collectors.toList());

        return RestResponse.ResponseBuilder.ok(
                Map.of(
                        "karavan.version", version,
                        "karavan.git.uri", uri,
                        "karavan.git.path", path,
                        "karavan.catalogs", catalogs
                )
        ).build();
    }

}