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

public class SqlStreamingTest {


    @Test
    public void streamingTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("streamingTest");

        String expected = "[{\"values\":[\"Michael\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}},{\"values\":[\"Andy\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}},{\"values\":[\"Justin\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void processTimeTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("processTimeTest");

        String expected = "[{\"values\":[\"Michael\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}},{\"values\":[\"Andy\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}},{\"values\":[\"Justin\"],\"schema\":{\"fields\":[{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}}]";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void sinkSourceStatusTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("sinkSourceStatusTest");

        String expected = "{\"sink\":{\"description\":\"org.apache.spark.sql.execution.streaming.ForeachSink\",\"offsetDesc\":\"[\"},\"source\":{\"description\":\"FileStreamSource[file:\",\"offsetDesc\":\"S\"}}";
        assertEquals("should be same", expected, ret.toString());
    }

    @Test
    public void queryManagerTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("queryManagerTest");

         assertEquals("should be same", 1, ret);
    }

    @Test
    public void queryEventListenersTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("queryEventListenersTest");

        assertEquals("should be same", "removeListener successful!", ret);
    }

    @Test
    public void queryStopTest() throws Exception {

        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/streaming/streaming.js");
        Object ret = ((Invocable) engine).invokeFunction("queryStopTest");

        assertEquals("should be same", false, ret);
    }


}
