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
                "{\"values\":[null],\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[null],\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[null],\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}" +
                "]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

}
