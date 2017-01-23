EclairJS Server
===================
The **EclairJS Server** API exposes the [Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Server** is built on top of [Spark's Java API](http://spark.apache.org/docs/latest/api/java/index.html). 
## Build from source
**Prerequisites**

 - [Java 8 SE](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
 - [Spark](http://spark.apache.org/downloads.html) (V2.0.2 built for Hadoop 2.7 and later)
 - [git](http://git-scm.com/)
 - [Maven](https://maven.apache.org/)
 - [SBT](http://www.scala-sbt.org/) (Only if building Toree)

**Build Toree**
```bash
git clone https://github.com/apache/incubator-toree
cd incubator-toree
git checkout e8ecd0623c65ad104045b1797fb27f69b8dfc23f
make dist
make sbt-publishM2
```
Please note, the last step of publishing to your local maven repository may produce an error, however it can be ignored. 

**Build EclairJS Jar**
```bash
git clone https://github.com/eclairjs/eclairjs
cd server
mvn package
export SPARK_HOME=<location of Spark binary distribution>
```

## Usage
```bash
bin/eclairjs.sh examples/word_count.js
```

or
```bash
bin/eclairjs.sh
eclairJS>var list = sc.parallelize([1,10,20,30,40]);
list.count();

```

## Examples
```javascript

    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    
    var file = "src/test/resources/dream.txt"; // Should be some file on your system
    var conf = new SparkConf().setAppName("JavaScript word count")
                          .setMaster("local[*]");
    var sparkContext = new SparkContext(conf);
    var rdd = sparkContext.textFile(file).cache();
    var rdd2 = rdd.flatMap(function(sentence) {
        return sentence.split(" ");
    });
    var rdd3 = rdd2.filter(function(word) {
        return word.trim().length > 0;
    });
    var rdd4 = rdd3.mapToPair(function(word) {
        return [word, 1];
    });
    var rdd5 = rdd4.reduceByKey(function(a, b) {
        return a + b;
    });
    var rdd6 = rdd5.mapToPair(function(tuple) {
        return [tuple[1]+0.0, tuple[0]];
    })
    var rdd7 = rdd6.sortByKey(false);
    print("top 10 words = " + rdd7.take(10));

```

## Usage with Jupyter notebooks
**Prerequisites**

- [Jupyter](http://jupyter.org/)
Instructions:

1. Edit kernel.json and update the following:
 ```bash
 <path to incubator-toree clone>/dist/toree/bin/run.sh
 "SPARK_OPTS": --jars file:<path to nashorn jar>
 "SPARK_HOME": <path to spark 2.0.0 distribution>
 ```

2. Copy kernel.json to jupyter's data directory ```jupyter --data-dir```

3. Create a directory for your notebook ```mkdir ~/jsNotebook```

4. Change to that directory ```cd ~/jsNotebook```

5. Start jupyter ```jupyter notebook```

6. A browser will open ```http://localhost:8888/tree``` select the *new->Spark 2.0.0 (EclairJS)*

7. Enter the following code in notebook cell and run
 ```javascript
 var SparkContext = require('eclairjs/SparkContext');
 var sc = new SparkContext("local[*]", "myapp");
 var rdd = sc.parallelize([10, 4, 2, 12, 3]);
 eval("count = " + rdd.count());
 ```

## Versions
It should be noted that the master branch is used for development and although every effort is made to keep it stable it could be in a slight state of flux depending on what is going on.
