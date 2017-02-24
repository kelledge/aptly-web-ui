FROM maven:3.3.9-jdk-8

ENV GEN_DIR /opt/swagger-codegen
ENV CLI_JAR ${GEN_DIR}/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar
ENV COMMIT d11d0f88bb032d4a3302f90ab3addeb1a6b0559b

RUN git clone --depth=1 https://github.com/swagger-api/swagger-codegen.git ${GEN_DIR} && \
    cd ${GEN_DIR} && \
    git checkout ${COMMIT}

WORKDIR ${GEN_DIR}
RUN mvn -am -pl "modules/swagger-codegen-cli" package

ADD entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
