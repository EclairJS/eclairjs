# eclairJS-nashorn 


----------


The eclairJS-nashorn API exposes the [Spark](http://spark.apache.org/) programming model to JavaScript.  eclairJS-nashorn is built on top of [Spark's Java API](http://spark.apache.org/docs/latest/api/java/index.html).

### Build from source


----------
**Prerequisites**

 - [Java 8 SE](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
 - [git](http://git-scm.com/)
 - [Maven](https://maven.apache.org/)
 
```bash
git clone git@github.rtp.raleigh.ibm.com:cfa/eclair-nashorn.git
mvn package
```

### Usage


----------
```bash
bin/eclairJS examples/word_count.js
```

or
```bash
bin/eclairJS
eclairJS>var conf = new SparkConf().setAppName("Sample App").setMaster("local[*]"); 
var sparkContext = new SparkContext(conf);
```

### Examples
----------

```javascript

    var file = "/Users/billreed/cfa_dev/fallside/srv/tmp/dream.txt"; 
    var conf = new SparkConf()
                   .setAppName("JavaScript word count")
                   .setMaster(master); 
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

### Usage with Jupyter notebooks
----------
**Prerequisites**
- [Jupyter](http://jupyter.org/)
 
1. edit kernel.json ```<absolute path to sparkkernel executable>``` to be ```/Users/<yourName>/local/bin/sparkkernel```
2. edit kernel.json ```ECLAIR_JAR``` to point eclair-nashorn-0.1.jar location
3. copy kernel.json to ```~/.ipython/kernels/eclair/kernel.json```
4. Create a directory for your notebook ```mkdir ~/jsNotebook```
5. Change to that directory ```cd ~/jsNotebook```
6. Start jupyter ```ipython notebook```
7. A browser will open ```http://localhost:8889/tree``` select the *new->Spark 1.4.1 (javascript)*
8. Enter the following code in notebook cell and run

```javascript
var logFile = "/Users/billreed/cfa_dev/fallside/srv/tmp/dream.txt";
var jsc = new SparkContext();
var logData = jsc.textFile(logFile).cache();
print(" count = " + logData.count()); 
```