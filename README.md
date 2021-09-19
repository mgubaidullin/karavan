# Karavan
Integration Designer for Apache Camel

![](karavan.png)

## Running the application in dev mode
You can run your application in dev mode that enables live coding using:
### Backend
```shell script
mvn compile quarkus:dev
```
### Frontend
```shell script
cd src/main/webapp/
npm start
```

## Packaging and running in local mode
### Packaging 
The application can be packaged using:
```shell script
mvn clean package -Dquarkus.container-image.build=true
```

### Run 
```shell script
docker run -it -p 8080:8080 -e KARAVAN_MODE=local -v $(pwd):/deployments/integrations  entropy1/karavan
```

## Running in cloud mode


[Karavan demo on Openshift](openshift/README.md)