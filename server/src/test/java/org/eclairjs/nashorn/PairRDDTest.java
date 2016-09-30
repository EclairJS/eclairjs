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

public class PairRDDTest {


    @Test
    public void combineByKey() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("combineByKey");

        String expected = "{\"pandas\":{\"0\":3,\"1\":1,\"length\":2},\"coffee\":{\"0\":7,\"1\":3,\"length\":2}}";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void countByKey() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("countByKey");

        String expected = "{\"pandas\":1,\"coffee\":3}";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void aggregateByKey() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("aggregateByKey");

        String expected = "[{\"0\":1,\"1\":{\"1\":2},\"length\":2},{\"0\":3,\"1\":{\"2\":1},\"length\":2},{\"0\":{\"0\":5,\"1\":3,\"length\":2},\"1\":{\"2\":1},\"length\":2},{\"0\":5,\"1\":{\"1\":1},\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void foldByKey() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("foldByKey");

        String expected = "[{\"0\":1,\"1\":1,\"length\":2},{\"0\":2,\"1\":2,\"length\":2},{\"0\":3,\"1\":3,\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void cogroup() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("cogroup");

        String expected = "[{\"0\":\"Apples\",\"1\":{\"0\":[\"Fruit\"],\"1\":[3],\"length\":2},\"length\":2},{\"0\":\"Oranges\",\"1\":{\"0\":[\"Fruit\",\"Citrus\"],\"1\":[2],\"length\":2},\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void cogroup2() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("cogroup2");

        String expected = "[{\"0\":\"Apples\",\"1\":{\"0\":[\"Fruit\"],\"1\":[3],\"2\":[42],\"length\":3},\"length\":2},{\"0\":\"Oranges\",\"1\":{\"0\":[\"Fruit\",\"Citrus\"],\"1\":[2],\"2\":[21],\"length\":3},\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void cogroup3() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("cogroup3");

        String expected = "[{\"0\":\"Apples\",\"1\":{\"0\":[\"Fruit\"],\"1\":[3],\"2\":[42],\"3\":[\"WA\"],\"length\":4},\"length\":2},{\"0\":\"Oranges\",\"1\":{\"0\":[\"Fruit\",\"Citrus\"],\"1\":[2],\"2\":[21],\"3\":[\"FL\"],\"length\":4},\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void join() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/pair_rdd_test.js");
        Object ret = ((Invocable)engine).invokeFunction("join");

        String expected = "[{\"0\":1,\"1\":{\"0\":\"Toy Story\",\"1\":10,\"length\":2},\"length\":2},{\"0\":2,\"1\":{\"0\":\"Cars\",\"1\":9.734,\"length\":2},\"length\":2},{\"0\":3,\"1\":{\"0\":\"Star Wars\",\"1\":10,\"length\":2},\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

}
