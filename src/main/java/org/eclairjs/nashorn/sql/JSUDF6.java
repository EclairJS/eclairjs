package org.eclairjs.nashorn.sql;/*
 * Copyright 2016 IBM Corp.
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

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.sql.api.java.UDF6;
import org.eclairjs.nashorn.NashornEngineSingleton;
import org.eclairjs.nashorn.Utils;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSUDF6 extends JSUDF implements UDF6 {
    private String func = null;
    private Object args[] = null;
    private Object fn = null;
    private Object argsJS[] = null;

    public JSUDF6(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o, Object o2, Object o3, Object o4,Object o5, Object o6) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        if (this.fn == null) {
            this.fn = e.eval(func);
            if (this.args != null && this.args.length > 0 ) {
                this.argsJS=new Object[this.args.length];
                for (int i=0;i<this.args.length;i++)
                    this.argsJS[i]= Utils.javaToJs(this.args[i],e);
            }

        }
        Invocable invocable = (Invocable) e;

        Object params[] = {o, o2, o3, o4, o5, o6};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        for (int i=0;i<params.length;i++)
            params[i]=Utils.javaToJs(params[i],e);



//        Object ret = invocable.invokeFunction("myTestFunc", params);

        Object ret = ((ScriptObjectMirror)this.fn).call(null, params);
//        Object ret = invocable.invokeFunction("Utils_invoke", params);
        //ret = Utils.jsToJava(ret);
        ret = this.castValueToReturnType(ret);
        return ret;


    }


}
