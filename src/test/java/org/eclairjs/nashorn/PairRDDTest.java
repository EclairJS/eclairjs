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

    
}
