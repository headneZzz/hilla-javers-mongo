FROM maven:3.8.2-jdk-11

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

WORKDIR /
COPY . .

RUN mvn clean package -Pproduction
CMD java -jar target/hilla-grocery-app-1.0-SNAPSHOT.jar

#RUN ./mvnw

EXPOSE 8080
