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

package org.eclairjs.nashorn;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.junit.matchers.JUnitMatchers.*;
import static org.hamcrest.core.IsInstanceOf.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;

/**
 * Created by bburns on 10/22/15.
 */
public class RDDTest {

	@Test
    public void wordCount() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/top10words.js");
        Object ret = ((Invocable)engine).invokeFunction("wordCount", file);

        System.out.println(ret);
        String expected = "[[34,\"of\"],[30,\"the\"],[19,\"be\"],[19,\"to\"],[19,\"and\"],[15,\"will\"],[12,\"from\"],[12,\"I\"],[11,\"freedom\"],[10,\"that\"]]";
        assertEquals("failure - strings are not equal", expected, ret.toString());

    };

    @Test
    public void generalTests() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/rddtest.js");

        // Test collect() - make sure collect works 1st as it is used by almost all the test cases.
        Object ret = ((Invocable)engine).invokeFunction("testCollect");
        System.out.println(ret.toString());
        String expected = "[1,2,3]";
        assertEquals("failure collect - arrays are not equal", expected, ret.toString());

        // Test aggregate(zeroVal,f1,f2)
        ret = ((Invocable)engine).invokeFunction("testAggregate");
        System.out.println(ret.toString());
        expected = "{\"0\":null,\"1\":null}";
        assertEquals("failure aggregate - objects are not equal", expected, ret.toString());

        // Test cache()
        ret = ((Invocable)engine).invokeFunction("testCache");
        System.out.println(ret);
        expected = "[1,2,3]";
        assertEquals("failure cache - arrays are not equal", expected, ret.toString());

        // Test cartesian(other)
        ret = ((Invocable)engine).invokeFunction("testCartesian");
        System.out.println(ret);
        expected = "[[1,2],[1,4],[2,2],[2,4],[3,2],[3,4]]";
        assertEquals("failure cartesian - arrays are not equal", expected, ret.toString());

        // Test checkpoiet(), localCheckpoint(), isCheckpointed()
        ret = ((Invocable)engine).invokeFunction("testCheckpoint", true);
        System.out.println(ret);
        assertTrue("failure - rdd is not checkpointed", Boolean.valueOf(ret.toString()));

        // Test coalesce(numP,shuffle)
        ret = ((Invocable)engine).invokeFunction("testCoalesce");
        System.out.println(ret.toString());
        expected = "[1,2,3]";
        assertEquals("failure coalesce - arrays are not equal", expected, ret.toString());

        // Test collect(func) - throws TypeError: Can not invoke method with the passed aeguments;
        // they do not match any of its method signatures - looks like we need to implement
        // a JS version of scala.PartialFunction if we want this to work.
        //ret = ((Invocable)engine).invokeFunction("testCollectWithFunc");
        //System.out.println(ret);
        //expected = "[2]";
        //assertEquals("failure collectwithFunc - arrays are not equal", expected, ret.toString());

        // Test context()
        ret = ((Invocable)engine).invokeFunction("testContext");
        System.out.println(ret.toString());
        String expectedClass = "org.apache.spark.api.java.JavaSparkContext";
        assertThat("failure - not an instance of SparkContext", ret.toString(), containsString(expectedClass));

        // Test count()
        ret = ((Invocable)engine).invokeFunction("testCount");
        System.out.println(ret);
        expected = "3";
        assertEquals("failure - counts are not equal", expected, ret.toString());

        // Test countApprox(timeout,confidence) - need to implement PartialResult
        //ret = ((Invocable)engine).invokeFunction("testCountApprox");
        //System.out.println(ret);
        //expected = "3";
        //assertEquals("failure - counts are not equal", expected, ret.toString());

        // Test countApproxDistinct(relAcc)
        ret = ((Invocable)engine).invokeFunction("testCountApproxDistinct");
        System.out.println(ret);
        expected = "3";
        assertEquals("failure - counts are not equal", expected, ret.toString());

        // Test distinct()
        ret = ((Invocable)engine).invokeFunction("testDistinct");
        System.out.println(ret);
        expected = "[1,2,3]";
        assertEquals("failure distinct - arrays are not equal", expected, ret.toString());

        // Test filter(func)
        ret = ((Invocable)engine).invokeFunction("testFilter");
        System.out.println(ret);
        expected = "[2]";
        assertEquals("failure filter - arrays are not equal", expected, ret.toString());

        // Test first()
        ret = ((Invocable)engine).invokeFunction("testFirst");
        System.out.println(ret);
        expected = "1";
        assertEquals("failure - first elements are not equal", expected, ret);

        // Test flatMap(func)
        ret = ((Invocable)engine).invokeFunction("testFlatMap");
        System.out.println(ret);
        expected = "[2,3,4]";
        assertEquals("failure flatMap - arrays are not equal", expected, ret.toString());

        // Test fold(zeroVal)
        ret = ((Invocable)engine).invokeFunction("testFold");
        System.out.println(ret);
        expected = "{\"0\":null,\"1\":null}";
        assertEquals("failure fold - objects are not equal", expected, ret.toString());

        // Test forEach(func)
        ret = ((Invocable)engine).invokeFunction("testForeach");
        System.out.println(ret);
        expected = "[1,2,3]";
        assertEquals("failure foreach - arrays are not equal", expected, ret.toString());

        // Test foreachPartition(func)
        ret = ((Invocable)engine).invokeFunction("testForeachPartition");
        System.out.println(ret);
        expected = "[1,2,3]";
        assertEquals("failure foreachPartition - arrays are not equal", expected, ret.toString());

        // Test getStorageLevel()
        ret = ((Invocable)engine).invokeFunction("testGetStorageLevel");
        System.out.println(ret.toString());
        expectedClass = "StorageLevel";
        assertThat("failure - not an instance of StorageLevel", ret.toString(), containsString(expectedClass));

        // Test glom() - really meant to be tested with partitions
        ret = ((Invocable)engine).invokeFunction("testGlom");
        System.out.println(ret);
        expected = "[null]";
        assertEquals("failure glom - arrays are not equal", expected, ret.toString());

        // Test groupBy(func)
        ret = ((Invocable)engine).invokeFunction("testGroupBy");
        System.out.println(ret);
        expected = "[[1,null],[2,null],[3,null]]";
        assertEquals("failure groupBy - arrays are not equal", expected, ret.toString());

        // Test id() - Not sure how to test as this is random int every time
        ret = ((Invocable)engine).invokeFunction("testId");
        System.out.println(ret);

        // Test intersection(other)
        ret = ((Invocable)engine).invokeFunction("testIntersection");
        System.out.println(ret);
        expected = "[1,2]";
        assertEquals("failure intersection - arrays are not equal", expected, ret.toString());

        // Test isEmpty()
        ret = ((Invocable)engine).invokeFunction("testIsEmpty");
        System.out.println(ret);
        assertFalse("failure - should not be empty", Boolean.valueOf(ret.toString()));

        // Test keyBy(func)
        ret = ((Invocable)engine).invokeFunction("testKeyBy");
        System.out.println(ret.toString());
        expected = "[[1,1],[2,2],[3,3]]";
        assertEquals("failure keyBy - arrays are not equal", expected, ret.toString());

        // Test map(func)
        ret = ((Invocable)engine).invokeFunction("testMap");
        System.out.println(ret.toString());
        expected = "[2,4,6]";
        assertEquals("failure map - arrays are not equal", expected, ret.toString());

        // Test mapPartitions(func) - not quite sure how to test
        //ret = ((Invocable)engine).invokeFunction("testMapPartitions");
        //System.out.println(ret.toString());
        //expected = "[2,3,4]";
        //assertEquals("failure mapPartitions - arrays are not equal", expected, ret.toString());

        // Test mapToPair(func)
        ret = ((Invocable)engine).invokeFunction("testMapToPair");
        System.out.println(ret.toString());
        expected = "[[1,2],[2,3],[3,4]]";
        assertEquals("failure mapToPair - arrays are not equal", expected, ret.toString());

        // Test max()
        ret = ((Invocable)engine).invokeFunction("testMax");
        System.out.println(ret);
        expected = "3";
        assertEquals("failure should be max value", expected, ret.toString());

        // Test min()
        ret = ((Invocable)engine).invokeFunction("testMin");
        System.out.println(ret);
        expected = "1"; // Should be "1" but pass it for now
        assertEquals("failure should be min value", expected, ret.toString());

        // Test name(), setName(name)
        ret = ((Invocable)engine).invokeFunction("testName");
        System.out.println(ret);
        expected = "HelloRDD";
        assertEquals("failure name should be set", expected, ret.toString());

        // Test reduce(func)
        ret = ((Invocable)engine).invokeFunction("testReduce");
        System.out.println(ret);
        expected = "6";
        assertEquals("failure reduce - arrays are not equal", expected, ret.toString());

        // Test subtract(other)
        ret = ((Invocable)engine).invokeFunction("testSubtract");
        System.out.println(ret);
        expected = "[1,3]";
        assertEquals("failure subtract - arrays are not equal", expected, ret.toString());

        // Test take(num)
        ret = ((Invocable)engine).invokeFunction("testTake");
        System.out.println(ret);
        expected = "[1,2]";
        assertEquals("failure take - arrays are not equal", expected, ret.toString());

        // Test toArray
        ret = ((Invocable)engine).invokeFunction("testToArray");
        System.out.println(ret);
        expected = "[1,2,3]";
        assertEquals("failure toArray - arrays are not equal", expected, ret.toString());

        // Test toDebugString
        ret = ((Invocable)engine).invokeFunction("testToDebugString");
        System.out.println(ret);
        expected = "HelloRDD ParallelCollectionRDD";
        assertThat("failure toDebugString - does not contain proper info", ret.toString(), containsString(expected));

        // Test union(other)
        ret = ((Invocable)engine).invokeFunction("testUnion");
        System.out.println(ret);
        expected = "[1,2,3,2,3,4]";
        assertEquals("failure union - arrays are not equal", expected, ret.toString());

        // Test zip(other)
        ret = ((Invocable)engine).invokeFunction("testZip");
        System.out.println(ret);
        expected = "[[1,4],[2,5],[3,6]]";
        assertEquals("failure zip - arrays are not equal", expected, ret.toString());

        // Test zipPartitions(rdd2)
        ret = ((Invocable)engine).invokeFunction("testZipPartitions");
        System.out.println(ret);
        expected = "[\"[][]\",\"[][]\",\"[1][]\",\"[][4]\",\"[][]\",\"[2][]\",\"[][]\",\"[3][5]\"]";
        assertEquals("failure zipPartitions - arrays are not equal", expected, ret.toString());
    }

    @Test
    public void partitionerTests() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/rddtest.js");

        // Test collect() - make sure collect works 1st as it is used by almost all the test cases.
        Object ret = ((Invocable)engine).invokeFunction("testHashPartitioner");
     }
}
