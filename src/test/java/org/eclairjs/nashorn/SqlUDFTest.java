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

import javax.script.Invocable;
import javax.script.ScriptEngine;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertSame;

public class SqlUDFTest {

	
    /*
     * User Defined Function Unit Test Cases
     */
    String stringTableSchema = "{" +
                                    "\"fields\":[" +
                                        "{\"name\":\"col1\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col2\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col3\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col4\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col5\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col6\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col7\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col8\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col9\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col10\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col11\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col12\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col13\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col14\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col15\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col16\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col17\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col18\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col19\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col20\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col21\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"col22\",\"dataType\":\"string\",\"nullable\":true}," +
                                        "{\"name\":\"transformedByUDF\",\"dataType\":\"string\",\"nullable\":true}" +
                                    "]" +
                                "}";


    @Test
    public void udf1Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf1Test");

        String expected = "[{\"values\":[\"test 1\",6],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}},{\"values\":[\"string 2\",8],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}},{\"values\":[\"string 3\",8],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf2Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf2Test");

        String expected = "[{\"values\":[\"test 1\",1,7],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}},{\"values\":[\"string 2\",2,10],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}},{\"values\":[\"string 3\",3,11],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"integer\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf3Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf3Test");

        String expected = "[{\"values\":[\"test 1\",1,3,10],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"float\",\"nullable\":true}]}},{\"values\":[\"string 2\",2,1.1,11.100000381469727],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"float\",\"nullable\":true}]}},{\"values\":[\"string 3\",3,2.2,13.199999809265137],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"float\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf4Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf4Test");

        String expected = "[{\"values\":[\"test 1\",1,3,2.200000047683716,12.200000047684],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"floatNum2\",\"dataType\":\"float\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"double\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf5Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf5Test");

        String expected = "[{\"values\":[\"test 1\",1,3,2.200000047683716,\"1996-03-07 00:00:00.0\",\"test 1 1 3 2.200000047683716 1996-03-07 00:00:00.0\"],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"floatNum2\",\"dataType\":\"float\",\"nullable\":true},{\"name\":\"dob\",\"dataType\":\"timestamp\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf6Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf6Test");

        String expected = "[{\"values\":[\"26\",\"6\",\"1999\",\"9\",\"12\",\"30\",\"1999-06-26 09:12:30.0\"],\"schema\":{\"fields\":[{\"name\":\"day\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"month\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"year\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"hour\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"minute\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"second\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"timestamp\",\"dataType\":\"timestamp\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf7Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf7Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"1234567\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf8Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf8Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"12345678\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf9Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf9Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"123456789\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf10Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf10Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"12345678910\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf11Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf11Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"1234567891011\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf12Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf12Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"123456789101112\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf13Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf13Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"12345678910111213\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf14Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf14Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"1234567891011121314\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf15Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf15Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"123456789101112131415\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf16Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf16Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"12345678910111213141516\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf17Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf17Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"1234567891011121314151617\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf18Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf18Test");

        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"123456789101112131415161718\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf19Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf19Test");


        String expected = "[" +
                "{" +
                    "\"values\":[" +
                                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                                "\"12345678910111213141516171819\"" +
                    "]," +
                    "\"schema\":" + stringTableSchema +
                "}" +
        "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf20Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf20Test");


        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"1234567891011121314151617181920\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf21Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf21Test");


        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"123456789101112131415161718192021\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void udf22Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf22Test");


        String expected = "[" +
                "{" +
                "\"values\":[" +
                "\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\"," +
                "\"12345678910111213141516171819202122\"" +
                "]," +
                "\"schema\":" + stringTableSchema +
                "}" +
                "]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void callUdfTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("callUdfTest");


        String expected = "[{\"values\":[\"12\"],\"schema\":{\"fields\":[{\"name\":\"udfTest(col1,col2)\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }


}
