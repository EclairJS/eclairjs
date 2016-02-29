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

import org.apache.commons.lang.ArrayUtils;

import java.util.ArrayList;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSComparator implements java.util.Comparator, java.io.Serializable {

    private String func = null;
    private Object args[] = null;
    private String functionName = null;

    public JSComparator(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public int compare(Object o, Object o2) {
        int ret = -1;

        try {
            /*
            e.eval(this.func);
            Invocable invocable = (Invocable) e;
            Object arg0 = Utils.javaToJs(o, e);
            Object arg1 = Utils.javaToJs(o2, e);
            Object params[] = {arg0, arg1};
        
            if (this.args.length > 0 ) {
        	    @SuppressWarnings("rawtypes")
			    List sv = new ArrayList();
        	    for (int i = 0; i < this.args.length; i++) {
        		    sv.add(Utils.javaToJs(this.args[i], e));
        	    }
        	    params = ArrayUtils.addAll(params, sv.toArray());
            }
 
            ret = Integer.valueOf(invocable.invokeFunction(this.functionName, params).toString());
            */
            ScriptEngine e =  NashornEngineSingleton.getEngine();
            Invocable invocable = (Invocable) e;

            Object params[] = {this.func, o, o2};

            if (this.args != null && this.args.length > 0 ) {
                params = ArrayUtils.addAll(params, this.args);
            }

            ret = Integer.valueOf(invocable.invokeFunction("Utils_invoke", params).toString());
            //return Utils.jsToJava(ret);
            return ret;
        } catch(Exception exc) {
            exc.printStackTrace();
        }

        return ret;
    }


    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public boolean equals(Object o) {
        boolean ret = false;

        try {
            /*
            e.eval(this.func);
            Invocable invocable = (Invocable) e;
            Object arg0 = Utils.javaToJs(o, e);
            Object params[] = {arg0};

            if (this.args.length > 0 ) {
                @SuppressWarnings("rawtypes")
                List sv = new ArrayList();
                for (int i = 0; i < this.args.length; i++) {
                    sv.add(Utils.javaToJs(this.args[i], e));
                 }
                params = ArrayUtils.addAll(params, sv.toArray());
            }

            ret = Boolean.valueOf(invocable.invokeFunction(this.functionName, params).toString());
            */

            ScriptEngine e =  NashornEngineSingleton.getEngine();
            Invocable invocable = (Invocable) e;

            Object params[] = {this.func, o};

            if (this.args != null && this.args.length > 0 ) {
                params = ArrayUtils.addAll(params, this.args);
            }

            ret = Boolean.valueOf(invocable.invokeFunction(this.functionName, params).toString());
        } catch(Exception exc) {
            // do nothing for now
        }

        return ret;
    }

}
