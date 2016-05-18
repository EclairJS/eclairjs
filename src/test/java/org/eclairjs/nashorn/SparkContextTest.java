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
import static org.junit.matchers.JUnitMatchers.*;
import static org.hamcrest.core.IsInstanceOf.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class SparkContextTest {

	@Test
    public void addInt() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("addInt");

         assertEquals("failure - values are not equal", 10, ret);

    };
    
    @Test
    public void addFloat() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("addFloat");

         assertEquals("failure - values are not equal", 11.0, ret);

    };
    
    @Test
    public void addFloatAccumulable() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("addFloatAccumulable");

         assertEquals("failure - values are not equal", 11.0, ret);

    };
    
    @Test
    public void intAccumulatorParam() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("intAccumulatorParam");

         assertEquals("failure - values are not equal", 10, ret);

    };
    
    @Test
    public void floatAccumulatorParam() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("floatAccumulatorParam");

         assertEquals("failure - values are not equal", 11.0, ret);

    };
    
    @Test
    public void floatAccumulator() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("floatAccumulator");

         assertEquals("failure - values are not equal", 11.0, ret);

    };
    
    @Test
    public void scFloatAccumulator() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("scFloatAccumulator");

         assertEquals("failure - values are not equal", 11.0, ret);

    };
    
    @Test
    public void scIntAccumulator() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
       // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("scIntAccumulator");

         assertEquals("failure - values are not equal", 10, ret);

    };

    @Test
    public void broadcast() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        // String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/sparkcontexttests.js");
        Object ret = ((Invocable)engine).invokeFunction("broadcast");

        assertEquals("failure - values are not equal", "[1,2]", ret);

    };

}
