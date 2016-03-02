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
/*
* Copyright 2016 IBM Corp.
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

public class CoreExamplesTest {


    @Test
    public void WordCount() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("WordCount");

        String expected = "[{\"0\":34,\"1\":\"of\",\"length\":2},{\"0\":30,\"1\":\"the\",\"length\":2}," +
                "{\"0\":19,\"1\":\"be\",\"length\":2},{\"0\":19,\"1\":\"to\",\"length\":2}," +
                "{\"0\":19,\"1\":\"and\",\"length\":2},{\"0\":15,\"1\":\"will\",\"length\":2}," +
                "{\"0\":12,\"1\":\"from\",\"length\":2},{\"0\":12,\"1\":\"I\",\"length\":2}," +
                "{\"0\":11,\"1\":\"freedom\",\"length\":2},{\"0\":10,\"1\":\"that\",\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void SparkTC() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("SparkTC");

        String expected = "all is good";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void SparkPI() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("SparkPI");

        String expected = "all is good";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void SparkLR() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("SparkLR");

        String expected = "all is good";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void PageRank() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("PageRank");

        String expected = "4 has rank: 0.7539975652935547.\n" +
                "2 has rank: 0.7539975652935547.\n" +
                "3 has rank: 0.7539975652935547.\n" +
                "1 has rank: 1.7380073041193354.\n";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void LogQuery() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/core_examples_test.js");
        Object ret = ((Invocable)engine).invokeFunction("LogQuery");

        String expected = "[\"(" +
                "{\\\"ip\\\":\\\"10.10.10.10\\\",\\\"query\\\":\\\"GET http:\\\\/\\\\/images.com\\\\/2013\\\\/Generic.jpg HTTP\\\\/1.1\\\",\\\"user\\\":\\\"\\\\\\\"FRED\\\\\\\"\\\"}," +
                "{\\\"bytes\\\":621.0,\\\"count\\\":2.0})\"]";
        assertEquals("failure - strings are not equal", expected, ret);

    }


    
}
