package org.apache.camel.karavan.git;

import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@ApplicationScoped

public class GitLifecycleBean {

    @ConfigProperty(name = "karavan.folder")
    String folder;

    @ConfigProperty(name = "karavan.git.uri")
    String uri;

    @Inject
    Vertx vertx;

    private static final Logger LOGGER = Logger.getLogger(GitLifecycleBean.class.getName());

    void onStart(@Observes StartupEvent ev) throws IOException, GitAPIException {
        LOGGER.info("The application is starting...");
        File dir = Paths.get(folder).toFile();

        if (vertx.fileSystem().existsBlocking(folder)){
            vertx.fileSystem().deleteRecursiveBlocking(folder, true);
        }
        Files.createDirectory(dir.toPath());

        try (Git git = Git.cloneRepository().setDirectory(dir).setURI(uri).call()) {
            System.out.println(git.status().call());
        }
    }
}
