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

import javax.script.Invocable;
import javax.script.ScriptEngine;

/**
 * Created by bburns on 10/22/15.
 */
public class JSTest {

	@Test
    public void wordCount() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/top10words.js"); 
        Object ret = ((Invocable)engine).invokeFunction("wordCount", file);

        System.out.println(ret);
        String expected = "[[34,\"of\"],[30,\"the\"],[19,\"be\"],[19,\"to\"],[19,\"and\"],[15,\"will\"],[12,\"from\"],[12,\"I\"],[11,\"freedom\"],[10,\"that\"]]";
        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
	
    /*
     * DataFrame Unit Test Cases
     */
	
    @Test
    public void dataFrameProgrammaticallySpecifyingSchema() throws Exception {
    	/*
    	 * tests
    	 * SparkContext.textFile(path)
    	 * RDD.map()
    	 * DataTypes.createStructField()
    	 * DataTypes.createStructType(fields);
    	 * DataFrame.registerTempTable("tablename")
    	 * DataFrame.take(num)
    	 * SQLContext.createDataFrame(rowRDD, schema);
    	 * SQLContext.sql("SELECT name FROM people");
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("programmaticallySpecifyingSchema", file);

        String expected = "Name: Michael,Name: Andy,Name: Justin";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameAggTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeAggTest", file);

        String json = "{\"values\":[30,6],\"schema\":{\"fields\":[{\"name\":\"MAX(age)\",\"dataType\":\"IntegerType\",\"nullable\":true,\"metadata\":\"FIXME\"},{\"name\":\"SUM(expense)\",\"dataType\":\"LongType\",\"nullable\":true,\"metadata\":\"FIXME\"}]}}";
        assertEquals("should be same", json, ret.toString());
    }
    
    @Test
    public void dataFrameColTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeColTest", file);

        String expected = "age";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameColumnsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.columns()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeColumnsTest", file);

        assertEquals("should be same", "name,age,expense", ret.toString());
    }
    
    @Test
    public void dataFrameFilterTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.filter()
    	 * DataFrame.filterWithString()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeFilterTest", file);

        String expected = "Name: Michael,Name: Andy";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameFilterWithColumnTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.filterWithColumn()
    	 * Column.gt()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeFilterWithColumnTest", file);

        String expected = "Name: Michael,Name: Andy";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameFlatMapTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.flatMap()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeFlatMapTest", file);

        String expected = "Michael,Andy,Justin";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameGroupBy() throws Exception {
    	/*
    	 * tests 
    	 * SQLContext.read()
    	 * DataFramerReader.json(path)
    	 * DataFrame.col()
    	 * DataFrame.groupBy()
    	 * DataFrame.groupByWithColumns()
    	 * DataFrame.cout()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeGroupByTest", file);

        Long expected = (long) 2;
        assertSame("should be same", expected, ret);
    }
    
    @Test
    public void dataFrameGroupByWithStrings() throws Exception {
    	/*
    	 * tests 
    	 * SQLContext.read()
    	 * DataFramerReader.json(path)
    	 * DataFrame.col()
    	 * DataFrame.groupByWithStrings()
    	 * DataFrame.cout()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeGroupByWithStringsTest", file);

        Long expected = (long) 2;
        assertSame("should be same", expected, ret);
    }
    
    @Test
    public void dataFrameHead() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.head()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeHeadTest", file);

        assertEquals("should be same", "LukeSkywalker", ret);
    }
    
    @Test
    public void dataFrameMapTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.map()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeMapTest", file);

        String expected = "Name: Michael,Name: Andy,Name: Justin";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSelect() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.select()
    	 * DataFrame.selectWithColumn()
    	 * DataFrame.selectWithString()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSelectTest", file);

        assertEquals("should be same", "[name: string, age: int]", ret);
    }
    
    @Test
    public void dataFrameWhereTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.filter()
    	 * DataFrame.filterWithString()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeWhereTest", file);

        String expected = "Name: Michael,Name: Andy";
        assertEquals("should be same", expected, ret.toString());
    }
    
    
}
