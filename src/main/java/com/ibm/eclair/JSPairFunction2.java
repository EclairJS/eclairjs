package com.ibm.eclair;

import jdk.nashorn.api.scripting.ScriptObjectMirror;

import org.apache.commons.lang.ArrayUtils;
import org.apache.log4j.Logger;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;

/**
 * Created by bburns on 9/13/15.
 */
public class JSPairFunction2 implements PairFunction {

    private final String func;
    private final Object[] scopeVar;

    public JSPairFunction2(String func, Object[] o) {
        this.func = "var JSPairFunctionEXPORTEDFUNCTION = " + func;
	    this.scopeVar = o;
    }

    @Override
    public Tuple2 call(Object a) throws Exception {

       // ScriptEngineManager m = new ScriptEngineManager();
        ScriptEngine e = NashornEngineSingleton.getEngine(); //FIXME m.getEngineByName("nashorn");
        
        //e = Utils.addScopeVarsToEngine(this.scopeVar, e);
        Logger logger = Logger.getLogger("JSPairFunction2");
        logger.info("func = " + this.func);

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object o = Utils.javaToJs(a, e);
        logger.info("o = " + o);
        Object params[] = {o};
        logger.info("scopeVar = " + this.scopeVar);
       
       // params[0] = o;
        params = ArrayUtils.addAll(params, this.scopeVar);
        logger.info("params = " + params);
        ScriptObjectMirror ret = (ScriptObjectMirror) invocable.invokeFunction("JSPairFunctionEXPORTEDFUNCTION", params); // FIXME reusing the function name in same engine not a good idea

        ArrayList l = new ArrayList(ret.values());
        Object t1 = Utils.jsToJava(l.get(0));
        Object t2 = Utils.jsToJava(l.get(1));
        Tuple2 t = new Tuple2(t1, t2);

        return t;
    }
}
