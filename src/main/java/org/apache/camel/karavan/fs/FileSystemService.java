package org.apache.camel.karavan.fs;

import io.vertx.core.Vertx;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@ApplicationScoped
public class FileSystemService {

    @ConfigProperty(name = "karavan.folder.root")
    String root;

    @ConfigProperty(name = "karavan.folder.integrations")
    String integrations;

    @ConfigProperty(name = "karavan.folder.kamelets")
    String kamelets;

    @ConfigProperty(name = "karavan.folder.cleanup")
    Boolean cleanup;

    @Inject
    Vertx vertx;

    private static final Logger LOGGER = Logger.getLogger(FileSystemService.class.getName());

    public void prepareFolders() throws IOException {
        LOGGER.info("Prepare root folder...");
        if (cleanup) {
            if (vertx.fileSystem().existsBlocking(root)) {
                vertx.fileSystem().deleteRecursiveBlocking(root, true);
            }
            createFolders();
        } else {
            if (!vertx.fileSystem().existsBlocking(root)) {
                createFolders();
            }
        }
    }

    void createFolders() throws IOException {
        LOGGER.info("Create folders...");
        Files.createDirectories(Path.of(root, integrations));
        Files.createDirectories(Path.of(root, kamelets));
    }

    public void sync() throws GitAPIException {
        String uri = ConfigProvider.getConfig().getValue("karavan.git.uri", String.class);
        try (Git git = Git.cloneRepository().setDirectory(Path.of(root, integrations).toFile()).setURI(uri).call()) {
            LOGGER.info("Git clone status: " + git.status().call());
        }
    }
}
