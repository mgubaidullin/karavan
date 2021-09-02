package org.apache.camel.karavan;

import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class KaravanLifecycleBean {

    @ConfigProperty(name = "karavan.folder")
    String folder;

    @ConfigProperty(name = "karavan.path")
    String path;

    @ConfigProperty(name = "karavan.sync")
    String sync;

    @Inject
    Vertx vertx;

    private static final Logger LOGGER = Logger.getLogger(KaravanLifecycleBean.class.getName());

    void onStart(@Observes StartupEvent ev) throws IOException, GitAPIException {
        LOGGER.info("Karavan is starting...");
        File dir = Paths.get(folder).toFile();
        if ("git".equals(sync)) {
            if (vertx.fileSystem().existsBlocking(folder)) {
                vertx.fileSystem().deleteRecursiveBlocking(folder, true);
            }
            Files.createDirectory(dir.toPath());
            String uri = ConfigProvider.getConfig().getValue("karavan.git.uri", String.class);
            try (Git git = Git.cloneRepository().setDirectory(dir).setURI(uri).call()) {
                LOGGER.info("Git clone status: " + git.status().call());
            }
        } else {
            if (!vertx.fileSystem().existsBlocking(folder)) {
                Files.createDirectories(Path.of(folder, path));
            }

        }
    }
}
