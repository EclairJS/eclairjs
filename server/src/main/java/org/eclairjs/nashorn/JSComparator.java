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
import scala.Tuple2;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSComparator implements java.util.Comparator, java.io.Serializable {

    private String func = null;
    private Object args[] = null;
    private String functionName = null;
    private Object fn = null;

    public JSComparator(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public int compare(Object o, Object o2) {
        int ret = -1;

        try {

            ScriptEngine e =  NashornEngineSingleton.getEngine();
           // if (this.fn == null) {
            /*
            if we try to save teh evaluated function for future use we get serialization exception,
            why Comparators are different than java.api.functions ?
             */
                Object fn = e.eval(func);
            //}
            Invocable invocable = (Invocable) e;

            Object params[] = {fn, o, o2};

            if (this.args != null && this.args.length > 0 ) {
                params = ArrayUtils.addAll(params, this.args);
            }
            //Tuple2<String, String> s = new Tuple2("foo", "bar");
            //scala.collection.Iterator<Object> i = s.productIterator();


            ret = Integer.valueOf(invocable.invokeFunction("Utils_invoke", params).toString());

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

            ScriptEngine e =  NashornEngineSingleton.getEngine();
            if (this.fn == null) {
                this.fn = e.eval(func);
            }
            Invocable invocable = (Invocable) e;

            Object params[] = {this.fn, o};

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
