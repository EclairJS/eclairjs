# Copyright (c) IBM.
FROM jupyter/minimal-kernel


USER root



# Java 8
RUN echo "deb http://http.debian.net/debian jessie-backports main" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y -t jessie-backports install openjdk-8-jdk
RUN update-java-alternatives -s java-1.8.0-openjdk-amd64


# Spark dependencies
ENV APACHE_SPARK_VERSION 2.0.0
RUN apt-get update && apt-get install -yq --no-install-recommends wget

RUN apt-get -y update && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
#echo "439fe7793e0725492d3d36448adcd1db38f438dd1392bffd556b58bb9a3a2601 *spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7.tgz" | sha256sum -c - && \
#echo "8bbc9eb51f802798c92e99fd823c5386c83c279d4ba9fed304ed749294f57d27 *spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7.tgz" | sha256sum -c - && \
RUN cd /tmp && \
        wget -q http://d3kbcqa49mib13.cloudfront.net/spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7.tgz && \
        tar xzf spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7.tgz -C /usr/local && \
        rm spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7.tgz
RUN cd /usr/local && ln -s spark-${APACHE_SPARK_VERSION}-bin-hadoop2.7 spark


# apache toree
#ENV TOREE_VERSION 0.1.0.dev8
#RUN pip install toree===${TOREE_VERSION}
#RUN jupyter toree install 			
COPY incubator-toree/dist/toree /toree


#Eclair JS
ENV ECLAIRJS_VERSION 0.8

RUN wget -q http://repo2.maven.org/maven2/org/eclairjs/eclairjs-nashorn/${ECLAIRJS_VERSION}/eclairjs-nashorn-${ECLAIRJS_VERSION}-jar-with-dependencies.jar && \
    mkdir -p /opt/nashorn/lib && \
    mv eclairjs-nashorn-${ECLAIRJS_VERSION}-jar-with-dependencies.jar /opt/nashorn/lib/eclairjs.jar


#kernel.json
COPY kernel.json /usr/local/share/jupyter/kernels/eclair/

# data for examples
COPY examples/ /tmp/

CMD ["jupyter", "notebook", "--no-browser", "--NotebookApp.ip=0.0.0.0"]
