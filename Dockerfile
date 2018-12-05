FROM java:8
LABEL maintainer="jonas.kreling@supero.com.br"
VOLUME /tmp
EXPOSE 8080
ADD target/spring-boot-data-jpa-prova-0.0.1-SNAPSHOT.jar spring-boot-data-jpa-prova-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","spring-boot-data-jpa-prova-0.0.1-SNAPSHOT.jar"]