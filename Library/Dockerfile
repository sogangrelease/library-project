FROM gradle:8.4-jdk21 AS build
WORKDIR /app
COPY --chown=gradle:gradle . .

RUN ./gradlew bootJar --no-daemon -x test

FROM eclipse-temurin:21-jre-jammy

COPY --from=build /app/build/libs/*.jar /app/app.jar
WORKDIR /app
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE ${PORT}

ENTRYPOINT exec java -jar -Dserver.port=${PORT} /app/app.jar
