package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFlatMapFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.List;

public class JSPairFlatMapFunction implements PairFlatMapFunction {

    private String func = null;
    private Object args[] = null;
    private Object fn = null;

    public JSPairFlatMapFunction(String func,  Object[] o) {
        this.func = func;
        this.args = o;
    }

    @Override
    public Iterable<Tuple2> call(Object o) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        if (this.fn == null) {
            this.fn = e.eval(func);
        }
        Invocable invocable = (Invocable) e;

        Object params[] = {this.fn, o};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }


        List<Tuple2> l = (List<Tuple2>)invocable.invokeFunction("Utils_invoke", params);

        return l;
    }
}
