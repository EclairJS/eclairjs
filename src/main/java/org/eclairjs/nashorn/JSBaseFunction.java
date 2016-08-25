/*
s * Copyright 2015 IBM Corp.
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
import jdk.nashorn.api.scripting.ScriptUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.Function;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;

import org.apache.spark.sql.Encoders.*;
import org.apache.spark.sql.Encoder;
import org.eclairjs.nashorn.wrap.sql.Encoders;
import scala.reflect.ClassTag;

abstract class JSBaseFunction implements Serializable{
    private String func = null;
    private Object args[] = null;
    private Object argsJS[] = null;
    private Object fn = null;

    public JSBaseFunction(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    protected Object callScript(Object params[]) throws Exception {
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


        if (this.args != null && this.args.length > 0 ) {
        	params = ArrayUtils.addAll(params, this.args);
        }

        for (int i=0;i<params.length;i++)
            params[i]=Utils.javaToJs(params[i],e);

        Object ret = ((ScriptObjectMirror)this.fn).call(null, params);
        ret = Utils.jsToJava(ret);
        return ret;
    }

    Iterator toIterator(Object obj,Encoder encoder)
    {
        Iterator iter=null;
        if (obj.getClass().isArray()) {
            String type = obj.getClass().getTypeName();
            if (type.equals("double[]")) {
                double [] z = (double []) obj;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(castDataType(z[i],encoder));
                }
                iter = x.iterator();
            } else if (type.equals("int[]")) {
                int [] z = (int []) obj;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(castDataType(z[i],encoder));
                }
                iter = x.iterator();
            } else {
                Object [] z = (Object []) obj;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(castDataType(z[i],encoder));
                }
                iter = x.iterator();
            }

        }
        return iter;

    }

    static Object castDataType(Object x, Encoder encoder )
    {
        if (encoder==null)
            return x;
        String cls=encoder.clsTag().toString();
        switch (cls)
        {
            case "java.lang.Integer":
                return ScriptUtils.convert(x,Integer.class);
            case "java.lang.Float":
                return ScriptUtils.convert(x,Float.class);
            case "java.lang.Double":
                return ScriptUtils.convert(x,Double.class);
            case "java.lang.String":
                return ScriptUtils.convert(x,String.class);
            case "java.lang.Long":
                return ScriptUtils.convert(x,Long.class);
            case "java.lang.Boolean":
                return ScriptUtils.convert(x,Boolean.class);
        }

        return x;

    }

}

