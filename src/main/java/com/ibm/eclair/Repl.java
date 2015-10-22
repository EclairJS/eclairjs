package com.ibm.eclair;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

public class Repl{
	//public static ScriptEngine engine = SparkBootstrap.getEngine(); //engineManager.getEngineByName("nashorn");

	public static void main (String args[]) {
	
	try{
		BufferedReader br = 
                      new BufferedReader(new InputStreamReader(System.in));
		//ScriptEngineManager engineManager = new ScriptEngineManager();
  	  //ScriptEngine engine = engineManager.getEngineByName("nashorn");
  	//ScriptEngine engine = SparkBootstrap.getEngine();
		String input;
			
		while((input=br.readLine())!=null){
			//System.out.println(input);

		  try {
				//engine.eval(new FileReader("javascript/hello.js"));
				//engine.eval(new FileReader("javascript/nashorntest.js"));
			  ScriptEngine engine = NashornEngineSingleton.getEngine();
		    	 Object ret = engine.eval(input);
		    	 System.out.println(ret);
			}  catch (ScriptException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    //Invocable invocable = (Invocable) engine;
		}	
	}catch(IOException io){
		io.printStackTrace();
	}	
  }
}