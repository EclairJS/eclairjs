var sparkContext = new SparkContext();
var rdd = sparkContext.parallelize([1, 2, 3]);


tests({


    version : function() {
        var ver= sparkContext.version();
        assertEquals("failure - strings are not equal", "EclairJS-nashorn 0.1 Spark 1.6.0", ver);

    },

    testCollect : function () {
        var collected=  JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure collect - arrays are not equal", expected, collected);
    },

    testAggregate : function() {
        var rdd2 = sparkContext.parallelize([1]);
        var zeroRdd = sparkContext.parallelize([0]);
        var ret= JSON.stringify(rdd2.aggregate(zeroRdd, function(t1,t2){return [t1,t2]}, function(t1,t2){return [t1,t2]}));
        var expected = "{\"0\":null,\"1\":null}";
        assertEquals("failure aggregate - objects are not equal", expected, ret);

    },

    testCache : function() {
        var rdd2 = rdd.cache();
        var ret= JSON.stringify(rdd2.collect());
        var expected = "[1,2,3]";
        assertEquals("failure cache - arrays are not equal", expected, ret);

    },


    testCartesian : function() {
        var rdd2 = sparkContext.parallelize([2, 4]);
        var rdd3 = rdd.cartesian(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[\"(1,2)\",\"(1,4)\",\"(2,2)\",\"(2,4)\",\"(3,2)\",\"(3,4)\"]";
        assertEquals("failure cartesian - arrays are not equal", expected, ret);
    },

    testCoalesce : function() {
        var rdd2 = rdd.coalesce(1,true);
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[1,2,3]";
        assertEquals("failure coalesce - arrays are not equal", expected, ret);
    },


    testCollectWithFunc : function() {
        // Test collect(func) - throws TypeError: Can not invoke method with the passed aeguments;
        // they do not match any of its method signatures - looks like we need to implement
        // a JS version of scala.PartialFunction if we want this to work.
//		var ret = JSON.stringify(rdd.collect(function(i){return i===2}));
        //var expected = "[2]";
        //assertEquals("failure collectwithFunc - arrays are not equal", expected, ret);
    },

    testContext : function() {
        var ret = JSON.stringify(rdd.context());
        var expectedClass = "org.apache.spark.api.java.JavaSparkContext";
        assertEquals("failure - not an instance of SparkContext", true, ret.indexOf(expectedClass)>=0);
    },

    testCount : function() {
        var ret = rdd.count();
        var expected = 3;
        assertIntegerEquals("failure - counts are not equal", expected, ret);
    },

    testCountApprox : function() {
        // Need to implement PartialResult
        //rdd.countApprox(1000,1).onComplete(function(res){
        //  return JSON.stringify(res);
        //});
// Test countApprox(timeout,confidence) - need to implement PartialResult
//		var ret = JSON.stringify(rdd.countApprox(1000,1).getFinalValue());
// 		var expected = "3";
//		assertEquals("failure - counts are not equal", expected, ret);
    },

    testCountApproxDistinct : function() {
        var ret = rdd.countApproxDistinct(0.1);
        var expected = 3;
        assertIntegerEquals("failure - counts are not equal", expected, ret);
    },

    testDistinct : function() {
        var rdd2 = rdd.distinct();
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[1,2,3]";
        assertEquals("failure distinct - arrays are not equal", expected, ret);
    },

    testFilter : function() {
        var rdd2 = rdd.filter(function(num){return num===2});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2]";
        assertEquals("failure filter - arrays are not equal", expected, ret);
    },

    testFirst : function() {
        var ret = JSON.stringify(rdd.first());
        var expected = "1";
        assertEquals("failure - first elements are not equal", expected, ret);
    },

    testFlatMap : function() {
        var rdd2 = rdd.flatMap(function(num){return [num+1]});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2,3,4]";
        assertEquals("failure flatMap - arrays are not equal", expected, ret);
    },

    testFold : function() {
        var rdd2 = sparkContext.parallelize([1]);
        var zeroRdd = sparkContext.parallelize([0]);
        var ret = JSON.stringify(rdd2.fold(zeroRdd, function(t1,t2){return [t1,t2]}));
        var expected = "{\"0\":null,\"1\":null}";
        assertEquals("failure fold - objects are not equal", expected, ret);
    },

    testForeach : function() {
        rdd.foreach(function(num){print('doing foreach '+num)});
        var ret = JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure foreach - arrays are not equal", expected, ret);
    },

    testForeachPartition : function() {
        rdd.foreachPartition(function(partitionOfRecs) {
            for (var i=0; i<partitionOfRecs.length; i++) {
                print('doing foreachPartition '+partitionOfRecs[i]);
            }
        });
        var ret = JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure foreachPartition - arrays are not equal", expected, ret);
    },

    testGetStorageLevel : function() {
        var ret = JSON.stringify(rdd.getStorageLevel());
        expectedClass = "StorageLevel";
        assertContains("failure - not an instance of StorageLevel", ret,expectedClass);
    },

    testGlom : function() {
        var rdd2 = rdd.glom();
        var ret = JSON.stringify(rdd2.take(1));
        var expected = "[null]";
        assertEquals("failure glom - arrays are not equal", expected, ret);
    },

    testGroupBy : function() {
        var rdd2 = rdd.groupBy(function(num){return num});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[\"(1,[1])\",\"(2,[2])\",\"(3,[3])\"]";
        assertEquals("failure groupBy - arrays are not equal", expected, ret);
    },

    testId : function() {
        var ret = rdd.id();
    },

    testIntersection : function() {
        var rdd2 = sparkContext.parallelize([1,2,4]);
        var rdd3 = rdd.intersection(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[1,2]";
        assertEquals("failure intersection - arrays are not equal", expected, ret);
    },

    testIsEmpty : function() {
        var ret = rdd.isEmpty();
        assertFalse("failure - should not be empty", ret);
    },

    testKeyBy : function() {
        var rdd2 = rdd.keyBy(function(num){return num});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[\"(1,1)\",\"(2,2)\",\"(3,3)\"]";
        assertEquals("failure keyBy - arrays are not equal", expected, ret);
    },

    testMap : function() {
        var rdd2 = rdd.map(function(num){return num*2});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2,4,6]";
        assertEquals("failure map - arrays are not equal", expected, ret);
    },

    testMapPartitions : function() {
        // Test mapPartitions(func) - not quite sure how to test
//		var rdd2 = rdd.mapPartitions(function(partitionOfRecs) {
//			for (var i=0; i<partitionOfRecs.length; i++) {
//				print('doing mapPartiition '+partitionOfRecs[i]);
//				//partitionOfRecs[i]++;
//			}
//			return partitionOfRecs;
//		});
//		var ret = JSON.stringify(rdd2.collect());
//        var expected = "[2,3,4]";
//        assertEquals("failure mapPartitions - arrays are not equal", expected, ret);
    },

    testMapToPair : function() {
        var rdd2 = rdd.mapToPair(function(num) {return new Tuple(num,num+1)});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[\"(1,2)\",\"(2,3)\",\"(3,4)\"]";
        assertEquals("failure mapToPair - arrays are not equal", expected, ret);
    },

    testMax : function() {
        var ret = rdd.max(function(a,b){return (a < b ? -1 : (a > b ? 1 : 0))});
        var expected = 3;
        assertIntegerEquals("failure should be max value", expected, ret);
    },

    testMin : function() {
        var ret = rdd.min(function(a,b){return (b < a ? 1 : (b > a ? -1 : 0))});

        var expected = 1; // Should be "1" but pass it for now
        assertIntegerEquals("failure should be min value", expected, ret);
    },

    testName : function() {
        rdd.setName("HelloRDD");
        var ret = rdd.name();
        var expected = "HelloRDD";
        assertEquals("failure name should be set", expected, ret);
    },

    testReduce : function() {
        var rdd2 = sparkContext.parallelize([1,2,3]);
        var ret = JSON.stringify(rdd2.reduce(function(a,b) {return a+b}));
        var expected = "6";
        assertEquals("failure reduce - arrays are not equal", expected, ret);
    },

    testSubtract : function() {
        var rdd2 = sparkContext.parallelize([2]);
        var rdd3 = rdd.subtract(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[1,3]";
        assertEquals("failure subtract - arrays are not equal", expected, ret);
    },

    testTake : function() {
        var ret = JSON.stringify(rdd.take(2));
        var expected = "[1,2]";
        assertEquals("failure take - arrays are not equal", expected, ret);
    },

    testToArray : function() {
        var ret = JSON.stringify(rdd.toArray());
        var expected = "[1,2,3]";
        assertEquals("failure toArray - arrays are not equal", expected, ret);
    },

    testToDebugString : function() {
        var ret = rdd.toDebugString();
        var expected = "HelloRDD ParallelCollectionRDD";
        assertContains("failure toDebugString - does not contain proper info", ret, expected);
    },

    testUnion : function() {
        var rdd2 = sparkContext.parallelize([2,3,4]);
        var rdd3 = rdd.union(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[1,2,3,2,3,4]";
        assertEquals("failure union - arrays are not equal", expected, ret);
    },

    testZip : function() {
        var rdd2 = sparkContext.parallelize([4,5,6]);
        var rdd3 = rdd.zip(rdd2);
        var ret = JSON.stringify(rdd3.collect());
    },

    testZipPartitions : function() {
        var rdd2 = sparkContext.parallelize([4,5]);
        var rdd3 = rdd.zipPartitions(rdd2,function(a,b){return [a+b]});
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[\"[][]\",\"[][]\",\"[1][]\",\"[][4]\",\"[][]\",\"[2][]\",\"[][]\",\"[3][5]\"]";
        assertEquals("failure zipPartitions - arrays are not equal", expected, ret);

    },


    testHashPartitioner : function() {

        var p2 = new HashPartitioner(2)
        var p4 = new HashPartitioner(4)
        var anotherP4 = new HashPartitioner(4)
        assertTrue(p2.equals(p2))
        assertTrue(p4.equals(p4))
        assertFalse(p2.equals(p4))
        assertFalse(p4.equals(p2))
        assertTrue(p4.equals(anotherP4))
    },


    LAST:true
});

