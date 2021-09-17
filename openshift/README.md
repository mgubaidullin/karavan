# Karavan demo on Openshift

### Deploy Operators
Deploy GitOps and Camel-K operators
```shell
oc apply -k operators
```
Deploy Apps (ArgoCD, Gitea, Karavan)
```shell
oc apply -k apps
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

### Help
To find the default admin password for Argo CD using the cli, run:

```
oc get secret openshift-gitops-cluster \
    -n openshift-gitops \
    -o jsonpath='{.data.admin\.password}' | base64 -d
```