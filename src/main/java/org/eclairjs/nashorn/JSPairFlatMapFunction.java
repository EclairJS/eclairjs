package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFlatMapFunction;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.List;

public class JSPairFlatMapFunction extends JSBaseFunction implements PairFlatMapFunction {

    public JSPairFlatMapFunction(String func,  Object[] o) {
        super(func,o);
    }

    @Override
    public Iterable<Tuple2> call(Object o) throws Exception {
        Object params[] = {o};


        Object ret = callScript(params);

        List<Tuple2> l = (List<Tuple2>)ret;

        return l;
    }
}
