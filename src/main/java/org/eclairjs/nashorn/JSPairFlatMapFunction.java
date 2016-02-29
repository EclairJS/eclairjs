package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFlatMapFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSPairFlatMapFunction implements PairFlatMapFunction {

    private String func = null;
    private Object args[] = null;
    private String functionName = null;

    public JSPairFlatMapFunction(String func,  Object[] o) {
        this.functionName = Utils.getUniqeFunctionName();
        this.func = "var " + this.functionName +" = " + func;
        this.args = o;
    }

    @Override
    public Iterable<Tuple2> call(Object o) throws Exception {

        ScriptEngine e =  NashornEngineSingleton.getEngine();

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object arg0 = Utils.javaToJs(o, e);
        Object params[] = {arg0};

        params = ArrayUtils.addAll(params, this.args);
        ScriptObjectMirror ret = (ScriptObjectMirror)invocable.invokeFunction(this.functionName, params);

        return (Iterable) Utils.jsToJava(ret);

    }
}
