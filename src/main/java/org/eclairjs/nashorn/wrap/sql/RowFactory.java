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
import org.eclairjs.nashorn.wrap.WrappedFunction;

import java.util.ArrayList;

public class RowFactory extends WrappedClass {

    public Object getJavaObject() {
        return null;
    }

    static public Row create(Object[] values) {
        ArrayList al = new ArrayList();
        for (int i = 0; i < values.length; i++) {
            al.add(Utils.jsToJava(values[i]));
        }
        //System.out.print("RowFactory.create" + al);
        return new Row(org.apache.spark.sql.RowFactory.create(al.toArray()));
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

    static public String getModuleName() {return "sql.RowFactory";}
    public String getClassName() {return "sql.RowFactory";}


    WrappedFunction F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toJSON() ;
        }
    };

    WrappedFunction  F_toString = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return this.toString();
        }
    };

    WrappedFunction  F_valueOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return valueOf();
        }
    };

    WrappedFunction F_getJavaObject = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return getJavaObject();
        }
    };


    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
            case "toString": return toString();
            case "getJavaObject": return F_getJavaObject;
        }
        throw new RuntimeException("RowFactory."+name+" is not defined");
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "valueOf":
            case "toJSON":
            case "toString":
            case "getJavaObject":
                return true;
        }
        return super.hasMember(name);
    }

}

