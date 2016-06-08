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

import java.util.Properties;

import javax.script.ScriptEngine;

public class SparkBootstrap implements Bootstrap {

    private String debugJSSourceLocation = null;
    private String sparkHome = null;

    public  SparkBootstrap() {
        Properties props = System.getProperties();
        debugJSSourceLocation = (String) props.getProperty("eclairjs.jssource");
        sparkHome = System.getenv().get("SPARK_HOME");
    }

    private String getResourceAsURLStirng(String file) {

        String res = null;
        try {
            if (debugJSSourceLocation != null) {
                res = debugJSSourceLocation + file;
            } else {
                res = getClass().getResource(file).toURI().toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    /*
     * If we're on a workernode then SPARK_HOME will be in JAR's path.
     * Note: Commenting out for now as we don't need given that we're only
     * going to load bare essentials for both driver and worker nodes now.
     * Leaving in for now but commented out in case we change our minds.
     */
    /*
    private boolean isLoadingOnWorkerNode() {
        String jarLoc = Utils.jarLoc();
        if (jarLoc != null && sparkHome != null) {
            return jarLoc.indexOf(sparkHome, 0) > -1;
        }
        return false;
    }
    */

    public void load(ScriptEngine engine) {
        try {
            //module loading
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/EclairJS_Globals.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/ModuleUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/jvm-npm/jvm-npm.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Serialize.js") + "');");
            engine.eval("var Rating=Java.type('org.eclairjs.nashorn.wrap.mllib.recommendation.Rating');");
            engine.eval("var Tuple2=Java.type('org.eclairjs.nashorn.wrap.Tuple2');");
            engine.eval("var Tuple3=Java.type('org.eclairjs.nashorn.wrap.Tuple3');");

            NashornEngineSingleton.setEngine(engine);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
