# EclairJS

EclairJS provides JavaScript and Node.js developers with an API for [Apache Spark](http://spark.apache.org/), and enables them to take advantage of Spark's unique data-processing environment that includes streaming, SQL, Machine Learning, and a graph database. Using EclairJS, developers can write applications entirely in JavaScript, some of which will be executed in the local JavaScript environment such as Node.js, and some of which will be executed on Spark. EclairJS is composed of a client component that runs in the local JavaScript environment, and can be simply installed from npm, and server components that can be remote from the client and handle JavaScript in Spark.


The examples directory contains smaller code examples that demonstrate how-to take advantage of various Spark capabilities such as streaming, ML, from a Node.js environment. There is also an examples/server directory that contains smaller code examples that can be run directly on the EclairJS server.

The [eclairs-examples](https://github.com/eclairjs/eclairjs-examples) repository contains a number of relatively full-function example Node.js applications that include UIs using the EclairJS client, plus the EclairJS server and Spark. 

## Try The Examples
To try the examples, you will need the example code, a client, and a server. An easy way to obtain the code and a client is to download a copy of the EclairJS repository by clicking the "Clone or download" button above. Then bring up a command line and do the following to install a client:

```bash
cd repository-root-dir/examples
npm install
```

We have provided the server in a Docker container which you can obtain and run with:

```bash
docker pull eclairjs/minimal-gateway
docker run -p 8888:8888 eclairjs/minimal-gateway
```

Now you can run any of the examples using the run.sh script from the examples directory, e.g.:

```bash
./run.sh --docker wordcount/wordcount.js
```

Please not that if you are running the docker container in a docker-machine environment or on another server, make sure you set the following environment variables:
```bash
export JUPYTER_HOST=<docker host ip, defaults to 127.0.0.1>
export JUPYTER_PORT=<container ip, defaults to 8888>
```

## Documentation
* [Developing with EclairJS](https://github.com/EclairJS/eclairjs/wiki/Developing-With-EclairJS-Client)
* [API Docs](https://eclairjs.github.io/eclairjs/client/docs/jsdoc/index.html)
* [API Examples](https://github.com/EclairJS/eclairjs/tree/master/examples)
* [Example Applications](https://github.com/EclairJS/eclairjs-examples)

Note: This repository supports Apache Spark 2.0, and it supercedes an set of repositories ([EclairJS/eclairjs-node](https://github.com/EclairJS/eclairjs-node) and [EclairJS/eclairjs-nashorn](https://github.com/EclairJS/eclairjs-nashorn)) that supported an earlier version of Spark, namely 1.6. The focus of the EclairJS work going forward will be on supporting Spark 2.0.
