package com.ibm.eclair;

import org.junit.Test;

import javax.script.Invocable;
import javax.script.ScriptEngine;

/**
 * Created by bburns on 10/22/15.
 */
public class JSTest {

    @Test
    public void wordCount() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/dream.txt");

        TestUtils.evalJSResource(engine, "/top10words.js");
        Object ret = ((Invocable)engine).invokeFunction("wordCount", file);

        System.out.println(ret);
    }

    @Test
    public void dataFrame() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        String file = TestUtils.resourceToFile("/test.json");

        TestUtils.evalJSResource(engine, "/dataframetest.js");
        Object ret = ((Invocable)engine).invokeFunction("test", file);

        System.out.println(ret);
    }
}
