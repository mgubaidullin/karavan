package org.apache.camel.karavan;

import org.apache.camel.kamelets.catalog.KameletsCatalog;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Path("/kamelet")
public class KameletResources {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getList() {
        KameletsCatalog catalog = new KameletsCatalog();
        return catalog.getKamelets().entrySet().stream()
                .map(k -> k.getValue().getMetadata().getName())
                .collect(Collectors.toList());
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/{name}")
    public String getYaml(@PathParam("name") String name) {
        InputStream inputStream = KameletsCatalog.class.getResourceAsStream("/kamelets/" + name + ".kamelet.yaml");
        return new BufferedReader(new InputStreamReader(inputStream))
                .lines().collect(Collectors.joining(System.getProperty("line.separator")));
    }
}
