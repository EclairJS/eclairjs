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

public class WrappedObjectTest {


    static ScriptEngine engine;
    static Object execJS(  CharSequence... lines) throws Exception  {

        if(engine == null) {
            engine =  NashornEngineSingleton.getEngine();

//            SparkBootstrap b = new SparkBootstrap();
//            b.load(engine);
        }

        String src = "function testFunction(){"+String.join("\n", lines)+"\n}\n";
        engine.eval(src);
        Object ret = ((Invocable)engine).invokeFunction("testFunction");
        return ret;
    }

    @Test
    public void testJson() throws Exception {

        Object ret = execJS(
                 "  var Tuple2 = require('eclairjs/Tuple2');",
                "	var tuple = new Tuple2(1,\"A\");",
                "	return tuple.toJSON();");
        System.out.println(ret);

        String expected = "{\"0\":1,\"1\":\"A\",\"length\":2}";
        assertEquals("failure - strings are not equal", expected, ret);

    }


    
}
