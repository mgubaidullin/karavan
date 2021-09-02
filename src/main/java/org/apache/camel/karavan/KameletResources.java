package org.apache.camel.karavan;

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


import io.quarkus.runtime.StartupEvent;
import io.vertx.core.json.JsonArray;
import org.apache.camel.kamelets.catalog.KameletsCatalog;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.yaml.snakeyaml.Yaml;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Paths;
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
