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

public class SqlDataset {

	
    /*
     * DataFrame Unit Test Cases
     */

    @Test
    public void stringEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("stringEncoder");

        String expected = "[\"1\",\"2\",\"3\"]";
        assertEquals("should be same", expected, ret);
    }

    @Test
    public void intEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("intEncoder");

        assertEquals("should be same", "[2,3,4]", ret);
    }

    @Test
    public void floatEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("floatEncoder");

        assertEquals("should be same", "[1,2.2,3.45]", ret);
    }

    @Test
    public void doubleEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("doubleEncoder");

        assertEquals("should be same", "[1,2.2,3.45]", ret);
    }

    @Test
    public void booleanEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("booleanEncoder");

        assertEquals("should be same", "[true,false]", ret);
    }

    @Test
    public void dateEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("dateEncoder");

        assertEquals("should be same", "[\"1969-12-31\"]", ret);
    }

    @Test
    public void timestampEncoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("timestampEncoder");

        assertEquals("should be same", "[\"1969-12-31 19:00:30.0\"]", ret);
    }

    @Test
    public void tuple2Encoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("tuple2Encoder");

        assertEquals("should be same", "[{\"0\":1,\"1\":\"two\",\"length\":2}]", ret);
    }

    @Test
    public void tuple3Encoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("tuple3Encoder");

        assertEquals("should be same", "[{\"0\":1,\"1\":\"two\",\"2\":2.234,\"length\":3}]", ret);
    }

    @Test
    public void tuple4Encoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("tuple4Encoder");

        assertEquals("should be same", "[{\"0\":1,\"1\":\"two\",\"2\":2.234,\"3\":true,\"length\":4}]", ret);
    }

    @Test
    public void tuple5Encoder() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/dataset.js");
        Object ret = ((Invocable) engine).invokeFunction("tuple5Encoder");

        assertEquals("should be same", "[{\"0\":1,\"1\":\"two\",\"2\":2.234,\"3\":true,\"4\":3,\"length\":5}]", ret);
    }


}
