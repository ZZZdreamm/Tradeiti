FROM maven:3-amazoncorretto-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
RUN mvn wrapper:wrapper

FROM amazoncorretto:21
WORKDIR /app
COPY --from=build /app/target/TradEitiBackend.jar .
EXPOSE 8090
CMD ["java", "-jar", "TradEitiBackend.jar"]