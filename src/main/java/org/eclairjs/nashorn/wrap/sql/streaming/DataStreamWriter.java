package org.eclairjs.nashorn.wrap.sql.streaming;
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

import org.apache.spark.sql.streaming.OutputMode;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class DataStreamWriter extends WrappedClass {

 static Logger logger = Logger.getLogger(DataStreamWriter.class);

    static WrappedFunction F_outputMode = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("outputMode");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            String outputMode = (String) args[0];
            returnValue = _dataStreamWriter.outputMode(outputMode);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_trigger = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("trigger");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            org.apache.spark.sql.streaming.Trigger trigger = (org.apache.spark.sql.streaming.Trigger) Utils.toObject(args[0]);
            returnValue = _dataStreamWriter.trigger(trigger);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_queryName = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("queryName");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            String queryName = (String) args[0];
            returnValue = _dataStreamWriter.queryName(queryName);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_format = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("format");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            String source = (String) args[0];
            returnValue = _dataStreamWriter.format(source);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_partitionBy = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("partitionBy");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            String colNames = (String) args[0]; // TODO: handle repeated parm 'colNames'
            returnValue = _dataStreamWriter.partitionBy(colNames);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_option = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("option");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            String key = (String) args[0];
            double value =  Utils.toDouble(args[1]);
            returnValue = _dataStreamWriter.option(key,value);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_options = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("options");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            java.util.Map options = (java.util.Map) Utils.toObject(args[0]);
            returnValue = _dataStreamWriter.options(options);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };

    static WrappedFunction F_start = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("start");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            
            if (args.length==0) {
              returnValue = _dataStreamWriter.start();
            
            } else {
            String path = (String) args[0];
              returnValue = _dataStreamWriter.start(path);
            
            }
            return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.streaming.StreamingQuery((org.apache.spark.sql.streaming.StreamingQuery)returnValue);
        }
    };

    static WrappedFunction F_foreach = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("foreach");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter = (org.apache.spark.sql.streaming.DataStreamWriter) ((DataStreamWriter) thiz).getJavaObject();
            org.apache.spark.sql.ForeachWriter writer = (org.apache.spark.sql.ForeachWriter) Utils.toObject(args[0]);
            returnValue = _dataStreamWriter.foreach(writer);
            return Utils.javaToJs(returnValue);
           // return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter((org.apache.spark.sql.streaming.DataStreamWriter)returnValue);
        }
    };


    private org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter;

    public DataStreamWriter(org.apache.spark.sql.streaming.DataStreamWriter _dataStreamWriter)
    {
       logger.debug("constructor");
       this._dataStreamWriter = _dataStreamWriter;
    }

    static public String getModuleName() {
        return "sql.streaming.DataStreamWriter";
    }

    public boolean checkInstance(Object other) {
        return other instanceof DataStreamWriter;
    }

    public Object getJavaObject() {
        return _dataStreamWriter;
    }

    @Override
    public String toString() {

        return _dataStreamWriter.toString();
    }

    public String getClassName() {
        return "DataStreamWriter";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "outputMode":
                return F_outputMode;
            case "trigger":
                return F_trigger;
            case "queryName":
                return F_queryName;
            case "format":
                return F_format;
            case "partitionBy":
                return F_partitionBy;
            case "option":
                return F_option;
            case "options":
                return F_options;
            case "start":
                return F_start;
            case "foreach":
                return F_foreach;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "outputMode":
            case "trigger":
            case "queryName":
            case "format":
            case "partitionBy":
            case "option":
            case "options":
            case "start":
            case "foreach":
                return true;
        }
        return super.hasMember(name);
    }

}
