package org.apache.camel.karavan.git;

import io.vertx.core.Vertx;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.nio.file.Path;

@ApplicationScoped
public class GitService {

    @ConfigProperty(name = "karavan.folder.root")
    String root;

    @ConfigProperty(name = "karavan.folder.integrations")
    String integrations;

    @Inject
    Vertx vertx;

    private static final Logger LOGGER = Logger.getLogger(GitService.class.getName());

    public void cloneRepo() throws GitAPIException {
        LOGGER.info("Cloning repository...");
        String uri = ConfigProvider.getConfig().getValue("karavan.git.uri", String.class);
        try (Git git = Git.cloneRepository().setDirectory(Path.of(root, integrations).toFile()).setURI(uri).call()) {
            LOGGER.info("Git clone status: " + git.status().call());
        }
    }
}
