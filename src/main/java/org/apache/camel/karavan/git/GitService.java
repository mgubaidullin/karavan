package org.apache.camel.karavan.git;

import io.vertx.core.Vertx;
import org.apache.camel.karavan.fs.FileSystemService;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.HeaderParam;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class GitService {

    @ConfigProperty(name = "karavan.folder.integrations")
    String integrations;

    @ConfigProperty(name = "karavan.git.uri")
    String uri;

    @ConfigProperty(name = "karavan.git.username")
    String username;

    @ConfigProperty(name = "karavan.git.password")
    String password;

    @ConfigProperty(name = "karavan.git.main")
    String mainBranch;

    @Inject
    Vertx vertx;

    @Inject
    FileSystemService fileSystemService;

    private static final Logger LOGGER = Logger.getLogger(GitService.class.getName());

    public void cloneRepo() throws GitAPIException {
        LOGGER.info("Cloning repository...");
        try (Git git = Git.cloneRepository().setDirectory(Path.of(integrations).toFile()).setURI(uri).call()) {
            LOGGER.info("Git status: " + git.status().call());
        }
    }

    public void commitAndPush(String folder, String branch, String fileName, String message) throws GitAPIException, IOException {
        LOGGER.info("Push changes for " + fileName);
        try (Git git = Git.open(Path.of(folder).toFile())) {
            LOGGER.info("Git add: " + git.add().addFilepattern(FileSystemService.kustomization).call());
            LOGGER.info("Git add: " + git.add().addFilepattern(fileName).call());
            LOGGER.info("Git commit: " + git.commit().setMessage(message).call());
            LOGGER.info("Git push: " + git.push().setCredentialsProvider(new UsernamePasswordCredentialsProvider(username, password)).call());
        }
    }

    public String pullIntegrations(String branch) throws GitAPIException {
        String dir = vertx.fileSystem().createTempDirectoryBlocking(branch);
        System.out.println(dir);
        try {
            Git git = clone(branch, dir);
            if (fileSystemService.getIntegrationList(branch).isEmpty()) {
                LOGGER.info("Git pull remote branch : " + git.pull().setRemoteBranchName(mainBranch).call());
            }
            LOGGER.info("Git status: " + git.status().call());
        } catch (Exception e){
            LOGGER.info(e.getMessage());
        }
        return dir;
    }

    private Git clone (String branch, String dir) throws GitAPIException {
        return  Git.cloneRepository()
                .setDirectory(Paths.get(dir).toFile())
                .setURI(uri)
                .setBranchesToClone(List.of(branch, mainBranch))
                .call();
    }
}
