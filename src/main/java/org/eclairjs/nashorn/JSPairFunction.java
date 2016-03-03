/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.ScriptObjectMirror;

import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFunction;

import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by bburns on 9/13/15.
 */
public class JSPairFunction implements PairFunction {


    private final String func;
    private final Object[] args;

    public JSPairFunction(String func, Object[] o) {
        this.func = func;
	    this.args = o;
    }

    @SuppressWarnings("unchecked")
	@Override
    public Tuple2 call(Object o) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        Invocable invocable = (Invocable) e;

        Object params[] = {this.func, o};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        /*
        ScriptObjectMirror ret = (ScriptObjectMirror)invocable.invokeFunction("Utils_invoke", params);

        @SuppressWarnings("rawtypes")
		ArrayList l = new ArrayList(ret.values());
        Object t1 = Utils.jsToJava(l.get(0));
        Object t2 = Utils.jsToJava(l.get(1));
        @SuppressWarnings("rawtypes")
		Tuple2 t = new Tuple2(t1, t2);

        return t;
        */
        //ScriptObjectMirror ret = (ScriptObjectMirror)invocable.invokeFunction("Utils_invoke", params);
        //List ret = (List)invocable.invokeFunction("Utils_invoke", params);
        Tuple2 ret = (Tuple2)invocable.invokeFunction("Utils_invoke", params);

        //@SuppressWarnings("rawtypes")
        //List l = (List)Utils.jsToJava(ret.values());

        //@SuppressWarnings("rawtypes")
        //Tuple2 t = new Tuple2(l.get(0), l.get(1));
        //Tuple2 t = new Tuple2(ret.get(0), ret.get(1));

        return ret;
        //return (Tuple2) Utils.jsToJava(ret);
    }
}
