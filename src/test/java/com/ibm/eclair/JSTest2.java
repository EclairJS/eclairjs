package com.ibm.eclair;

import org.junit.Test;

import java.io.FileReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

/**
 * Created by bburns on 10/22/15.
 */
public class JSTest2 {

    @Test
    public void nashorntest() throws Exception {
  
    	
        Object ret; 
		try {
		  	 ScriptEngine engine = NashornEngineSingleton.getEngine();
	    	 ret = engine.eval(new FileReader("/nashorntest.js"));
		}  catch (ScriptException e) {
			// TODO Auto-generated catch block
			ret = e;
			System.out.println(e);
		}

        System.out.println(ret);
    }
}
