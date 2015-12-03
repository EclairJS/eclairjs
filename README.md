EclairJS Nashorn
===================
The **EclairJS Nashorn** API exposes the [Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Nashorn** is built on top of [Spark's Java API](http://spark.apache.org/docs/latest/api/java/index.html). For a NodeJS implementation of the Spark programming model visit the [eclairjs-node](https://github.com/EclairJS/eclairjs-node) project.

## Build from source
**Prerequisites**

 - [Java 8 SE](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
 - [Spark](http://spark.apache.org/downloads.html) (V1.5.1 built for Hadoop 2.6.0 and later)
 - [git](http://git-scm.com/)
 - [Maven](https://maven.apache.org/)

```bash
git clone git@github.rtp.raleigh.ibm.com:cfa/eclair-nashorn.git
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
- [Spark Kernel](https://github.com/ibm-et/spark-kernel)

Instructions:

1. ```mvn package -Pnotebook```

2. Edit kernel.json and update the following:
 ```bash
 <path to spark-kernel distribution>/bin/spark-kernel
 "SPARK_OPTS": --jars file:<path to nashorn jar>
 "SPARK_HOME": <path to spark 1.5.1 distribution>
 ```

3. Copy kernel.json to ```~/.ipython/kernels/eclair/kernel.json```
 * Gateway 4.0.0 and higher uses ```~/Library/Jupyter/kernels/eclair```

4. Create a directory for your notebook ```mkdir ~/jsNotebook```

5. Change to that directory ```cd ~/jsNotebook```

6. Start jupyter ```ipython notebook```

7. A browser will open ```http://localhost:8889/tree``` select the *new->Spark 1.5.1 (EclairJS)*

8. Enter the following code in notebook cell and run
 ```javascript
 var jsc = new SparkContext("local[*]", "myapp");
 var rdd = jsc.parallelize([10, 4, 2, 12, 3]);
 eval("count = " + rdd.count());
 ```

## Resources
More detailed information is available in the Eclair Node [Wiki](https://github.com/EclairJS/eclairjs-node/wikis/home) and find out how to get involved under [Project and Community](https://github.com/EclairJS/eclairjs-node/wikis/Project-and-Community).

