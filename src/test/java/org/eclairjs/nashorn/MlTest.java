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

public class MlTest {

	@Test
    public void Word2VecExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("Word2VecExample");
        
        String expected = "[" +
                "{\"values\":[[-0.006959987431764603,-0.002663574367761612,0.030144984275102617]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[[0.03422858566045761,0.026469426163073094,-0.02045729543481554]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[[0.04996728524565697,0.0027822263538837435,0.04833737155422568]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void AFTSurvivalRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("AFTSurvivalRegressionExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void ALSExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("ALSExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

}
