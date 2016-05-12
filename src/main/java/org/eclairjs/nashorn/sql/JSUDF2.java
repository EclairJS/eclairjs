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

import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.sql.api.java.UDF2;
import org.eclairjs.nashorn.NashornEngineSingleton;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSUDF2 extends JSUDF implements UDF2 {
    private String func = null;
    private Object args[] = null;

    public JSUDF2(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o, Object o2) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        Invocable invocable = (Invocable) e;

        Object params[] = {this.func, o, o2};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        Object ret = invocable.invokeFunction("Utils_invoke", params);
        ret = this.castValueToReturnType(ret);
        return ret;
    }


}
