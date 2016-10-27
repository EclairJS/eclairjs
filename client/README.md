EclairJS Client
===================
EclairJS Client provides Node.js language bindings for [Apache Spark](https://spark.apache.org).

Learn more about the larger [EclairJS project](http://www.eclairjs.org).

## Installation

```bash
$ npm install eclairjs
```

EclairJS Client requires Node 0.12 or higher and also requires a running instance of [EclairJS Server](https://github.com/EclairJS/eclairjs/tree/master/server).

Supported Spark versions can be found in the [Versions](#version) section below.

## Example
EclairJS Client's api mirrors the Spark api.  Here is the classic word count example:

```node
var eclairjs = require('eclairjs');

var spark = new eclairjs();

var sc = new spark.SparkContext("local[*]", "Simple Word Count");

var textFile = sc.textFile('foo.txt');

var words = textFile.flatMap(function(sentence) {
  return sentence.split(" ");
});

var wordsWithCount = words.mapToPair(function(word, Tuple2) {
  return new Tuple2(word, 1);
}, [eclairjs.Tuple2]);

var reducedWordsWithCount = wordsWithCount.reduceByKey(function(value1, value2) {
  return value1 + value2;
});

reducedWordsWithCount.collect().then(function(results) {
  console.log('Word Count:', results);
  sc.stop();
});
```

## Try It
EclairJS Client provides a Docker container that contains all of its dependencies on 
[Dockerhub](https://hub.docker.com/r/eclairjs/minimal-gateway/).

The Docker image supports the latest released version of EclairJS Client and may not work with `master`.   You can 
simply check out the appropriate branch (` git checkout branch-0.9` for example).

```bash
docker pull eclairjs/minimal-gateway:0.9
docker run -p 8888:8888 eclairjs/minimal-gateway:0.9
```

After retrieving Docker's IP address (`docker-machine ip`), you will need to set two environment variables:

```bash
export JUPYTER_HOST=??.??.??.?? (your docker ip)
export JUPYTER_PORT=8888
```

Now you can run the Word count example (run these commands from the top level directory):

```bash
npm install
node --harmony examples/wordcount/wordcount.js ./data/dream.txt
```

You can learn more about the Docker container [here](https://github.com/EclairJS/eclairjs/wikis/Using-the-Docker-Container).
You can also try out EclairJS in Jupyter notebooks running under the [IBM Bluemix Cloud](https://github.com/EclairJS/eclairjs/wikis/EclairJS-with-IBM-Bluemix).

## Documentation
* [Developing with EclairJS](https://github.com/EclairJS/eclairjs/wiki/Developing-With-EclairJS-Client)
* [API Docs](https://github.com/EclairJS/eclairjs/wiki/Client-API-Documentation)
* [Wiki](https://github.com/EclairJS/eclairjs/wiki)
* [API Examples](https://github.com/EclairJS/eclairjs/tree/master/examples)
* [Example Applications](https://github.com/EclairJS/eclairjs-examples)

## Community
* [EclairJS Project](http://eclairjs.org/)
* [Google Group](https://groups.google.com/forum/#!forum/eclairjs)
* [Slack](https://eclairjs.slack.com)

## Deploy
You can choose to either deploy using Docker ([Using the Docker Container](https://github.com/EclairJS/eclairjs/wikis/Using-the-Docker-Container)) 
or manually build and setup your own environment ([Build and Package](https://github.com/EclairJS/eclairjs/wikis/Build-and-Package)).

## Progress

|Spark Feature    |EclairJS Client Status|
|-----------------|--------------------|
|RDD              | Partial Support    |
|SQL/DataFrames   | Partial Support    |
|Streaming        | Partial Support    |
|ml               | Partial Support    |
|mllib            | Partial Support    |
|GraphX           | Unsupported        |

Refer to the [API Documentation](https://github.com/EclairJS/eclairjs/wikis/Client-API-Documentation) for a list of what is currently implemented.  Please note as new APIs are implemented for EclairJS Client they will be added to the master branch.

Contributions are always welcome via pull requests.

## Versions
Our goal is to keep the EclairJS master branch up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

|EclairJS Version/Tag | Apache Spark Version |
| ----------------| ----- |
| 0.1             | 1.5.1 |
| 0.2 - 0.7       | 1.6.0 |
| 0.8             | 2.0.0 |
| 0.9             | 2.0.0 |
| 0.10 (master)   | 2.0.0 |
