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

        String json = "{\"values\":[30,6],\"schema\":{\"fields\":[{\"name\":\"max(age)\",\"dataType\":\"IntegerType\",\"nullable\":true},{\"name\":\"sum(expense)\",\"dataType\":\"LongType\",\"nullable\":true}]}}";
        assertEquals("should be same", json.toLowerCase(), ret.toString().toLowerCase()); // case is sometimes different when run from maven
    }
    
    @Test
    public void dataFrameApplyTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeApplyTest", file);

         assertEquals("should be same", "name", ret.toString()); 
    }
    
    @Test
    public void dataFrameAsTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeAsTest", file);

         assertEquals("should be same", "[name: string, age: int, expense: int, DOB: timestamp]", ret.toString()); 
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
    public void dataFrameCollectTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.columns()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeCollectTest", file);
        String schemaJson = "\"schema\":{"
						        		+ "\"fields\":["
							        		+ "{\"name\":\"name\",\"dataType\":\"StringType\",\"nullable\":true},"
							        		+ "{\"name\":\"age\",\"dataType\":\"IntegerType\",\"nullable\":true},"
							        		+ "{\"name\":\"expense\",\"dataType\":\"IntegerType\",\"nullable\":true},"
							        		+ "{\"name\":\"DOB\",\"dataType\":\"TimestampType\",\"nullable\":true}"
						        		+ "]"
						        		+ "}";

        String json = "["
		        		+ "{\"values\":[\"Michael\",29,1,\"1996-03-06 19:00:00.0\"],"+schemaJson+"},"
		        		+ "{\"values\":[\"Andy\",30,2,\"1998-12-06 19:00:00.0\"],"+schemaJson+"}"
	        		+ "]";
         assertEquals("should be same", json, ret);
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

        assertEquals("should be same", "name,age,expense,DOB", ret.toString());
    }
    
    @Test
    public void dataFrameCubeTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.cube()
    	 * GroupedData.avg()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeCubeTest", file);

        assertEquals("should be same", "[name: string, expense: int, AVG(age): double]".toLowerCase(), ret.toString().toLowerCase());
    }
    
    @Test
    public void dataFrameDescribeTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.describe()
    	 * DataFrame.toJSON()
    	 * RDD.toArray()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDescribeTest", file);
        String expected = "{\"summary\":\"count\",\"age\":\"3\",\"expense\":\"3\"},{\"summary\":\"mean\",\"age\":\"26.0\",\"expense\":\"2.0\"},{\"summary\":\"stddev\",\"age\":\"4.966554808583776\",\"expense\":\"0.8164965809277263\"},{\"summary\":\"min\",\"age\":\"19\",\"expense\":\"1\"},{\"summary\":\"max\",\"age\":\"30\",\"expense\":\"3\"}";
        assertEquals("should be same", expected, ret);
    }
    
    @Test
    public void dataFrameDistinctTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.distinct()
    	 * DataFrame.dropDuplicates()
    	 * DataFrame.count()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/peopleDuplicates.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDistinctTest", file);
        assertEquals("should be same", "3", ret);
    }
    
    @Test
    public void dataFrameDropDuplicatesTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.distinct()
    	 * DataFrame.dropDuplicates(string[])
    	 * DataFrame.count()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/peopleDuplicates.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDropDuplicatesTest", file);
        assertEquals("should be same", "2", ret);
    }
    
    @Test
    public void dataFrameDtypesTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.dTypes()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDtypesTest", file);
        String json = "[[\"name\",\"StringType\"],[\"age\",\"IntegerType\"],[\"expense\",\"IntegerType\"],[\"DOB\",\"TimestampType\"]]";
        assertEquals("should be same", json, ret);
    }
    
    
    @Test
    public void dataFrameExceptTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.except()
    	 * DataFrame.explain()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeExceptTest", file);
        String expect = "{\"name\":\"Justin\",\"age\":19,\"expense\":3,\"DOB\":\"1992-03-06 19:00:00.0\"}";
        assertEquals("should be same", expect, ret);
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
    public void dataFrameFirst() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.first()
     	 * * DataFrame.head()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeFirstTest", file);

        assertEquals("should be same", "LukeSkywalker", ret);
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
    public void dataFrameForeachTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.foreach()
    	 * DataFrame.toRDD()
    	 * RDD.foreach()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeForeachTest", file);

        String expected = "all good";
        assertEquals("should be same", expected, ret);
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
    
    /*
     * Dataframe dataType tests
     */
    
    @Test
    public void dataFrameTimestampTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.TimestampType
    	 * DataType.StringType
    	 * DataTypes.IntegerType
    	 * SqlTimestamp
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("timestampType", file);
        assertEquals("should be same", "Name: Andy DOB: 1998-12-06 19:00:00.0", ret);
    }
    
    @Test
    public void dataFrameDateTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.DateType
    	 * SqlDate 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/people.txt");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dateType", file);
        assertEquals("should be same", "Name: Andy DOB: 1998-12-06", ret);
    }
    
    
}
