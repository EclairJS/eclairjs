package org.eclairjs.nashorn.sql;
/*
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

import org.apache.spark.sql.ForeachWriter;
import org.eclairjs.nashorn.JSFunction;
import org.eclairjs.nashorn.JSFunction2;
import org.eclairjs.nashorn.Utils;

public class JSForeachWriter extends ForeachWriter {
    private JSFunction2 openFn;
    private JSFunction2 processFn;
    private JSFunction closeFn;
    private Object connectionObject;

    public  JSForeachWriter(Object oFn, Object pFn, Object cFn, Object openBindArgs, Object processBindArgs, Object closeBindArgs) {
        this.openFn = (JSFunction2) Utils.createLambdaFunction(oFn, "org.eclairjs.nashorn.JSFunction2", openBindArgs);
        this.processFn = (JSFunction2) Utils.createLambdaFunction(pFn, "org.eclairjs.nashorn.JSFunction2", processBindArgs);
        this.closeFn = (JSFunction) Utils.createLambdaFunction(cFn, "org.eclairjs.nashorn.JSFunction", closeBindArgs);


    }

    @Override
    public boolean open(long partitionId, long version) {
        // open connection
        //System.out.println("java open");
        try {
            this.connectionObject = this.openFn.call(partitionId, version);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public void process(Object value) {
        // write string to connection
        //System.out.println("process1: " + value);
        try {
            this.processFn.call(this.connectionObject, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close(Throwable errorOrNull) {
        // close the connection
        //System.out.println("java close");
        try {
            this.closeFn.call(this.connectionObject);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
