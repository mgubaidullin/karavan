package org.apache.camel.karavan.git;

import io.vertx.core.Vertx;
import org.apache.camel.karavan.fs.FileSystemService;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.errors.RepositoryNotFoundException;
import org.eclipse.jgit.transport.URIish;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

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

    public void save(String branch, String fileName, String yaml) throws GitAPIException, IOException, URISyntaxException {
        LOGGER.info("Save " + fileName);
        String dir;
        Git git;
        try {
            dir = pullIntegrations(branch);
            git = Git.open(Path.of(dir).toFile());
        } catch (RepositoryNotFoundException e) {
            dir = vertx.fileSystem().createTempDirectoryBlocking(branch);
            git = Git.init().setInitialBranch(branch).setDirectory(Path.of(dir).toFile()).call();
            git.remoteAdd().setName("origin").setUri(new URIish(uri)).call();
        }
        fileSystemService.saveFile(dir, fileName, yaml);
        fileSystemService.createKustomization(dir);
        commitAndPush(git, branch, fileName);
    }

    public void delete(String branch, String fileName) throws GitAPIException, IOException, URISyntaxException {
        LOGGER.info("Delete " + fileName);
        String dir = pullIntegrations(branch);
        Git git = Git.open(Path.of(dir).toFile());
        fileSystemService.delete(dir, fileName);
        fileSystemService.createKustomization(dir);
        commitAndPush(git, branch, fileName);
    }

    public void commitAndPush(Git git, String branch, String fileName) throws GitAPIException, IOException, URISyntaxException {
        LOGGER.info("Commit and push changes for " + fileName);
        LOGGER.info("Git add: " + git.add().addFilepattern(fileName).call());
        LOGGER.info("Git add: " + git.add().addFilepattern(FileSystemService.kustomization).call());
        LOGGER.info("Git commit: " + git.commit().setAll(true).setMessage(LocalDate.now().toString()).call());
        LOGGER.info("Git push: " + git.push().add(branch).setRemote("origin").setCredentialsProvider(new UsernamePasswordCredentialsProvider(username, password)).call());
    }

    public String pullIntegrations(String branch) throws GitAPIException {
        String dir = vertx.fileSystem().createTempDirectoryBlocking(branch);
        LOGGER.info("Pulling into " + dir);
        try {
            Git git = clone(branch, dir);
            LOGGER.info("Git pull branch : " + git.pull().call());
            if (fileSystemService.getIntegrationList(branch).isEmpty()) {
                LOGGER.info("Git pull remote branch : " + git.pull().setRemoteBranchName(mainBranch).call());
            }
            LOGGER.info("Git status: " + git.status().call());
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        return dir;
    }

    private Git clone(String branch, String dir) throws GitAPIException {
        return Git.cloneRepository()
                .setDirectory(Paths.get(dir).toFile())
                .setURI(uri)
                .setBranch(branch)
                .call();
    }
}
