package com.ibm.eclair;

import org.junit.Test;

import java.io.FileReader;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;


public class NashornTest {

    @Test
    public void nashorntest() throws Exception {
  
    	
        Object ret; 
		try {
		  	 ScriptEngine engine = NashornEngineSingleton.getEngine();
	    	 ret = engine.eval(new InputStreamReader(TestUtils.class.getResourceAsStream("/nashorntest.js")));
		}  catch (ScriptException e) {
			// TODO Auto-generated catch block
			ret = e;
			System.out.println(e);
		}

        System.out.println(ret);
    }
    
}
