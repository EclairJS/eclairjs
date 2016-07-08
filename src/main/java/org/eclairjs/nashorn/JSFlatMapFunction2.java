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

import javax.script.Invocable;
import javax.script.ScriptEngine;

import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.FlatMapFunction2;
import jdk.nashorn.api.scripting.ScriptObjectMirror;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class JSFlatMapFunction2  extends JSBaseFunction implements FlatMapFunction2 {
    public JSFlatMapFunction2(String func,  Object[] o) {
            super(func,o);
    }

    @SuppressWarnings("unchecked")
	@Override
    public Iterable call(Object o, Object o2) throws Exception {
        Object params[] = {o, o2};

        Object ret = callScript(params);
        if (ret.getClass().isArray()) {
            String type = ret.getClass().getTypeName();
            if (type.equals("double[]")) {
                double [] z = (double []) ret;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(z[i]);
                }
                ret = x;
            } else if (type.equals("int[]")) {
                int [] z = (int []) ret;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(z[i]);
                }
                ret = x;
            } else {
                Object [] z = (Object []) ret;
                ArrayList x = new ArrayList();
                for (int i = 0; i < z.length; i++) {
                    x.add(z[i]);
                }
                ret = x;
            }

        }
        return (Iterable)ret;
    }
}
