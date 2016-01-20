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

public class SqlTest {

	
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeAggTest", file);

        String json = "{\"values\":[30,6],\"schema\":{\"fields\":[{\"name\":\"max(age)\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"sum(expense)\",\"dataType\":\"long\",\"nullable\":true}]}}";
        assertEquals("should be same", json.toLowerCase(), ret.toString().toLowerCase()); // case is sometimes different when run from maven
    }
    
    @Test
    public void dataFrameApplyTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeAsTest", file);

         assertEquals("should be same", "[name: string, age: int, expense: int, DOB: timestamp, income: double, married: boolean, networth: double]", ret.toString()); 
    }
    
    @Test
    public void dataFrameColTest() throws Exception {
    	/*
    	 * test
    	 * DataFrame.col("name")
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeCollectTest", file);
        String schemaJson = "\"schema\":{"
						        		+ "\"fields\":["
							        		+ "{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true},"
							        		+ "{\"name\":\"age\",\"dataType\":\"integer\",\"nullable\":true},"
							        		+ "{\"name\":\"expense\",\"dataType\":\"integer\",\"nullable\":true},"
							        		+ "{\"name\":\"DOB\",\"dataType\":\"timestamp\",\"nullable\":true},"
							        		+ "{\"name\":\"income\",\"dataType\":\"double\",\"nullable\":true},"
							        		+ "{\"name\":\"married\",\"dataType\":\"boolean\",\"nullable\":true},"
							        		+ "{\"name\":\"networth\",\"dataType\":\"double\",\"nullable\":true}"
						        		+ "]"
						        		+ "}";

        String json = "["
		        		+ "{\"values\":[\"Michael\",29,1,\"1996-03-06 19:00:00.0\",1200.4,true,300000000.11],"+schemaJson+"},"
		        		+ "{\"values\":[\"Andy\",30,2,\"1998-12-06 19:00:00.0\",1500.44,false,500000000.11],"+schemaJson+"}"
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeColumnsTest", file);

        assertEquals("should be same", "name,age,expense,DOB,income,married,networth", ret.toString());
    }
    
    @Test
    public void dataFrameCubeTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.cube()
    	 * GroupedData.avg()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDescribeTest", file);
        String expected = "{\"summary\":\"count\",\"age\":\"3\",\"expense\":\"3\"},{\"summary\":\"mean\",\"age\":\"26.0\",\"expense\":\"2.0\"},{\"summary\":\"stddev\",\"age\":\"6.082762530298219\",\"expense\":\"1.0\"},{\"summary\":\"min\",\"age\":\"19\",\"expense\":\"1\"},{\"summary\":\"max\",\"age\":\"30\",\"expense\":\"3\"}";
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
        String file = TestUtils.resourceToFile("/data/sql/peopleDuplicates.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/peopleDuplicates.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeDtypesTest", file);
        String json = "["
		        		+ "[\"name\",\"StringType\"],"
		        		+ "[\"age\",\"IntegerType\"],"
		        		+ "[\"expense\",\"IntegerType\"],"
		        		+ "[\"DOB\",\"TimestampType\"],"
		        		+ "[\"income\",\"DoubleType\"],"
		        		+ "[\"married\",\"BooleanType\"],"
		        		+ "[\"networth\",\"DoubleType\"]"
	        		+ "]";
        assertEquals("should be same", json, ret);
    }
    
    
    @Test
    public void dataFrameExceptTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.except()
    	 * DataFrame.explain()
    	 * DataFrame.printSchema()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeExceptTest", file);
        String expect = "{\"name\":\"Justin\",\"age\":19,\"expense\":3,\"DOB\":\"1992-03-06 19:00:00.0\",\"income\":1600.0,\"married\":true,\"networth\":100000.0}";
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeForeachTest", file);

        String expected = "all good";
        assertEquals("should be same", expected, ret);
    }
    
    @Test
    public void dataFrameForeachPartitionTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.foreach()
    	 * DataFrame.toRDD()
    	 * RDD.foreach()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeForeachPartitionTest", file);

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

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeHeadTest", file);

        assertEquals("should be same", "LukeSkywalker", ret);
    }
    
    @Test
    public void dataFrameInputFiles() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.head()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeInputFilesTest", file);

        assertEquals("should be same", "all good", ret);
    }
    
    @Test
    public void dataFrameIntersect() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.intersect()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeIntersectTest", file);

        assertEquals("should be same", "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11],[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11]", ret);
    }
    
    @Test
    public void dataFrameIsLocal() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.isLocal()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeIsLocalTest", file);

        assertEquals("should be same", false, ret);
    }
    
    @Test
    public void dataFrameJoin() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.join()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeJoinTest", file);

        assertEquals("should be same", "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11,Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11]", ret);
    }
    
    @Test
    public void dataFrameJoinUsingColumn() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.join()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeJoinTest", file, "age");

        assertEquals("should be same", "[19,Justin,3,1992-03-06 19:00:00.0,1600,true,100000,Justin,3,1992-03-06 19:00:00.0,1600,true,100000]", ret);
    }
    
    @Test
    public void dataFrameJoinUsingColumns() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.join()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeJoinUsingColumnsTest", file);

        assertEquals("should be same", "[30,1998-12-06 19:00:00.0,Andy,2,1500.44,false,500000000.11,Andy,2,1500.44,false,500000000.11]", ret);
    }
    
    @Test
    public void dataFrameJoinColumnExpr() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.join()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeJoinColumnExprTest", file);

        assertEquals("should be same", "[Andy,30,Andy,1998-12-06 19:00:00.0]", ret);
    }
    
    @Test
    public void dataFrameJoinColumnExprOuter() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.join()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeJoinColumnExprTest", file, "outer");

        assertEquals("should be same", "[Andy,30,Andy,1998-12-06 19:00:00.0]", ret);
    }
    
    @Test
    public void dataFrameLimit() throws Exception {
    	/*
    	 * tests 
     	 * DataFrame.limit()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeLimitTest", file);
        assertEquals("should be same", "1", ret.toString());
    }
    
    @Test
    public void dataFrameMapTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.map()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeMapTest", file);

        String expected = "Name: Michael,Name: Andy,Name: Justin";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameMapPartitionsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.mapPartition()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeMapPartitionsTest", file);

        String expected = "2,1";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaTest", file);

        String expected = "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameOrderByTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.orderBy()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeOrderByTest", file);

        String expected = ""
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000],"
        		+ "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFramePersistTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.persist()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframePersistTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameQueryExecutionTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.queryExecution()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeQueryExecutionTest", file);

        String expected = "ok";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameRandomSplitTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.randomSplit()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeRandomSplitTest", file);

        String expected = "2";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameRandomSplitSeedTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.randomSplit()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeRandomSplitTest", file, 1);

        String expected = "2";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameRollupTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.rollup()
    	 * DataFrame.repartition()
    	 * GroupedData.avg()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeRollupTest", file);

        String expected = "[30,,1],[29,300000000.11,1],[29,,1],[30,500000000.11,1],[,,3],[19,100000,1],[19,,1]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSampleTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.sample()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSampleTest", file);

        String expected = "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSchemaTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.schema()
    	 * StructType.simpleString()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSchemaTest", file);

        String expected = "struct<name:string,age:int,expense:int,DOB:timestamp,income:double,married:boolean,networth:double>";

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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSelectTest", file);

        String expected = "[Michael,29],[Andy,30],[Justin,19]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSelectExpr() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.selectExpr()
    	 */
    	ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSelectExprTest", file);

        String expected = "[Michael,true],[Andy,true],[Justin,false]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSortTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.sort()
    	 * Column.asc()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSortTest", file);

        String expected = ""
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000],"
        		+ "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameSortDescTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.sort()
    	 * Column.desc()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeSortDescTest", file);

        String expected = ""
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameToDF() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.selectExpr()
    	 */
    	ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeToDFTest", file);

        String expected = "[newName: string, newAge: int]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameUnionAll() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.selectExpr()
    	 */
    	ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeUnionAllTest", file);

        String expected = "[Michael,true],[Andy,false],[Justin,true],[Michael,true],[Andy,true],[Justin,false]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameWhereTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.filter()
    	 * DataFrame.filterWithString()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeWhereTest", file);

        String expected = "Name: Michael,Name: Andy";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataframeWithColumnTest() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.selectExpr()
    	 */
    	ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeWithColumnTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,1200.4,true,300000000.11,29],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11,30],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000,19]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataframeWithColumnRenameTest() throws Exception {
    	/*
    	 * tests 
    	 * DataFrame.selectExpr()
    	 */
    	ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeWithColumnRenamedTest", file);

        String expected = "[name: string, renamedAge: int, expense: int, DOB: timestamp, income: double, married: boolean, networth: double]";

        assertEquals("should be same", expected, ret.toString());
    }
    
    /*
     * DataFrame Column tests
     */
    
    @Test
    public void columnAsTest() throws Exception {
    	/*
    	 * tests
    	 * Column.as
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("asCloumn", file);
        assertEquals("should be same", "age AS ArrayBuffer(newAge, ventage)", ret);
    }
    
    @Test
    public void columnBetweenTest() throws Exception {
    	/*
    	 * tests
    	 * Column.between
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("betweenCloumn", file);
        assertEquals("should be same", "[true],[false],[true]", ret);
    }
    
    @Test
    public void columnCastTest() throws Exception {
    	/*
    	 * tests
    	 * Column.cast
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("castCloumn", file);
        assertEquals("should be same", "[\"29\",\"30\",\"19\"]", ret);
    }
    
    @Test
    public void columnContansTest() throws Exception {
    	/*
    	 * tests
    	 * Column.contains
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("containsCloumn", file);
        assertEquals("should be same", "Contains(name, dogs)", ret);
    }
    
    @Test
    public void columnDivideTest() throws Exception {
    	/*
    	 * tests
    	 * Column.divide
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("divideCloumn", file);
        assertEquals("should be same", "[249916.69452682437],[333235.58430193807],[62.5]", ret);
    }
    
    @Test
    public void columnInTest() throws Exception {
    	/*
    	 * test
    	 * Column.in
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("inCloumn", file);
        assertEquals("should be same", "[false],[false],[true]", ret);
    }
    
    @Test
    public void columnOtherwiseTest() throws Exception {
    	/*
    	 * tests
    	 * Column.when
    	 * Column.otherwise
    	 * functions.when
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("otherwiseCloumn", file);
        assertEquals("should be same", "[true],[true],[false]", ret);
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
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
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dateType", file);
        assertEquals("should be same", "Name: Andy DOB: 1998-12-06", ret);
    }
    
    @Test
    public void dataFrameFloatTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.FloatType
    	 * DataType.DoubleType 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("floatType", file);
        assertEquals("should be same", "Name: Andy income: 1500.44,Name: Justin income: 1600", ret);
    }
        
    @Test
    public void dataFrameDoubleTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.FloatType
    	 * DataType.DoubleType 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("doubleType", file);
        assertEquals("should be same", "Name: Andy income: 1500.44,Name: Justin income: 1600", ret);
    }
    
    @Test
    public void dataFrameBooleanTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.BooleanType
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("booleanType", file);
        assertEquals("should be same", "Name: Michael married: true,Name: Justin married: true", ret);
    }
    
    @Test
    public void arrayTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.BooleanType
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
       
        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("arrayTypeTest");
        assertEquals("should be same", 4, ret);
    }
    
    @Test
    public void binaryTypeTest() throws Exception {
    	/*
    	 * tests
    	 * DataType.BooleanType
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
       
        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("binaryTypeTest");
        String expected = "[\"key: 1 value: 101010\",\"key: 2 value: 101010\",\"key: 3 value: 101010\"]";
        assertEquals("should be same", expected, ret); 
    }
    
   
    /*
     * sql.functions tests
     */
    
    @Test
    public void functionsLitTest() throws Exception {
    	/*
    	 * tests
    	 * functions.lit()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsLit", file);
        assertEquals("should be same", "age", ret);
    }
    
    @Test
    public void functionsApproxCountDistinctTest() throws Exception {
    	/*
    	 * tests
    	 * functions.approxCountDistinct()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsApproxCountDistinct", file);
        assertEquals("should be same", "[3]", ret);
    }
    
    @Test
    public void functionsCountDistinctTest() throws Exception {
    	/*
    	 * tests
    	 * functions.approxCountDistinct()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsCountDistinct", file);
        assertEquals("should be same", "[3]", ret);
    }
    
    @Test
    public void functionsArrayTest() throws Exception {
    	/*
    	 * tests
    	 * functions.array()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsArray", file);
        assertEquals("should be same", "array(age,expense)", ret);
    }
    
    @Test
    public void functionsCoalesceTest() throws Exception {
    	/*
    	 * tests
    	 * functions.coalesce()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsCoalesce", file);
        assertEquals("should be same", "coalesce(name,age)", ret);
    }
    
    @Test
    public void functionsStructTest() throws Exception {
    	/*
    	 * tests
    	 * functions.struct()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsStruct", file);
        assertEquals("should be same", "struct(name,age)", ret);
    }
    
    @Test
    public void functionsGreatestTest() throws Exception {
    	/*
    	 * tests
    	 * functions.struct()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsGreatest", file);
        assertEquals("should be same", "greatest(name,age)", ret);
    }
    
    @Test
    public void functionsExprTest() throws Exception {
    	/*
    	 * tests
    	 * functions.expr()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsExpr", file);
        assertEquals("should be same", "[4,1],[6,1],[7,1]", ret);
    }
    
    @Test
    public void functionsAtan2Test() throws Exception {
    	/*
    	 * tests
    	 * functions.atan2()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsAtan2", file);
        assertEquals("should be same", "all good", ret);
    }
    
    @Test
    public void functionsConcatTest() throws Exception {
    	/*
    	 * tests
    	 * functions.concat()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsConcat", file);
        assertEquals("should be same", "concat(name,age)", ret);
    }
    
    @Test
    public void functionsFrom_unixtime() throws Exception {
    	/*
    	 * tests
    	 * functions.concat()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsFrom_unixtime", file);
        assertEquals("should be same", "fromunixtime(DOB,yyyy-MM-dd)", ret);
    }
    
    @Test
    public void functionsUnixtime() throws Exception {
    	/*
    	 * tests
    	 * functions.concat()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsUnix_timestamp", file);
        assertEquals("should be same", "unixtimestamp(currenttimestamp(),yyyy-MM-dd HH:mm:ss)", ret);
    }
    
    @Test
    public void functionsSort_array() throws Exception {
    	/*
    	 * tests
    	 * functions.concat()
    	 *  
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("functionsSort_array", file);
        assertEquals("should be same", "sort_array(DOB,true)", ret);
    }
    /*
     * Row tests
     */
    
    @Test
    public void rowMkStringTest() throws Exception {
    	/*
    	 * tests
    	 * Row.mkString("")
    	 * 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("rowMkStringType", file);
        assertEquals("should be same", "Michael2911996-03-061200.4true300000000.11Andy3021998-12-061500.44false500000000.11", ret);
    }
    
    @Test
    public void rowMkStringSepTest() throws Exception {
    	/*
    	 * tests
    	 * Row.mkString(",")
    	 * 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("rowMkStringType", file, ", ");
        assertEquals("should be same", "Michael, 29, 1, 1996-03-06, 1200.4, true, 300000000.11Andy, 30, 2, 1998-12-06, 1500.44, false, 500000000.11", ret);
    }
    
    @Test
    public void rowMkStringSepStartTest() throws Exception {
    	/*
    	 * tests
    	 * Row.mkString(",", "[")
    	 * 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("rowMkStringType", file, ", ", "[");
        assertEquals("should be same", "Michael, 29, 1, 1996-03-06, 1200.4, true, 300000000.11Andy, 30, 2, 1998-12-06, 1500.44, false, 500000000.11", ret);
    }
    
    @Test
    public void rowMkStringSepStartEndTest() throws Exception {
    	/*
    	 * tests
    	 * Row.mkString(",", "[")
    	 * 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("rowMkStringType", file, ", ", "[", "]");
        assertEquals("should be same", "[Michael, 29, 1, 1996-03-06, 1200.4, true, 300000000.11][Andy, 30, 2, 1998-12-06, 1500.44, false, 500000000.11]", ret);
    }
    
    /*
     * GroupedData tests
     */

    @Test
    public void groupdedDataAgg() throws Exception {
    	/*
    	 * tests
    	 * Row.mkString(",", "[")
    	 * 
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("groupdedDataAgg", file);
        assertEquals("should be same", "[Andy,30,2],[Michael,29,1],[Justin,19,3]", ret);
    }
    
    /*
     * DataFrameNaFunctions tests
     */
    
    @Test
    public void dataFrameNaFunctionsDropTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop('all')
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsDropTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsDropColTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop(["colName", "colName"])
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsDropColsTest", file);

        String expected = "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsDropAllColTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop("all", ["colName", "colName"])
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsDropAllColsTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsDropIntTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop(0)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsDropIntTest", file);

        String expected = "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsDropIntColsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.drop(0, ["colName"])
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsDropIntColsTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,30,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[Justin,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsFillNumberTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsFillNumberTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,99.99,true,300000000.11],"
        		+ "[Andy,99,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsFillNumberColsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsFillNumberColsTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,99,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsFillStringTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsFillStringTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[missing,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsFillStringColsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsFillStringColsTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[missing,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsFillMapTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsFillHashMapTest", file);

        String expected = "[Michael,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,99,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[missing,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsReplaceTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsReplaceTest", file);

        String expected = "[MichaelReplace,29,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[AndyReplace,,2,1998-12-06 19:00:00.0,1500.44,false,500000000.11],"
        		+ "[,19,3,1992-03-06 19:00:00.0,1600,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameNaFunctionsReplaceColsTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataframeNaFunctionsReplaceColsTest", file);

        String expected = "[Michael,0,1,1996-03-06 19:00:00.0,NaN,true,300000000.11],"
        		+ "[Andy,,2,1998-12-06 19:00:00.0,1500.44,false,11.11],"
        		+ "[,19,3,1992-03-06 19:00:00.0,99.99,true,100000]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameParquetTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/peopleNullValues2.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataFrameParquetTest", file);

        String expected = "[{\"values\":[\"Michael\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void sqlContextSetConfTest() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.setConf(key, value)
    	 * SQLContext.getConf(key)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
 
        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("sqlContextSetConfTest");

        String expected = "Golden Retriever";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void sqlContextgetAllConfTest() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.setConf(key, value)
    	 * SQLContext.getAllConfs()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
 
        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("sqlContextGetAllConfTest");

        String expected = "{\"prop2\":\"value2\",\"prop1\":\"value1\"}";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void sqlContextRangeTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
       
        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("sqlContextRangeTest");

        String expected = "[1],[2],[3],[4]";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameStatCovTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataFrameStatCovTest", file);

        String expected = "-18267014009.15126";
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void dataFrameStatCrossTabTest() throws Exception {
    	/*
    	 * tests
    	 * DataFrame.na()
    	 * DataFrameNaFunctions.fill(99.99)
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("dataFrameStatCrossTabTest", file);
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"key_value\",\"dataType\":\"string\",\"nullable\":true},"
        		+ 				"{\"name\":\"1\",\"dataType\":\"long\",\"nullable\":false},"
        		+ 				"{\"name\":\"2\",\"dataType\":\"long\",\"nullable\":false},"
        		+ 				"{\"name\":\"3\",\"dataType\":\"long\",\"nullable\":false}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[\"2\",2,0,1]," + schema + "},"
        		+ "{\"values\":[\"1\",1,1,0]," + schema + "},"
        		+ "{\"values\":[\"3\",0,1,1]," + schema + "}"
        		+ "]";
        assertEquals("should be same", expected, ret.toString());
    }
    
}
