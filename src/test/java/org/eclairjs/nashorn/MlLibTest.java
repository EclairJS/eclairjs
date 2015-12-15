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

public class MlLibTest {

	@Test
    public void LinearRegressionTest() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/linearregressiontest.js"); 
        Object ret = ((Invocable)engine).invokeFunction("LinearRegressionWithSGDTest", file);

        System.out.println(ret);
        String expected = "34.802055592544406,-0.4307829,32.26369105545771,-0.1625189,27.073768640300933,-0.1625189,32.956369807610656,-0.1625189,26.589176152816094,0.3715636,34.161678328568854,0.7654678,24.3647041765334,0.8544153,26.661937949806784,1.2669476,28.790597957841044,1.2669476,20.51350661135643,1.2669476";
        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
    
}
