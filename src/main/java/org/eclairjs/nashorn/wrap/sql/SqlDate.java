package org.eclairjs.nashorn.wrap.sql;
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

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SqlDate extends WrappedClass {
    static WrappedFunction F_after = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            return date.after((Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_before = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            return date.before((Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_clone = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            return new SqlDate((java.sql.Date) date.clone());
        }
    };
    static WrappedFunction F_compareTo = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            return date.compareTo((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_equals = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            return date.equals((java.sql.Date) Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_setTime = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            java.sql.Date date = (java.sql.Date) ((SqlDate) thiz).getJavaObject();
            date.setTime((long) args[0]);
            return null;
        }
    };
    private java.sql.Date date = null;

    public SqlDate(int ms) {

        date = new java.sql.Date(ms);
    }

    public SqlDate(String ts) throws java.text.ParseException {
        // DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date d = df.parse(ts);
            date = new java.sql.Date(d.getTime());
        } catch (java.text.ParseException e) {
            throw e;
        }

    }

    public SqlDate(java.sql.Date d) {

        date = d;
    }

    static public String getModuleName() {
        return "sql.SqlDate";
    }

    public boolean checkInstance(Object other) {
        return other instanceof SqlDate;
    }

    public Object getJavaObject() {
        return date;
    }

    @Override
    public String toString() {

        return date.toString();
    }

    public String getClassName() {
        return "SqlDate";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "after":
                return F_after;
            case "before":
                return F_before;
            case "clone":
                return F_clone;
            case "compareTo":
                return F_compareTo;
            case "equals":
                return F_equals;
            case "setTime":
                return F_setTime;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "after":
            case "before":
            case "clone":
            case "compareTo":
            case "equals":
            case "setTime":

                return true;
        }
        return super.hasMember(name);
    }

}

