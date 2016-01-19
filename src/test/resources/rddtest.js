/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var sparkContext = new SparkContext();

var rdd = sparkContext.parallelize([1, 2, 3]);

var test = function() {
    return rdd.collect();
}

var testAggregate = function() {
    var rdd2 = sparkContext.parallelize([1]);
    var zeroRdd = sparkContext.parallelize([0]);
    return JSON.stringify(rdd2.aggregate(zeroRdd, function(t1,t2){return [t1,t2]}, function(t1,t2){return [t1,t2]}));
}

var testCache = function() {
    var rdd2 = rdd.cache();
    return JSON.stringify(rdd2.collect());
}

var testCartesian = function() {
    var rdd2 = sparkContext.parallelize([2, 4]);
    var rdd3 = rdd.cartesian(rdd2);
    return JSON.stringify(rdd3.collect());
}

// Looks like ParallelCollectionRDD (e.g. SparkContext.parrellize() has to be
// implemented for localCheckpoint to work. Also use skip flag so that checkpoint
// is not run everytime otherwise checkpointDir is written to everytime and will
// grow very fast.
var testCheckpoint = function(skipCheckpoint, local, checkpointDir) {
    if (!skipCheckpoint) {
        if (local) {
            rdd.localCheckpoint();
        } else {
            sparkContext.setCheckpointDir(checkpointDir || "checkpoint");
            rdd.checkpoint();
        }
    }
    return skipCheckpoint || rdd.isCheckpointed();
}

var testCoalesce = function() {
    var rdd2 = rdd.coalesce(1,true);
    return JSON.stringify(rdd2.collect());
}

var testCollect = function() {
    return JSON.stringify(rdd.collect());
}

var testCollectWithFunc = function() {
    return JSON.stringify(rdd.collect(function(i){return i===2}));
}

var testContext = function() {
    return JSON.stringify(rdd.context());
}

var testCount = function() {
    return rdd.count();
}

var testCountApprox = function() {
    // Need to implement PartialResult
    //rdd.countApprox(1000,1).onComplete(function(res){
      //  return JSON.stringify(res);
    //});
    return JSON.stringify(rdd.countApprox(1000,1).getFinalValue());
}

var testCountApproxDistinct = function() {
    return rdd.countApproxDistinct(0.1);
}

var testDistinct = function() {
    var rdd2 = rdd.distinct();
    return JSON.stringify(rdd2.collect());
}

var testFilter = function() {
    var rdd2 = rdd.filter(function(num){return num===2});
    return JSON.stringify(rdd2.collect());
}

var testFirst = function() {
    return JSON.stringify(rdd.first());
}

var testFlatMap = function() {
    var rdd2 = rdd.flatMap(function(num){return [num+1]});
    return JSON.stringify(rdd2.collect());
}

var testFold = function() {
    var rdd2 = sparkContext.parallelize([1]);
    var zeroRdd = sparkContext.parallelize([0]);
    return JSON.stringify(rdd2.fold(zeroRdd, function(t1,t2){return [t1,t2]}));
}

var testForeach = function() {
    rdd.foreach(function(num){print('doing foreach '+num)});
    return JSON.stringify(rdd.collect());
}

var testForeachPartition = function() {
    rdd.foreachPartition(function(partitionOfRecs) {
        for (var i=0; i<partitionOfRecs.length; i++) {
            print('doing foreachPartition '+partitionOfRecs[i]);
        }
    });
    return JSON.stringify(rdd.collect());
}

var testGetStorageLevel = function() {
    return JSON.stringify(rdd.getStorageLevel());
}

var testGlom = function() {
    var rdd2 = rdd.glom();
    return JSON.stringify(rdd2.take(1));
}

var testGroupBy = function() {
    var rdd2 = rdd.groupBy(function(num){return num});
    return JSON.stringify(rdd2.collect());
}

var testId = function() {
    return rdd.id();
}

var testIntersection = function() {
    var rdd2 = sparkContext.parallelize([1,2,4]);
    var rdd3 = rdd.intersection(rdd2);
    return JSON.stringify(rdd3.collect());
}

var testIsEmpty = function() {
    return rdd.isEmpty();
}

var testKeyBy = function() {
    var rdd2 = rdd.keyBy(function(num){return num});
    return JSON.stringify(rdd2.collect());
}

var testMap = function() {
    var rdd2 = rdd.map(function(num){return num*2});
    return JSON.stringify(rdd2.collect());
}

var testMapPartitions = function() {
    var rdd2 = rdd.mapPartitions(function(partitionOfRecs) {
        for (var i=0; i<partitionOfRecs.length; i++) {
            print('doing mapPartiition '+partitionOfRecs[i]);
            //partitionOfRecs[i]++;
        }
        return partitionOfRecs;
    });
    return JSON.stringify(rdd2.collect());
}

var testMapToPair = function() {
    var rdd2 = rdd.mapToPair(function(num) {return [num,num+1]});
    return JSON.stringify(rdd2.collect());
}

var testMax = function() {
    return rdd.max(function(a,b){return (a < b ? -1 : (a > b ? 1 : 0))});
}

var testMin = function() {
    return rdd.min(function(a,b){return (b < a ? 1 : (b > a ? -1 : 0))});
}

var testName = function() {
    rdd.setName("HelloRDD");
    return rdd.name();
}

var testReduce = function() {
    var rdd2 = sparkContext.parallelize([1,2,3]);
    return JSON.stringify(rdd2.reduce(function(a,b) {return a+b}));
}

var testSubtract = function() {
    var rdd2 = sparkContext.parallelize([2]);
    var rdd3 = rdd.subtract(rdd2);
    return JSON.stringify(rdd3.collect());
}

var testTake = function() {
    return JSON.stringify(rdd.take(2));
}

var testToArray = function() {
    return JSON.stringify(rdd.toArray());
}

var testToDebugString = function() {
    return rdd.toDebugString();
}

var testUnion = function() {
    var rdd2 = sparkContext.parallelize([2,3,4]);
    var rdd3 = rdd.union(rdd2);
    return JSON.stringify(rdd3.collect());
}

var testZip = function() {
    var rdd2 = sparkContext.parallelize([4,5,6]);
    var rdd3 = rdd.zip(rdd2);
    return JSON.stringify(rdd3.collect());
}

var testZipPartitions = function() {
    var rdd2 = sparkContext.parallelize([4,5]);
    var rdd3 = rdd.zipPartitions(rdd2,function(a,b){return [a+b]});
    return JSON.stringify(rdd3.collect());
}

function assertThat(condition,message)
{
    var msg=message || "assertion failed"
    if (!condition)
        throw msg
        // throw new java.lang.AssertionError(msg)
}
var testHashPartitioner = function() {

    var p2 = new HashPartitioner(2)
    var p4 = new HashPartitioner(4)
    var anotherP4 = new HashPartitioner(4)
   assertThat(p2.equals(p2))
    assertThat(p4.equals(p4))
    assertThat(!p2.equals(p4))
    assertThat(!p4.equals(p2))
    assertThat(p4.equals(anotherP4))
}
