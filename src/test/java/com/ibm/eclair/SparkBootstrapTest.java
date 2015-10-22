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

        ScriptEngine engine = TestUtils.getEngine();
        engine.eval(new InputStreamReader(getClass().getResourceAsStream("/rddtest.js")));
        Object ret = ((Invocable)engine).invokeFunction("test");

        System.out.println(ret);
        assertNotNull(ret);
    }
}
