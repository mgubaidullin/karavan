package org.apache.camel.karavan;

import io.quarkus.runtime.StartupEvent;
import org.apache.camel.karavan.fs.FileSystemService;
import org.apache.camel.karavan.kamelet.KameletService;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.IOException;

@ApplicationScoped
public class KaravanLifecycleBean {

    @ConfigProperty(name = "karavan.mode", defaultValue = "local")
    String mode;

    @ConfigProperty(name = "karavan.kamelets.create")
    Boolean createKamelets;

    @Inject
    FileSystemService fileSystemService;

    @Inject
    KameletService kameletService;

    private static final Logger LOGGER = Logger.getLogger(KaravanLifecycleBean.class.getName());

    void onStart(@Observes StartupEvent ev) throws IOException {
        LOGGER.info("Karavan is starting in " + mode + " mode");
        if (createKamelets){
            fileSystemService.createKameletsFolder();
            kameletService.createDefaultKamelets();
        }
        if (mode.equals("local")) {
            fileSystemService.createIntegrationsFolder();
        }
    }
}
