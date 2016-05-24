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

import javax.script.Invocable;
import javax.script.ScriptEngine;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.Function;

public class JSFunction implements Function {
    private String func = null;
    private Object args[] = null;
    private Object fn = null;

    public JSFunction(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        if (this.fn == null) {
            this.fn = e.eval(func);
        }
        Invocable invocable = (Invocable) e;

        Object params[] = {this.fn, o};
        
        if (this.args != null && this.args.length > 0 ) {
        	params = ArrayUtils.addAll(params, this.args);
        }
      
        Object ret = invocable.invokeFunction("Utils_invoke", params);

        return ret;
    }
}

