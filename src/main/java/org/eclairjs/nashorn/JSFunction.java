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

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.Function;

public class JSFunction extends JSBaseFunction implements Function {

    public JSFunction(String func, Object[] o) {
        super(func,o);
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o) throws Exception {

        Object [] params={o};
        Object ret = callScript(params);
        ret = Utils.jsToJava(ret);

        return ret;
    }
}

