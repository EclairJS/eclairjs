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

import javax.script.Invocable;
import javax.script.ScriptEngine;

/**
 * Created by bburns on 10/22/15.
 */
public class RDDTest {

	@Test
    public void wordCount() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/top10words.js"); 
        Object ret = ((Invocable)engine).invokeFunction("wordCount", file);

        System.out.println(ret);
        String expected = "[[34,\"of\"],[30,\"the\"],[19,\"be\"],[19,\"to\"],[19,\"and\"],[15,\"will\"],[12,\"from\"],[12,\"I\"],[11,\"freedom\"],[10,\"that\"]]";
        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
    
}
