package org.apache.camel.karavan.kamelet;

import io.vertx.core.Vertx;
import org.apache.camel.kamelets.catalog.KameletsCatalog;
import org.apache.commons.io.IOUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@ApplicationScoped
public class KameletService {

    @ConfigProperty(name = "karavan.folder.root")
    String root;

    @ConfigProperty(name = "karavan.folder.kamelets")
    String kamelets;

    @Inject
    Vertx vertx;

    private static final Logger LOGGER = Logger.getLogger(KameletService.class.getName());

    public void createDefaultKamelets(){
        LOGGER.info("Creating default Kamelets");
        KameletsCatalog catalog = new KameletsCatalog();
        catalog.getKamelets().entrySet().stream()
                .map(k -> k.getValue().getMetadata().getName())
                .forEach(name -> saveKamelet(name));
        LOGGER.info("Created default Kamelets");
    }

    public void saveKamelet(String name) {
        LOGGER.info("Creating kamelet " + name);
        String fileName = name + ".kamelet.yaml";
        InputStream inputStream = KameletsCatalog.class.getResourceAsStream("/kamelets/" + fileName);
        try {
        File targetFile = Paths.get(root, kamelets, fileName).toFile();
        Files.copy(inputStream,targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(inputStream);
        }

    }
}
