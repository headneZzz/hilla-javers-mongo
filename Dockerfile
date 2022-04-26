FROM maven:3.8.2-jdk-11 as maven
COPY . /home/maven/project/hilla-grocery
WORKDIR /home/maven/project/hilla-grocery
RUN mvn clean package -Pproduction

FROM openjdk:11-jdk

ARG REFRESHED_AT
ENV REFRESHED_AT $REFRESHED_AT

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -qq --no-install-recommends \
    nodejs \
    yarn \
  && apt-get upgrade -qq \
  && rm -rf /var/lib/apt/lists/*

COPY --from=maven /home/maven/project/hilla-grocery/target/hilla*.jar /hilla.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/hilla.jar"]
