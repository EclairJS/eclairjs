EclairJS Nashorn
===================
The **EclairJS Nashorn** API exposes the [Spark](http://spark.apache.org/) programming model to JavaScript.  **EclairJS Nashorn** is built on top of [Spark's Java API](http://spark.apache.org/docs/latest/api/java/index.html). For a NodeJS implementation of the Spark programming model visit the [eclairjs-node](https://github.com/EclairJS/eclairjs-node) project. More detailed information is available in the Eclair Nashorn [Wiki](https://github.com/EclairJS/eclairjs-nashorn/wikis/home).

## Build from source
**Prerequisites**

 - [Java 8 SE](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
 - [Spark](http://spark.apache.org/downloads.html) (V1.6.0 built for Hadoop 2.6.0 and later)
 - [git](http://git-scm.com/)
 - [Maven](https://maven.apache.org/)

```bash
git clone git@github.com:EclairJS/eclairjs-nashorn.git
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
- [Apache Toree](https://github.com/apache/incubator-toree) Install Toree  ````pip install toree==0.1.0.dev7```` Note where the ````site-packages```` are located for example ````/Library/Python/2.7/site-packages````
Instructions:

1.  Rebuild ````mvn package -Pnotebook````

3. Edit kernel.json and update the following:
 ```bash
 <path to Pyton/sitepagages>/toree/bin/run.sh
 "SPARK_OPTS": --jars file:<path to nashorn jar>
 "SPARK_HOME": <path to spark 1.6.0 distribution>
 ```

4. Copy kernel.json to ```~/.ipython/kernels/eclair/kernel.json```
 * Gateway 4.0.0 and higher uses ```~/Library/Jupyter/kernels/eclair```

5. Create a directory for your notebook ```mkdir ~/jsNotebook```

6. Change to that directory ```cd ~/jsNotebook```

7. Start jupyter ```ipython notebook```

8. A browser will open ```http://localhost:8888/tree``` select the *new->Spark 1.6.0 (EclairJS)*

9. Enter the following code in notebook cell and run
 ```javascript
 var SparkContext = require('eclairjs/SparkContext');
 var sc = new SparkContext("local[*]", "myapp");
 var rdd = sc.parallelize([10, 4, 2, 12, 3]);
 eval("count = " + rdd.count());
 ```

## Versions
It should be noted that the master branch is used for development and although every effort is made to keep it stable it could be in a slight state of flux depending on what is going on.  Please see our [releases page](https://github.com/EclairJS/eclairjs-nashorn/releases) if you would like to download a stable version.
