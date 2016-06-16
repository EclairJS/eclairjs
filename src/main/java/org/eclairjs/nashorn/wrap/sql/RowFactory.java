package org.eclairjs.nashorn.wrap.sql;/*
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

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedClass;

import java.util.ArrayList;

public class RowFactory extends WrappedClass {

    static public Row create(Object[] values) {
        ArrayList al = new ArrayList();
        for (int i = 0; i < values.length; i++) {
            al.add(Utils.jsToJava(values[i]));
        }
        //System.out.print("RowFactory.create" + al);
        return new Row(org.apache.spark.sql.RowFactory.create(al.toArray()));
    }

    static public String getModuleName() {
        return "sql.RowFactory";
    }

    public Object getJavaObject() {
        return null;
    }

    public boolean checkInstance(Object other) {
        return other instanceof RowFactory;
    }

    @Override
    public String toJSON() {
        return null;
    }

    @Override
    public String toString() {
        return null;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public String getClassName() {
        return "RowFactory";
    }


    // get the value of that named property
    @Override
    public Object getMember(String name) {
        return super.getMember(name);

    }

    @Override
    public boolean hasMember(String name) {

        return super.hasMember(name);
    }

}

