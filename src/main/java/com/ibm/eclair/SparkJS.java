package com.ibm.eclair;


import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Level;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import java.util.Properties;

public class SparkJS{
	//public static ScriptEngine engine = NashornEngineSingleton.getEngine(); //engineManager.getEngineByName("nashorn");
	static final String LOG_PROPERTIES_FILE = "conf/Log4J.properties";
	public static void main (String args[]) throws FileNotFoundException {
		SparkJS.initializeLogger();
		// for debugging Logger.getLogger("com.ibm.spark.javascript").setLevel(Level.INFO);
		SparkJS js = new SparkJS();
		if (args.length > 0) {
			js.eval(new FileReader(args[0]));
		} else {
			js.repl();
		}
	
	}
	
	private static void initializeLogger()
	  {
	    Properties logProperties = new Properties();
	    
	    try
	    {
	      // load our log4j properties / configuration file
	      logProperties.load(new FileInputStream(LOG_PROPERTIES_FILE));
	      PropertyConfigurator.configure(logProperties);
	      //log.info("Logging initialized.");
	    }
	    catch(IOException e)
	    {
	      throw new RuntimeException("Unable to load logging property " + LOG_PROPERTIES_FILE);
	    }
	  }
	
	private Object eval(FileReader fileReader) {
		// TODO Auto-generated method stub
		Object ret; 
		try {
		  	 ScriptEngine engine = NashornEngineSingleton.getEngine();
	    	 ret = engine.eval(fileReader);
		}  catch (ScriptException e) {
			// TODO Auto-generated catch block
			ret = e;
			System.out.println(e);
		}
		return ret;
	}
	
	public Object eval(String javaScript) {
		Object ret; 
		try {
		  	 ScriptEngine engine = NashornEngineSingleton.getEngine();
	    	 ret = engine.eval(javaScript);
		}  catch (ScriptException e) {
			// TODO Auto-generated catch block
			System.out.println(e); 
			ret = e;
		}
		return ret;
		
	}
	
	public void repl() {
		try{
			BufferedReader br = 
	                      new BufferedReader(new InputStreamReader(System.in));
			String input;
			System.out.print("sparkjs>");	
			while((input=br.readLine())!=null){
		    	Object ret = this.eval(input);
		    	System.out.println(ret);
		    	System.out.print("sparkjs>");
			}	
		}catch(IOException io){
			io.printStackTrace();
		}	
	}
}