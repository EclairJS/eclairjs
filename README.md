# EclairJS

EclairJS provides JavaScript and Node.js developers with an API for [Apache Spark](http://spark.apache.org/), and enables them to take advantage of Spark's unique data-processing environment that includes streaming, SQL, Machine Learning, and a graph database. Using EclairJS, developers can write applications entirely in JavaScript, some of which will be executed in the local JavaScript environment such as Node.js, and some of which will be executed on Spark. EclairJS is composed of a client component that runs in the local JavaScript environment, and can be simply installed from npm, and server components that can be remote from the client and handle JavaScript in Spark.

The apps directory contains a number of relatively full-function example applications that include UIs, Node.js applications using the EclairJS client, plus the EclairJS server and Spark. The examples directory contains smaller code examples that demonstrate how-to take advantage of various Spark capabilities such as streaming, ML, from a JavaScript or a Node.js environment. There is also an examples/server directory that contains smaller code examples that can be run directly on the EclairJS server.

## Try The Examples
EclairJS provides a Docker container for the server.

```bash
docker run -p 8888:8888 eclairjs/minimal-gateway
```

To run the examples:

```bash
cd examples
npm install
./run.sh --docker wordcount/wordcount.js
```

Please not that if you are running the docker container in a docker-machine environment or on another server, make sure you set the following environment variables:

```bash
export JUPYTER_HOST=<docker host ip, defaults to 127.0.0.1>
export JUPYTER_PORT=<container ip, defaults to 8888>
```

Note: This repository supports Apache Spark 2.0, and it supercedes an set of repositories ([EclairJS/eclairjs-node](https://github.com/EclairJS/eclairjs-node) and [EclairJS/eclairjs-nashorn](https://github.com/EclairJS/eclairjs-nashorn)) that supported an earlier version of Spark, namely 1.6. The focus of the EclairJS work going forward will be on supporting Spark 2.0.
