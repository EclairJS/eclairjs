package com.ibm.spark.javascript;

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class NashornEngineSingleton {
	//public static ScriptEngineManager engineManager = new ScriptEngineManager();
	static ScriptEngine engine = null;
    static Boolean sparkJSLoaded = false;

	public static ScriptEngine getEngine() {
        if(engine == null) {
            ScriptEngineManager engineManager = new ScriptEngineManager();
            engine = engineManager.getEngineByName("nashorn");
        }

        loadSparkJS();
        return engine;
    }

    public static void loadSparkJS ()  {
        if (sparkJSLoaded != true) {
            engine = new Bootstrap(engine).bootstrap();
            sparkJSLoaded = true;
        }
    }

	/**
	 * @param args
	 */
	public static void main(String[] args) {
        try {
            getEngine().eval(new FileReader(args[0]));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ScriptException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	}
}
