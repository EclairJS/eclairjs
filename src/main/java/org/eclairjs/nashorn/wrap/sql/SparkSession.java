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

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.api.scripting.ScriptUtils;
import org.apache.spark.sql.*;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.RowFactory;
import org.apache.spark.sql.types.*;
import org.apache.spark.api.java.function.Function;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;

import javax.xml.datatype.DatatypeConfigurationException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import scala.Tuple2;

public class SparkSession extends WrappedClass {

 static Logger logger = Logger.getLogger(SparkSession.class);

    static WrappedFunction F_version = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("version");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.version();
            return returnValue;
        }
    };

    static WrappedFunction F_sparkContext = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("version");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.sparkContext();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sqlContext = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("version");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.sqlContext();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_udf = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("udf");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.udf();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_streams = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("streams");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.streams();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_newSession = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("newSession");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.newSession();
            return new SparkSession((org.apache.spark.sql.SparkSession)returnValue);
        }
    };

//    static WrappedFunction F_emptyDataset = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("emptyDataset");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            returnValue = _sparkSession.emptyDataset();
//             return Utils.javaToJs(returnValue);
//        }
//    };

//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            org.apache.spark.rdd.RDD rdd = (org.apache.spark.rdd.RDD) Utils.toObject(args[0]);
//            returnValue = _sparkSession.createDataFrame(rdd);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            Seq data = (Seq) args[0];
//            returnValue = _sparkSession.createDataFrame(data);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            org.apache.spark.rdd.RDD rowRDD = (org.apache.spark.rdd.RDD) Utils.toObject(args[0]);
//            org.apache.spark.sql.types.StructType schema = (org.apache.spark.sql.types.StructType) Utils.toObject(args[1]);
//            returnValue = _sparkSession.createDataFrame(rowRDD,schema);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            org.apache.spark.api.java.JavaRDD rowRDD = (org.apache.spark.api.java.JavaRDD) Utils.toObject(args[0]);
//            org.apache.spark.sql.types.StructType schema = (org.apache.spark.sql.types.StructType) Utils.toObject(args[1]);
//            returnValue = _sparkSession.createDataFrame(rowRDD,schema);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            java.util.List rows = (java.util.List) args[0];
//            org.apache.spark.sql.types.StructType schema = (org.apache.spark.sql.types.StructType) Utils.toObject(args[1]);
//            returnValue = _sparkSession.createDataFrame(rows,schema);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            org.apache.spark.rdd.RDD rdd = (org.apache.spark.rdd.RDD) Utils.toObject(args[0]);
//            Class beanClass = (Class) Utils.toObject(args[1]);
//            returnValue = _sparkSession.createDataFrame(rdd,beanClass);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_createDataFrame = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataFrame");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            org.apache.spark.api.java.JavaRDD rdd = (org.apache.spark.api.java.JavaRDD) Utils.toObject(args[0]);
//            Class beanClass = (Class) Utils.toObject(args[1]);
//            returnValue = _sparkSession.createDataFrame(rdd, beanClass);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };


    static class RowMapFunction implements Function< org.apache.spark.sql.Row,  org.apache.spark.sql.Row>
    {
        org.apache.spark.sql.types.StructType schema;
        RowMapFunction(org.apache.spark.sql.types.StructType schema)
        {
            this.schema=schema;
        }
        @Override
        public org.apache.spark.sql.Row call(org.apache.spark.sql.Row row) throws Exception {
            ArrayList a = new ArrayList();
            StructField[] fields = this.schema.fields();
            for (int i = 0; i < row.length(); i++) {
                Object f = row.get(i);
                DataType dt = fields[i].dataType();
            /*
             Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed
             So we need to force the "Number" from Nashorn to the correct type based on the schema.
             JavaScript parseInt returns a java.lang.Double and that seems to be the only java type we will need to convert.
             */
                if ((f instanceof Double) && (dt instanceof IntegerType)) {
                    f = ((Double) f).intValue();
                } else if ((f instanceof Double) && (dt instanceof FloatType)) {
                    f = ((Double) f).floatValue();
                } else if ((f instanceof Integer) && (dt instanceof DoubleType)) {
                    f = ((Integer) f).doubleValue();
                } else if ((f instanceof Integer) && (dt instanceof FloatType)) {
                    f = ((Integer) f).floatValue();
                }
                a.add(f);
            }

            Row r =  RowFactory.create(a.toArray());

            return r;
        }

    }
    static WrappedFunction F_createDataFrame = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("createDataFrame");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();

             org.apache.spark.sql.types.StructType schema = (org.apache.spark.sql.types.StructType) Utils.toObject(args[1]);

            if (args[0] instanceof org.eclairjs.nashorn.wrap.RDD)
            {
                org.eclairjs.nashorn.wrap.RDD rddWrapper = (org.eclairjs.nashorn.wrap.RDD)args[0];
                org.apache.spark.api.java.JavaRDD rdd = ( org.apache.spark.api.java.JavaRDD)rddWrapper.getJavaObject();


                rdd = rdd.map(new RowMapFunction(schema));
                returnValue = _sparkSession.createDataFrame(rdd, schema);
            }
            else
            {
                org.apache.spark.sql.types.StructField[] fields=schema.fields();
                Object [] arr= Utils.toObjectArray(args[0]);
                List<org.apache.spark.sql.Row> rows= new ArrayList<>(arr.length);
                for (int i=0;i<arr.length;i++)
                {
                   if (arr[i] instanceof Object[])
                   {
                       Object [] row= (Object[])arr[i];
                       Object [] rowValues= new Object[row.length];
                        for (int col=0;col<row.length;col++)
                        {
                            org.apache.spark.sql.types.DataType datatype = fields[col].dataType();
                             rowValues[col]=castDataType(row[col], datatype);

                        }
                       rows.add(org.apache.spark.sql.RowFactory.create(rowValues));

                   }
                   else
                   {
                       Row row = (Row)arr[i];
                       Object [] rowValues= new Object[row.length()];
                       for (int col = 0; col < row.length(); col++) {
                           Object x = row.get(col);
                           org.apache.spark.sql.types.DataType datatype = fields[col].dataType();
                           rowValues[col]=castDataType(x, datatype);
                       }
                       rows.add(org.apache.spark.sql.RowFactory.create(rowValues));

                   }
                }
                returnValue = _sparkSession.createDataFrame(rows, schema);

            }


             return Utils.javaToJs(returnValue);
        }

    };

    static class JSONMapFunction implements Function< Object,  org.apache.spark.sql.Row>
    {
        List<Tuple2<String,DataType>> fieldsNames;
        JSONMapFunction(List<Tuple2<String,DataType>> fieldsNames)
        {
            this.fieldsNames=fieldsNames;
        }
        @Override
        public org.apache.spark.sql.Row call(Object obj) throws Exception {

            List<Object> values=new ArrayList<>();
//
//  code for it is an object, but that is probably not possible
//            ScriptObjectMirror json=ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) obj);
//
//            for (String name : fieldsNames)
//            {
//                Object value = null;
//                if (json.containsKey(name))
//                {
//                    value=json.get(name);
//                    //   if it is getter function, call to get value
//                    if (value instanceof ScriptObjectMirror)
//                    {
//                        value=((ScriptObjectMirror)value).call(json);
//                    }
//
//                }
//                else
//                {
//                    name="get" + name.substring(0,1).toUpperCase() + name.substring(1);
//                     value=json.get(name);
//                    //   if it is getter function, call to get value
//                    if (value instanceof ScriptObjectMirror)
//                    {
//                        value=((ScriptObjectMirror)value).call(json);
//                    }
//                }
//                values.add(value);
//            }

            org.json.simple.JSONObject json = ( org.json.simple.JSONObject)obj;
            for (Tuple2<String,DataType> tuple: fieldsNames)
            {
                Object value = null;
                String name=tuple._1();
                if (json.containsKey(name))
                {
                    value=json.get(name);
                    //   if it is getter function, call to get value
                    value = castDataType(value,tuple._2());

                }
                values.add(value);
            }



            return RowFactory.create(values.toArray());
        }

    }
    static WrappedFunction F_createDataFrameFromJson = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("createDataFrame");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();


            org.apache.spark.api.java.JavaRDD rdd = ( org.apache.spark.api.java.JavaRDD) Utils.toObject(args[0]);
            ScriptObjectMirror jsonSchema=ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) args[1]);

            List<Tuple2<String,DataType>> fieldNames=new ArrayList<>();
            List<StructField> fields=new ArrayList<>();
            for (Map.Entry<String, Object> entry : jsonSchema.entrySet()) {
                String type=entry.getValue().toString();

                String name=entry.getKey();
                DataType schemaType;
                switch (type) {
                    case "String":
                        schemaType=DataTypes.StringType; break;
                    case "Integer":
                        schemaType=DataTypes.IntegerType; break;
                    case "Boolean":
                        schemaType=DataTypes.BooleanType; break;
                    case "Double":
                        schemaType=DataTypes.DoubleType;
//                    case "Array":
//                        schemaType=DataTypes.ArrayType;
                    default:
                    {
                        schemaType=(DataType) Utils.toObject(type);
                    }

                }
                fields.add(DataTypes.createStructField(name, schemaType, true));
                fieldNames.add(new Tuple2<String, DataType>(name,schemaType));

            }
            StructType schema = DataTypes.createStructType(fields);
            rdd = rdd.map(new JSONMapFunction(fieldNames));
            returnValue = _sparkSession.createDataFrame(rdd, schema);

            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_baseRelationToDataFrame = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("baseRelationToDataFrame");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            org.apache.spark.sql.sources.BaseRelation baseRelation = (org.apache.spark.sql.sources.BaseRelation) Utils.toObject(args[0]);
            returnValue = _sparkSession.baseRelationToDataFrame(baseRelation);
             return Utils.javaToJs(returnValue);
        }
    };


    static WrappedFunction F_createDataset = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("createDataset");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            //java.util.List data =  Arrays.asList(Utils.jsToJava(args[0])); // does not work for int[]
            Object[] arr = (Object[])ScriptUtils.convert(args[0], Object[].class); // convert to generic array
            java.util.List data = new ArrayList();
            for (int i = 0; i < arr.length; i++) {
                data.add(Utils.jsToJava(arr[i]));
            }
            org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            returnValue = _sparkSession.createDataset(data, encoder);
            //return new org.eclairjs.nashorn.wrap.sql.Dataset((org.apache.spark.sql.Dataset)returnValue);
            return Utils.javaToJs(returnValue);
        }
    };
//
//    static WrappedFunction F_createDataset = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("createDataset");
//            Object returnValue = null;
//            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
//            Object obj= Utils.jsToJava(args[0]);
//
//            java.util.List data = (java.util.List) args[0];
//            returnValue = _sparkSession.createDataset(data);
//             return Utils.javaToJs(returnValue);
//        }
//    };

    static WrappedFunction F_range = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("range");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            switch (args.length)
            {
                case 1:
                {
                    long end =  Utils.toLong(args[0]);
                    returnValue = _sparkSession.range(end);
                    break;
                }
                case 2:
                {
                    long start =  Utils.toLong(args[0]);
                    long end =  Utils.toLong(args[1]);
                    returnValue = _sparkSession.range(start,end);
                    break;
                }
                case 3:
                {
                    long start =  Utils.toLong(args[0]);
                    long end =  Utils.toLong(args[1]);
                    long step =  Utils.toLong(args[2]);
                    returnValue = _sparkSession.range(start,end,step);
                    break;
                }
                case 4:
                {
                    long start =  Utils.toLong(args[0]);
                    long end =  Utils.toLong(args[1]);
                    long step =  Utils.toLong(args[2]);
                    int numPartitions = Utils.toInt(args[3]);
                    returnValue = _sparkSession.range(start,end,step,numPartitions);
                    break;
                }
                default:
                    throw new RuntimeException("too many arguments");
            }
             return Utils.javaToJs(returnValue);
        }
    };



    static WrappedFunction F_table = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("table");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            String tableName = (String) args[0];
            returnValue = _sparkSession.table(tableName);
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sql = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sql");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            String sqlText = (String) args[0];
            returnValue = _sparkSession.sql(sqlText);
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_read = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("read");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.read();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_readStream = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("readStream");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            returnValue = _sparkSession.readStream();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_stop = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("stop");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession _sparkSession = (org.apache.spark.sql.SparkSession) ((SparkSession) thiz).getJavaObject();
            _sparkSession.stop();
            return null;
        }
    };


    private org.apache.spark.sql.SparkSession _sparkSession;

    public SparkSession(org.apache.spark.sql.SparkSession _sparkSession)
    {
       logger.debug("constructor");
       this._sparkSession = _sparkSession;
    }

    static public String getModuleName() {
        return "sql.SparkSession";
    }

    public boolean checkInstance(Object other) {
        return other instanceof SparkSession;
    }

    public Object getJavaObject() {
        return _sparkSession;
    }

    @Override
    public String toString() {

        return _sparkSession.toString();
    }

    public String getClassName() {
        return "SparkSession";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "version":
                return F_version;
            case "sparkContext":
                return F_sparkContext;
            case "sqlContext":
                return F_sqlContext;
//            case "listenerManager":
//                return F_listenerManager;
//            case "experimental":
//                return F_experimental;
            case "udf":
                return F_udf;
            case "streams":
                return F_streams;
            case "newSession":
                return F_newSession;
//            case "emptyDataset":
//                return F_emptyDataset;
            case "createDataFrame":
                return F_createDataFrame;
            case "createDataFrameFromJson":
                return F_createDataFrameFromJson;
            case "baseRelationToDataFrame":
                return F_baseRelationToDataFrame;
            case "createDataset":
                return F_createDataset;
            case "range":
                return F_range;
            case "table":
                return F_table;
            case "sql":
                return F_sql;
            case "read":
                return F_read;
            case "readStream":
                return F_readStream;
            case "stop":
                return F_stop;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "version":
            case "sparkContext":
            case "sqlContext":
//            case "listenerManager":
//            case "experimental":
            case "udf":
            case "streams":
            case "newSession":
            case "emptyDataset":
            case "createDataFrame":
            case "createDataFrameFromJson":
            case "baseRelationToDataFrame":
            case "createDataset":
            case "range":
            case "table":
            case "sql":
            case "read":
            case "readStream":
            case "stop":
                return true;
        }
        return super.hasMember(name);
    }

//
// static methods
//
  public static Object builder( ) {
    logger.debug("builder");
//     return Utils.javaToJs(org.apache.spark.sql.SparkSession.builder());
    return new org.eclairjs.nashorn.wrap.sql.Builder((org.apache.spark.sql.SparkSession.Builder)org.apache.spark.sql.SparkSession.builder());

  }

  public static void setActiveSession( Object session) {
    logger.debug("setActiveSession");
org.apache.spark.sql.SparkSession session_uw = (org.apache.spark.sql.SparkSession) Utils.toObject(session);
    org.apache.spark.sql.SparkSession.setActiveSession(session_uw);

  }

  public static void clearActiveSession( ) {
    logger.debug("clearActiveSession");
    org.apache.spark.sql.SparkSession.clearActiveSession();

  }

  public static void setDefaultSession( Object session) {
    logger.debug("setDefaultSession");
org.apache.spark.sql.SparkSession session_uw = (org.apache.spark.sql.SparkSession) Utils.toObject(session);
    org.apache.spark.sql.SparkSession.setDefaultSession(session_uw);

  }

  public static void clearDefaultSession( ) {
    logger.debug("clearDefaultSession");
    org.apache.spark.sql.SparkSession.clearDefaultSession();

  }

    static Object castDataType(Object x, org.apache.spark.sql.types.DataType dt  )
    {
        if ((x instanceof java.lang.Integer) &&  (dt instanceof org.apache.spark.sql.types.DoubleType)) {
            return ((java.lang.Integer)x).doubleValue();
        } else if ((x instanceof java.lang.Integer) &&  (dt instanceof org.apache.spark.sql.types.FloatType)) {
            return ((java.lang.Integer)x).floatValue();
        } else if ((x instanceof java.lang.Long) &&  (dt instanceof org.apache.spark.sql.types.FloatType)) {
            return ((java.lang.Long)x).floatValue();
        } else if ((x instanceof java.lang.Double) &&  (dt instanceof org.apache.spark.sql.types.IntegerType)) {
            return ((java.lang.Double)x).intValue();
        } else if ((x instanceof java.lang.Long) &&  (dt instanceof org.apache.spark.sql.types.IntegerType)) {
            return ((java.lang.Long)x).intValue();
        } else if ((x instanceof java.lang.Double) &&  (dt instanceof org.apache.spark.sql.types.FloatType)) {
            return ((java.lang.Double)x).floatValue();
        } else if (dt instanceof org.apache.spark.sql.types.BinaryType) {
            return Utils.toByteArray(x);//).asInstanceOf[Array[Byte]]
        } else if (dt instanceof org.apache.spark.sql.types.ArrayType) {
            org.apache.spark.sql.types.DataType  elmDt = ((org.apache.spark.sql.types.ArrayType)dt).elementType();
            Object [] from=(Object[])x;
            Object [] elements=new Object[from.length];
            for (int j=0;j<from.length;j++)
            {
                elements[j]=castDataType(from[j], elmDt);
            }
            return Utils.jsToJava(elements);
        } else {
            return Utils.jsToJava(x);
        }

    }

}
