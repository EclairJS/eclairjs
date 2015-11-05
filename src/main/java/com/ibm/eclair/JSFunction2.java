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

package com.ibm.eclair;

import org.apache.commons.lang.ArrayUtils;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSFunction2 implements org.apache.spark.api.java.function.Function2 {

    private String func = null;
    private Object args[] = null;
    private String functionName = null;

    public JSFunction2(String func, Object[] o) {
        this.functionName = Utils.getUniqeFunctionName();
        this.func = "var " + this.functionName +" = " + func;
        this.args = o;
    }

    @SuppressWarnings("null")
    @Override
    public Object call(Object o, Object o2) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();

        e.eval(this.func);
        Invocable invocable = (Invocable) e;
        Object arg0 = Utils.javaToJs(o, e);
        Object arg1 = Utils.javaToJs(o2, e);
        Object params[] = {arg0, arg1};

        params = ArrayUtils.addAll(params, this.args);
        Object ret = invocable.invokeFunction(this.functionName, params);

        return Utils.jsToJava(ret);
    }
}
