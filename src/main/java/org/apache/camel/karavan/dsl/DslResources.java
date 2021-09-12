package org.apache.camel.karavan.dsl;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import org.apache.camel.catalog.DefaultCamelCatalog;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Path("/dsl")
public class DslResources {

    @Inject
    Vertx vertx;

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public String get() {


//        JsonObject json = new JsonObject(getDsl());
//
//        json.getJsonObject("items").getJsonObject("definitions").stream()
//                        .filter(s -> s.getKey().startsWith("org.apache.camel.model.")
//                        && !s.getKey().replace("org.apache.camel.model.", "").contains("."))
//                                .forEach(s -> System.out.println(s.getKey()));
//
//        List<String> models = getModels();
//        models.stream().map(s -> new JsonObject(getModel(s)))
//                .filter(json -> json.getJsonObject("model").getString("label").contains("eip"))
//                .forEach(json -> {
//                    System.out.println(json.getJsonObject("model"));
//                    System.out.println("");
//                });
//        return new JsonObject().toString();
//    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/model")
    public List<String> getModels() {
        InputStream inputStream = DefaultCamelCatalog.class.getResourceAsStream("/org/apache/camel/catalog/models.properties");
        return new BufferedReader(new InputStreamReader(inputStream))
                .lines().collect(Collectors.toList());
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/model/{name}")
    public Response getModel(@PathParam("name") String name) {
        try {
            InputStream inputStream = DslResources.class.getResourceAsStream("/org/apache/camel/catalog/models/" + name + ".json");
            String data = new BufferedReader(new InputStreamReader(inputStream))
                    .lines().collect(Collectors.joining(System.getProperty("line.separator")));
            return Response.ok(data).build();
        } catch (Exception e){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    public String getDsl() {
        InputStream inputStream = DslResources.class.getResourceAsStream("/schema/camel-yaml-dsl.json");
        return new BufferedReader(new InputStreamReader(inputStream))
                .lines().collect(Collectors.joining(System.getProperty("line.separator")));
    }
}
