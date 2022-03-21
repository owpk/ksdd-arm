FROM gradle:7.4.1-jdk11-alpine AS build
COPY --chown=gradle:gradle ./ksdd-server /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon 

FROM openjdk:11-jre-slim

EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*SHOT.jar /app/server.jar

ENTRYPOINT ["java", "-jar", "/app/server.jar"]
