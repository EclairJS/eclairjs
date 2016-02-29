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

        String expected = "[\"(34,of)\",\"(30,the)\",\"(19,be)\",\"(19,to)\",\"(19,and)\",\"(15,will)\",\"(12,from)\",\"(12,I)\",\"(11,freedom)\",\"(10,that)\"]";
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
