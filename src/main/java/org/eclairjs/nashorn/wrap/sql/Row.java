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
import org.eclairjs.nashorn.NashornEngineSingleton;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;

import javax.script.Invocable;

public class Row extends WrappedClass {
    static WrappedFunction F_get = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            Object o = sparkRow.get(Utils.toInt(args[0]));
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };
    static WrappedFunction F_getString = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.getString(Utils.toInt(args[0]));
        }
    };
    static WrappedFunction F_getBinary = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            byte[] x = (byte[])sparkRow.get(Utils.toInt(args[0]));
            return Utils.toJsArray(x);
        }
    };
    static WrappedFunction F_getBoolean = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.getBoolean(Utils.toInt(args[0]));
        }
    };
    static WrappedFunction F_getDate = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            Object o = sparkRow.getDate(Utils.toInt(args[0]));
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };
    static WrappedFunction F_getDouble = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.getDouble(Utils.toInt(args[0]));
        }
    };
    static WrappedFunction F_getFloat = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            //return sparkRow.getFloat(index);
            return sparkRow.getDouble(Utils.toInt(args[0])); // a Java Double = JavaScript Float
        }
    };
    static WrappedFunction F_getInt = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.getInt(Utils.toInt(args[0]));
        }
    };
    static WrappedFunction F_length = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.length();
        }
    };

    static WrappedFunction F_getTimestamp = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            Object o = sparkRow.getTimestamp(Utils.toInt(args[0]));
            return Utils.javaToJs(o, NashornEngineSingleton.getEngine());
        }
    };
    static WrappedFunction F_schema = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Row) thiz).schema();
        }
    };

    static WrappedFunction F_mkString = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {

            String separator = "";
            String start = "";
            String end = "";

            if ((args.length > 0) && !(args[0] instanceof jdk.nashorn.internal.runtime.Undefined)) {
                separator = (String) args[0];
            }
            if (
                    (args.length > 2) &&
                            !(args[1] instanceof jdk.nashorn.internal.runtime.Undefined) &&
                            !(args[2] instanceof jdk.nashorn.internal.runtime.Undefined)
                    ) {
                start = (String) args[1];
                end = (String) args[2];
            }
            return ((Row) thiz).mkstring(separator, start, end);

        }
    };
    static WrappedFunction F_anyNull = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.anyNull();
        }
    };
    static WrappedFunction F_copy = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return new Row(sparkRow.copy());
        }
    };
    static WrappedFunction F_equals = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.equals(Utils.jsToJava(args[0]));
        }
    };
    static WrappedFunction F_fieldIndex = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.fieldIndex((String) args[0]);
        }
    };
    static WrappedFunction F_getList = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return Utils.createJavaScriptObject(sparkRow.getList(Utils.toInt(args[0])));
        }
    };
    static WrappedFunction F_getStruct = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return Utils.createJavaScriptObject(sparkRow.getStruct(Utils.toInt(args[0])));
        }
    };
    static WrappedFunction F_hashCode = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.hashCode();
        }
    };
    static WrappedFunction F_isNullAt = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            org.apache.spark.sql.Row sparkRow = (org.apache.spark.sql.Row) ((Row) thiz).getJavaObject();
            return sparkRow.isNullAt(Utils.toInt(args[0]));
        }
    };
    private org.apache.spark.sql.Row sparkRow = null;

    public Row(org.apache.spark.sql.Row r) {
        sparkRow = r;
    }

    static public String getModuleName() {
        return "sql.Row";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Row;
    }

    public String getClassName() {
        return "sql.Row";
    }

    public Object getJavaObject() {
        return sparkRow;
    }

    @Override
    public String toJSON() {
        String jsonObj = "{\"values\":[";
        for (int i = 0; i < sparkRow.length(); i++) {
            Object x = sparkRow.get(i);
            if (x == null) {
                jsonObj += "null";
            } else if (x instanceof Double) {
                jsonObj += Utils.formatDouble((Double) x);
            } else if (x instanceof String || x instanceof java.sql.Timestamp || x instanceof java.sql.Date) {
                if (x instanceof String ) {
                    x = ((String) x).replace("\"", "\\\""); // replace any " in the string with /"
                }
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
            /*
            we need to wrap the object so we can get the JSON string of it
            FIXME this can be removed when all Spark objects are converted to Java Wrapped, or replaced with o.toJSON
             */
                Object wrappedObj = Utils.createJavaScriptObject(x);
                String jsonStr = Utils.JsonStringify(wrappedObj);
                jsonObj += jsonStr; // x;
            }
            if (i < sparkRow.length() - 1) {
                jsonObj += ",";
            }
        }
        jsonObj += "]";
        /*
        Currently schema returns a StuctType that is a JavaScript object that wrappers the JavaSpark object,
        If that changes to a Java object in the future this code will need to change.
         */
        ScriptObjectMirror schema = (ScriptObjectMirror) schema();
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

    public Object schema() {
        Object o = sparkRow.schema();
        Object structType = Utils.createJavaScriptObject(o);
        return structType;
    }

    public String mkstring(String separator, String start, String end) {
        String str = "";
        for (int i = 0; i < sparkRow.length(); i++) {
            Object v = sparkRow.get(i);
            if (i == 0) {
                str = start;
            }
            if (v instanceof Double && !Double.isNaN((Double) v)) {
                str += Utils.formatDouble((Double) v);
            } else if (v != null) {
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

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "get":
            case "apply":
                return F_get;
            case "getString":
                return F_getString;
            case "getBinary":
                return F_getBinary;
            case "getBoolean":
                return F_getBoolean;
            case "getDate":
                return F_getDate;
            case "getDouble":
                return F_getDouble;
            case "getFloat":
                return F_getFloat;
            case "getInt":
                return F_getInt;
            case "getTimestamp":
                return F_getTimestamp;
            case "getList":
            case "getArray":
                return F_getList;
            case "getStruct":
                return F_getStruct;
            case "mkString":
                return F_mkString;
            case "schema":
                return F_schema;
            case "length":
                return F_length;
            case "size":
                return F_length;
            case "anyNull":
                return F_anyNull;
            case "copy":
                return F_copy;
            case "equals":
                return F_equals;
            case "fieldIndex":
                return F_fieldIndex;
            case "hashCode":
                return F_hashCode;
            case "isNullAt":
                return F_isNullAt;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "get":
            case "apply":
            case "getString":
            case "getBinary":
            case "getBoolean":
            case "getDate":
            case "getDouble":
            case "getFloat":
            case "getInt":
            case "getTimestamp":
            case "getList":
            case "getArray":
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

