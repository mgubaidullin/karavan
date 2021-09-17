package org.apache.camel.karavan.git;

import io.vertx.core.Vertx;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.nio.file.Path;

@ApplicationScoped
public class GitService {

    private static final String FILENAME = "kustomization.yaml";

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
            LOGGER.info("Git status: " + git.status().call());
        }
    }

    public void commitAndPush(String name, String message) throws GitAPIException, IOException {
        LOGGER.info("Push changes for " + name);
        String username = ConfigProvider.getConfig().getValue("karavan.git.username", String.class);
        String password = ConfigProvider.getConfig().getValue("karavan.git.password", String.class);
        try (Git git = Git.open(Path.of(root, integrations).toFile())) {
            LOGGER.info("Git add: " + git.add().addFilepattern(FILENAME).call());
            LOGGER.info("Git add: " + git.add().addFilepattern(name).call());
            LOGGER.info("Git commit: " + git.commit().setMessage(message).call());
            LOGGER.info("Git push: " + git.push().setCredentialsProvider(new UsernamePasswordCredentialsProvider(username, password)).call());
        }
    }
}
