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

import java.util.ArrayList;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSFunction2 implements org.apache.spark.api.java.function.Function2 {

    private String func = null;
    private Object args[] = null;
    private Object fn = null;
    private Object argsJS[] = null;

    public JSFunction2(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o, Object o2) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        if (this.fn == null) {
            this.fn = e.eval(func);
            if (this.args != null && this.args.length > 0 ) {
                this.argsJS=new Object[this.args.length];
                for (int i=0;i<this.args.length;i++)
                    this.argsJS[i]=Utils.javaToJs(this.args[i],e);
            }
        }

        Invocable invocable = (Invocable) e;

        Object params[] = { o, o2};
//        Object params[] = {this.fn, o};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        for (int i=0;i<params.length;i++)
            params[i]=Utils.javaToJs(params[i],e);



//        Object ret = invocable.invokeFunction("myTestFunc", params);

        Object ret = ((ScriptObjectMirror)this.fn).call(null, params);
//        Object ret = invocable.invokeFunction("Utils_invoke", params);
        ret = Utils.jsToJava(ret);

        return ret;

        /*
        Invocable invocable = (Invocable) e;

        Object params[] = {this.fn, o, o2};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        Object ret = invocable.invokeFunction("Utils_invoke", params);

        //return Utils.jsToJava(ret);
        return ret;
        */
    }
}
