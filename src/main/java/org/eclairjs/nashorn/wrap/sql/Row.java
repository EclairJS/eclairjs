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
import org.apache.spark.sql.types.StructType;
import org.eclairjs.nashorn.NashornEngineSingleton;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;

import javax.script.Invocable;
import java.text.DecimalFormat;

public class Row extends WrappedClass {
    private org.apache.spark.sql.Row sparkRow = null;
    static public String getModuleName() {return "sql.Row";}
    public Row(org.apache.spark.sql.Row r) {
        sparkRow = r;
    }

    public Object getJavaObject() {
        return sparkRow;
    }


    @Override
    public String toJSON() {
        String jsonObj = "{\"values\":[";
        for (int i = 0; i < sparkRow.length(); i++) {
            Object x = sparkRow.get(i);
            if (x instanceof Double) {
                jsonObj += Utils.formatDouble((Double) x);
            } else if (x instanceof String || x instanceof java.sql.Timestamp || x instanceof java.sql.Date) {
                jsonObj += "\"" + x + "\"";
            } else if (x instanceof scala.collection.mutable.WrappedArray) {
                try {
                    Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
                    Object arr = invocable.invokeFunction("createJavaScriptSparkObject", x);
                    String str = (String) invocable.invokeFunction("objectToJsonString", arr);
                    jsonObj += str;
                } catch (java.lang.Exception e) {
                    e.printStackTrace();
                }
            } else {
                jsonObj += x;
            }
            if (i < sparkRow.length() -1) {
                jsonObj += ",";
            }
        }
        jsonObj += "]";
        /*
        Currently schema returns a StuctType that is a JavaScript object that wrappers the JavaSpark object,
        If that changes to a Java object in the future this code will need to change.
         */
        ScriptObjectMirror schema = schema();
        if (schema != null) {
            Object j = schema.callMember("toJSON");
            String schemaJson = "";
            try {
                Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
                schemaJson = (String) invocable.invokeFunction("objectToJsonString", j);
            } catch (java.lang.Exception e) {
                e.printStackTrace();
            }
            jsonObj += ",\"schema\":" + schemaJson;
        }
        return jsonObj + "}";
    }

    @Override
    public String toString() {
        return mkstring(",", "[", "]");
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public String getClassName() {return "sql.Row";}

    public ScriptObjectMirror schema() {
        Object o = sparkRow.schema();
        ScriptObjectMirror structType = Utils.createJavaScriptObject(o);
        return structType;
    }

    public String mkstring(String separator, String start, String end) {
        String str = "";
        for (int i = 0; i < sparkRow.length(); i++) {
            Object v = sparkRow.get(i);
            if (i == 0) {
                str = start;
            }
            if (v instanceof Double && !Double.isNaN((Double)v)) {
                str += Utils.formatDouble((Double) v);
            } else if (v != null){
                str += v;
            }
            if (i < sparkRow.length() - 1) {
                str += separator;
            }
            if (i == sparkRow.length() - 1) {
                str += end;
            }
        }

        return str;
    }

    WrappedFunction F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toJSON() ;
        }
    };

    WrappedFunction  F_toString = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return mkstring(",", "[", "]");
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

    WrappedFunction F_get = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            Object o = sparkRow.get((int)args[0]);
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };

    WrappedFunction F_getString = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            return sparkRow.getString(index);
        }
    };

    WrappedFunction F_getBoolean = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            return sparkRow.getBoolean(index);
        }
    };

    WrappedFunction F_getDate = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            Object o = sparkRow.getDate(index);
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };

    WrappedFunction F_getDouble = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            return sparkRow.getDouble(index);
        }
    };

    WrappedFunction F_getFloat = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            //return sparkRow.getFloat(index);
            return sparkRow.getDouble(index); // a Java Double = JavaScript Float
        }
    };

    WrappedFunction F_getInt = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            return sparkRow.getInt(index);
        }
    };

    WrappedFunction F_length = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.length();
        }
    };

    WrappedFunction F_getTimestamp = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int index = (int) args[0];
            Object o = sparkRow.getTimestamp(index);
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };

    WrappedFunction F_schema = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
           return schema();
        }
    };

    WrappedFunction F_mkString = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {

            String separator = "";
            String start = "";
            String end = "";

            if ( (args.length > 0) && !(args[0] instanceof jdk.nashorn.internal.runtime.Undefined)) {
                separator = (String) args[0];
            }
            if (
                    (args.length > 2) &&
                    !(args[1] instanceof jdk.nashorn.internal.runtime.Undefined) &&
                    !(args[2] instanceof jdk.nashorn.internal.runtime.Undefined)
            ) {
                start =  (String) args[1];
                end = (String) args[2];
            }
            return mkstring(separator, start, end);

        }
    };

    WrappedFunction F_anyNull = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.anyNull();
        }
    };

    WrappedFunction F_copy = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return new Row(sparkRow.copy());
        }
    };

    WrappedFunction F_equals = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.equals(Utils.jsToJava(args[0]));
        }
    };

    WrappedFunction F_fieldIndex = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.fieldIndex((String)args[0]);
        }
    };

    WrappedFunction F_getList = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return Utils.createJavaScriptObject(sparkRow.getList((int)args[0]));
        }
    };

    WrappedFunction F_getStruct = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return Utils.createJavaScriptObject(sparkRow.getStruct((int)args[0]));
        }
    };

    WrappedFunction F_hashCode = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.hashCode();
        }
    };

    WrappedFunction F_isNullAt = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return sparkRow.isNullAt((int) args[0]);
        }
    };

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
            case "toString": return F_toString;
            case "getJavaObject": return F_getJavaObject;
            case "get": return F_get;
            case "getString": return F_getString;
            case "getBoolean": return F_getBoolean;
            case "getDate": return F_getDate;
            case "getDouble": return F_getDouble;
            case "getFloat": return F_getFloat;
            case "getInt": return F_getInt;
            case "getTimestamp": return F_getTimestamp;
            case "getList": return F_getList;
            case "getStruct": return F_getStruct;
            case "mkString": return F_mkString;
            case "schema": return F_schema;
            case "length": return F_length;
            case "size": return F_length;
            case "anyNull": return F_anyNull;
            case "copy": return F_copy;
            case "equals": return F_equals;
            case "fieldIndex": return F_fieldIndex;
            case "hashCode": return F_hashCode;
            case "isNullAt": return F_anyNull;
        }
        throw new RuntimeException("Row."+name+" is not defined");
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "valueOf":
            case "toJSON":
            case "toString":
            case "getJavaObject":
            case "get":
            case "getString":
            case "getBoolean":
            case "getDate":
            case "getDouble":
            case "getFloat":
            case "getInt":
            case "getTimestamp":
            case "getList":
            case "getStruct":
            case "mkString":
            case "schema":
            case "length":
            case "size":
            case "anyNull":
            case "copy":
            case "equals":
            case "fieldIndex":
            case "hashCode":
            case "isNullAt":
                return true;
        }
        return super.hasMember(name);
    }

}

