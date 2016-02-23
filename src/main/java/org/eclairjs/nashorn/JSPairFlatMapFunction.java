package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFlatMapFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;

public class JSPairFlatMapFunction implements PairFlatMapFunction {

    private String func = null;
    private Object args[] = null;

    public JSPairFlatMapFunction(String func,  Object[] o) {
        this.func = func;
        this.args = o;
    }

    @Override
    public Iterable<Tuple2> call(Object o) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        Invocable invocable = (Invocable) e;

        Object params[] = {this.func, o};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        ScriptObjectMirror ret = (ScriptObjectMirror)invocable.invokeFunction("Utils_invoke", params);

        ArrayList l = new ArrayList(ret.values());
        ArrayList<Tuple2> l2 = new ArrayList<Tuple2>(ret.size());

        for(Object t : l) {
            ArrayList al = new ArrayList(((ScriptObjectMirror)t).values());
            Object t1 = Utils.jsToJava(al.get(0));
            Object t2 = Utils.jsToJava(al.get(1));
            Tuple2 tuple = new Tuple2(t1, t2);

            l2.add(tuple);
        }

        return l2;
    }
}
