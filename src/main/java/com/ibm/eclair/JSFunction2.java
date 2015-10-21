package com.ibm.eclair;

import javax.script.Invocable;
import javax.script.ScriptEngine;

import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.Function;


public class JSFunction2 implements Function {
	private String func = null;
	private Object args[] = null;

    public JSFunction2(String func, Object[] o) {
        this.func = "var EXPORTEDFUNCTION = " + func;
        this.args = o;
    }

    @SuppressWarnings("null")
	@Override
    public Object call(Object o) throws Exception {

        
    	System.out.println(" call");
        //ScriptEngineManager m = new ScriptEngineManager();
        ScriptEngine e =  NashornEngineSingleton.getEngine(); //m.getEngineByName("nashorn");
        System.out.println(" adding scope vars");
       // e = Utils.addScopeVarsToEngine(this.scopeVar, e);

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object arg0 = Utils.javaToJs(o, e);
        Object params[] = null;
        params[0] = arg0;
        params = ArrayUtils.addAll(params, args);
        Object ret = invocable.invokeFunction("EXPORTEDFUNCTION", params);

        return Utils.jsToJava(ret);
    }
}
