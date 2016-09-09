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

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.spark.SparkContext;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URI;

public class TestUtils {

    private static TestKernel kernel = new TestKernel();

    private static ScriptEngine engine = null;

    public static ScriptEngine getEngine() {
        if(engine == null) {
            engine =  NashornEngineSingleton.getEngine();
 
            engine.put("kernel", kernel);

//            SparkBootstrap b = new SparkBootstrap();
//            b.load(engine);
        }

        return engine;
    }

    public static ScriptEngine getNewEngine() {
        engine = null;
        return getEngine();
    }

    public static String resourceToFile(String resource) throws Exception {
        URI uri = TestUtils.class.getResource(resource).toURI();
        File src = new File(uri);
        File dest = new File(System.getProperty("java.io.tmpdir"),
                FilenameUtils.getName(uri.toURL().toString()));

        FileUtils.copyFile(src, dest);

        return dest.getAbsolutePath();
    }

    public static void evalJSResource(ScriptEngine engine, String resource) throws Exception {
        String src= IOUtils.toString(new InputStreamReader(TestUtils.class.getResourceAsStream(resource)));
        src+="\n//@ sourceURL="+resource;

        engine.eval(src);
    }
}
