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
}
