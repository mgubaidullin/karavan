package org.apache.camel.karavan;

import io.quarkus.runtime.StartupEvent;
import org.apache.camel.karavan.fs.FileSystemService;
import org.apache.camel.karavan.git.GitService;
import org.apache.camel.karavan.kamelet.KameletService;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.IOException;

@ApplicationScoped
public class KaravanLifecycleBean {

    @ConfigProperty(name = "karavan.folder.sync")
    Boolean sync;

    @ConfigProperty(name = "karavan.kamelets.create-defaults")
    Boolean createKamelets;

    @Inject
    FileSystemService fileSystemService;

    @Inject
    GitService gitService;

    @Inject
    KameletService kameletService;

    private static final Logger LOGGER = Logger.getLogger(KaravanLifecycleBean.class.getName());

    void onStart(@Observes StartupEvent ev) throws IOException, GitAPIException {
        LOGGER.info("Karavan is starting...");
        fileSystemService.prepareFolders();
        if (createKamelets){
            kameletService.createDefaultKamelets();
        }
        if (sync) {
            gitService.cloneRepo();
        }
    }
}
