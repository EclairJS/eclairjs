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

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.api.scripting.ScriptUtils;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;

import java.util.Date;
import java.text.SimpleDateFormat;

public class SqlTimestamp extends WrappedClass {
    static WrappedFunction F_after = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.after((Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_before = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.before((Date)Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_compareTo = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.compareTo((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_equals = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.equals((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_getNanos = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.getNanos();
        }
    };
    static WrappedFunction F_getTime = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.getTime();
        }
    };
    static  WrappedFunction F_hashCode = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            return timestamp.hashCode();
        }
    };
    static WrappedFunction F_setNanos = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            timestamp.setNanos((int) args[0]);
            return null;
        }
    };
    static  WrappedFunction F_setTime = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Timestamp timestamp = (java.sql.Timestamp) ((SqlTimestamp)thiz).getJavaObject();
            timestamp.setTime((int) args[0]);
            return null;
        }
    };
    private java.sql.Timestamp timestamp = null;

    public SqlTimestamp(Object date) {
        ScriptObjectMirror jsDate = (ScriptObjectMirror) date;
        Double x =  (Double) jsDate.callMember("getTime");
        timestamp = new java.sql.Timestamp(x.longValue());
    }

    public SqlTimestamp(long ms) {

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

    static public String getModuleName() {return "sql.SqlTimestamp";}

    public  boolean checkInstance(Object other){ return other instanceof SqlTimestamp;}

    public String getClassName() {return "SqlTimestamp";}

    public Object getJavaObject() {
        return timestamp;
    }

    @Override
    public String toJSON() {
        return "\""+timestamp.toString()+"\"" ;
    }

    @Override
    public String toString() {

        return timestamp.toString() ;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
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
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
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

