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

import java.util.Date;
import java.text.SimpleDateFormat;

public class SqlTimestamp extends WrappedClass {
    private java.sql.Timestamp timestamp = null;
    static public String getModuleName() {return "sql.SqlTimestamp";}

    public SqlTimestamp(int ms) {

        timestamp = new java.sql.Timestamp(ms);
    }
    public SqlTimestamp(String ts) throws java.text.ParseException {
       // DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date d = df.parse(ts);
            timestamp = new java.sql.Timestamp(d.getTime());
        } catch (java.text.ParseException e) {
            throw e;
        }

    }
    public SqlTimestamp(java.sql.Timestamp ts) {

        timestamp = ts;
    }

    public Object getJavaObject() {
        return timestamp;
    }


    @Override
    public String toJSON() {
        return timestamp.toString() ;
    }

    @Override
    public String toString() {

        return timestamp.toString() ;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public String getClassName() {return "sql.SqlTimestamp";}


    WrappedFunction F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toJSON() ;
        }
    };

    WrappedFunction  F_toString = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toString();
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

    WrappedFunction F_after = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.after((Date) Utils.jsToJava(args[0]));
        }
    };

    WrappedFunction F_before = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.before((Date)Utils.jsToJava(args[0]));
        }
    };

    WrappedFunction F_compareTo = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.compareTo((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };

    WrappedFunction F_equals = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.equals((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };

    WrappedFunction F_getNanos = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.getNanos();
        }
    };

    WrappedFunction F_getTime = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.getTime();
        }
    };

    WrappedFunction F_hashCode = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            return timestamp.hashCode();
        }
    };

    WrappedFunction F_setNanos = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            timestamp.setNanos((int) args[0]);
            return null;
        }
    };

    WrappedFunction F_setTime = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            timestamp.setTime((int) args[0]);
            return null;
        }
    };

 /*   SqlTimestamp.prototype.setTime = function (n) {
        return this.getJavaObject().setTime(n);
    };*/

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
            case "toString": return F_toString;
            case "getJavaObject": return F_getJavaObject;
            case "after": return F_after;
            case "before": return F_before;
            case "compareTo": return F_compareTo;
            case "equals": return F_equals;
            case "getNanos": return F_getNanos;
            case "getTime": return F_getTime;
            case "hashCode": return F_hashCode;
            case "setNanos": return F_setNanos;
            case "setTime": return F_setTime;

        }
        throw new RuntimeException("SqlTimestamp."+name+" is not defined");
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "valueOf":
            case "toJSON":
            case "toString":
            case "getJavaObject":
            case "after":
            case "before":
            case "compareTo":
            case "equals":
            case "getNanos":
            case "getTime":
            case "hashCode":
            case "setNanos":
            case "setTime":

                return true;
        }
        return super.hasMember(name);
    }

}

