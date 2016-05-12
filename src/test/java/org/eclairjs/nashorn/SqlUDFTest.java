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

        String expected = "[{\"values\":[\"test 1\",1,3,2.200000047683716,12.200000047683716],\"schema\":{\"fields\":[{\"name\":\"test\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"item2\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"floatNum\",\"dataType\":\"double\",\"nullable\":true},{\"name\":\"floatNum2\",\"dataType\":\"float\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"double\",\"nullable\":true}]}}]";
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

        String expected = "[{\"values\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"1234567\"],\"schema\":{\"fields\":[{\"name\":\"col1\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col2\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col3\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col4\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col5\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col6\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col7\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }
    @Test
    public void udf8Test() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/user_defined_function_test.js");
        Object ret = ((Invocable) engine).invokeFunction("udf8Test");

        String expected = "[{\"values\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"12345678\"],\"schema\":{\"fields\":[{\"name\":\"col1\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col2\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col3\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col4\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col5\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col6\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col7\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"col8\",\"dataType\":\"string\",\"nullable\":true},{\"name\":\"transformedByUDF\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

}
