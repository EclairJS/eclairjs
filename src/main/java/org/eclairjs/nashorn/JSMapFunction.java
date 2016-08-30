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

import org.apache.spark.sql.Encoder;

public class JSMapFunction extends JSBaseFunction implements org.apache.spark.api.java.function.MapFunction {


    private Encoder encoder;

    public JSMapFunction(String func, Encoder encoder, Object[] o) {
        super(func,o);
        this.encoder=encoder;
    }

    public JSMapFunction(String func,  Object[] o) {
        super(func,o);
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o) throws Exception {
        Object params[] = { o};
        Object ret = callScript( params);

        return castDataType(ret,encoder);

    }
}
