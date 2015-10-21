package com.ibm.spark.javascript;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by bburns on 9/13/15.
 */
public class JSPairFunction implements PairFunction {

    private final String func;
    private final HashMap scopeVar;

    public JSPairFunction(String func, HashMap o) {
        this.func = "var JSPairFunctionEXPORTEDFUNCTION = " + func;
	    this.scopeVar = o;
    }

    @Override
    public Tuple2 call(Object a) throws Exception {

       // ScriptEngineManager m = new ScriptEngineManager();
        ScriptEngine e = NashornEngineSingleton.getEngine(); //FIXME m.getEngineByName("nashorn");
        
        e = Utils.addScopeVarsToEngine(this.scopeVar, e);

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object o = Utils.javaToJs(a, e);
        ScriptObjectMirror ret = (ScriptObjectMirror) invocable.invokeFunction("JSPairFunctionEXPORTEDFUNCTION", o); // FIXME reusing the function name in same engine not a good idea

        ArrayList l = new ArrayList(ret.values());
        Object t1 = Utils.jsToJava(l.get(0));
        Object t2 = Utils.jsToJava(l.get(1));
        Tuple2 t = new Tuple2(t1, t2);

        return t;
    }
}
