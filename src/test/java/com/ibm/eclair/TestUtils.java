package com.ibm.eclair;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.spark.SparkContext;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URI;

public class TestUtils {

    private static ScriptEngine engine = null;

    public static ScriptEngine getEngine() {
        if(engine == null) {
            ScriptEngineManager engineManager = new ScriptEngineManager();
            engine = engineManager.getEngineByName("nashorn");
            SparkContext sc = new SparkContext("local[*]", "testapp");
            engine.put("sc", sc);

            SparkBootstrap b = new SparkBootstrap();
            b.load(engine);
        }

        return engine;
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
        engine.eval(new InputStreamReader(TestUtils.class.getResourceAsStream(resource)));
    }
}
