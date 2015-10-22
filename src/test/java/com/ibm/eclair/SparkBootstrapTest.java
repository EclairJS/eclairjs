package com.ibm.eclair;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.spark.SparkContext;
import org.junit.Test;

import java.io.InputStreamReader;

public class SparkBootstrapTest {


    @Test
    public void getEngine() throws Exception {
        ScriptEngineManager engineManager = new ScriptEngineManager();
        ScriptEngine engine = engineManager.getEngineByName("nashorn");
        SparkContext sc = new SparkContext("local[*]", "testapp");
        engine.put("sc", sc);

        SparkBootstrap b = new SparkBootstrap();
        b.load(engine);

        engine.eval(new InputStreamReader(getClass().getResourceAsStream("/rddtest.js")));
        Object ret = ((Invocable)engine).invokeFunction("test");

        System.out.println(ret);
        assertNotNull(ret);
    }

}
