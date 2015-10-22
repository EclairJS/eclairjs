package com.ibm.eclair;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.Function;

public class JSFunction implements Function {
    private String func = null;
    private Object args[] = null;
    private String functionName = null;

    public JSFunction(String func, Object[] o) {
        this.functionName = Utils.getUniqeFunctionName();
        this.func = "var " + this.functionName +" = " + func;
        this.args = o;
    }

    @SuppressWarnings("null")
    @Override
    public Object call(Object o) throws Exception {


        ScriptEngine e =  NashornEngineSingleton.getEngine();

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object arg0 = Utils.javaToJs(o, e);
        Object params[] = {arg0};

        params = ArrayUtils.addAll(params, this.args);
        Object ret = invocable.invokeFunction(this.functionName, params);

        return Utils.jsToJava(ret);
    }
}

