# Karavan demo on Openshift

### Deploy
```shell
oc apply -k .
```

### Configure Gitea

- dbuser: `gitea`
- password: `password`
- root password: `password`
- database: `giteadb`
- mysql url: `giteadb:3306`

### Create Gitea user

- username: `git`
- password: `gitgit`
