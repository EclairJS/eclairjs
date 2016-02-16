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

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.script.*;

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
		//SparkJS.initializeLogger();
		// for debugging Logger.getLogger("com.ibm.spark.javascript").setLevel(Level.INFO);
		SparkJS js = new SparkJS();
		if (args.length > 0) {
			js.loadJS(args[0], args);
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
	    	InputStreamReader f = new InputStreamReader(SparkJS.class.getResourceAsStream(LOG_PROPERTIES_FILE));
	      logProperties.load(f);
	      //logProperties.load(new FileInputStream(LOG_PROPERTIES_FILE));
	      PropertyConfigurator.configure(logProperties);
	      //log.info("Logging initialized.");
	    }
	    catch(IOException e)
	    {
	      throw new RuntimeException("Unable to load logging property " + LOG_PROPERTIES_FILE);
	    }
	  }

	private Object loadJS(String jsFile, String args[]) {
		// TODO Auto-generated method stub
		Object ret;
		try {
			ScriptEngine engine = NashornEngineSingleton.getEngine();
			ScriptContext defCtx = engine.getContext();
			defCtx.getBindings(ScriptContext.GLOBAL_SCOPE).put("args", args);
			ret = engine.eval("load('"+jsFile+"');" );
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
	
	public void displayWelcome() {
		System.out.println("Welcome to eclairJS-nashorn, Type in expressions to have them evaluated.");
		System.out.println("SQL context available as sc..");
	}
	
	private String getMaster() {
		String master = System.getProperty("spark.master");
		if (master == null) {
			master = System.getenv("MASTER");
			if (master == null) {
				master = "local[*]";
			}
		}
		return master;			
	}
	
	private String getAppName() {
		String name = System.getProperty("spark.appname");
		if (name == null) {
			name = System.getenv("APP_NAME");
			if (name == null) {
				name = "eclairJS REPL application";
			}
			
		}
		return name;	
	}
	
	private String createSparkContext() {
		String master = this.getMaster();
		String name = this.getAppName();
		String sparkContext = "var conf = new SparkConf()";
		sparkContext += ".setMaster(\""+master+"\")";
		if (name != null) {
			sparkContext += ".setAppName(\""+name+"\")";
		}
		sparkContext += "; ";
		sparkContext += "var sc = new SparkContext(conf);";
		return sparkContext;
	}
	
	public void repl() {
		this.eval(this.createSparkContext());
		this.displayWelcome();
		try{
			BufferedReader br = 
	                      new BufferedReader(new InputStreamReader(System.in));
			String input;
			System.out.print("eclairjs>");	
			while((input=br.readLine())!=null){
		    	Object ret = this.eval(input);
		    	System.out.println(ret);
		    	System.out.print("eclairjs>");
			}	
		}catch(IOException io){
			io.printStackTrace();
		}	
	}
}
