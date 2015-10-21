package com.ibm.spark.javascript;

import javax.script.Invocable;
import javax.script.ScriptEngine;

import org.apache.spark.api.java.function.Function;

import java.util.HashMap;


public class JSFunction implements Function {
	private String func = null;
	private HashMap scopeVar = null;

    public JSFunction(String func, HashMap o) {
        this.func = "var EXPORTEDFUNCTION = " + func;
        this.scopeVar = o;
    }

    @Override
    public Object call(Object o) throws Exception {

        
    	System.out.println(" call");
        //ScriptEngineManager m = new ScriptEngineManager();
        ScriptEngine e =  NashornEngineSingleton.getEngine(); //m.getEngineByName("nashorn");
        System.out.println(" adding scope vars");
        e = Utils.addScopeVarsToEngine(this.scopeVar, e);

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object arg0 = Utils.javaToJs(o, e);
        Object ret = invocable.invokeFunction("EXPORTEDFUNCTION", arg0);

        return Utils.jsToJava(ret);
    }
}
