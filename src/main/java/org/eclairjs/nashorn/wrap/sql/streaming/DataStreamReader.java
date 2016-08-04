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

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class DataStreamReader extends WrappedClass {

 static Logger logger = Logger.getLogger(DataStreamReader.class);

    static WrappedFunction F_format = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("format");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String source = (String) args[0];
            returnValue = _dataStreamReader.format(source);
            return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamReader((org.apache.spark.sql.streaming.DataStreamReader)returnValue);
        }
    };

    static WrappedFunction F_schema = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("schema");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            org.apache.spark.sql.types.StructType schema = (org.apache.spark.sql.types.StructType) Utils.toObject(args[0]);
            returnValue = _dataStreamReader.schema(schema);
            return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamReader((org.apache.spark.sql.streaming.DataStreamReader)returnValue);
        }
    };

    static WrappedFunction F_option = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("option");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String key = (String) args[0];
            if (args[1] instanceof  String) {
                returnValue = _dataStreamReader.option(key,(String) args[1]);
            } else if (args[1] instanceof Double) {
                returnValue = _dataStreamReader.option(key,(Double) args[1]);
            } else if (args[1] instanceof Long) {
                returnValue = _dataStreamReader.option(key,(Long) args[1]);
            } else if (args[1] instanceof  Boolean) {
                returnValue = _dataStreamReader.option(key,(Boolean) args[1]);
            } else if (args[1] instanceof  Integer) {
                returnValue = _dataStreamReader.option(key,(Integer) args[1]);
            }

            return Utils.javaToJs(returnValue);
           // return new org.eclairjs.nashorn.wrap.sql.streaming.DataStreamReader((org.apache.spark.sql.streaming.DataStreamReader)returnValue);
        }
    };

    static WrappedFunction F_load = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("load");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            
            if (args.length==0) {
              returnValue = _dataStreamReader.load();
            
            } else {
            String path = (String) args[0];
              returnValue = _dataStreamReader.load(path);
            
            }
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_json = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("json");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String path = (String) args[0];
            returnValue = _dataStreamReader.json(path);
            return Utils.javaToJs(returnValue);
            //return new DataFrame((DataFrame)returnValue);
        }
    };

    static WrappedFunction F_csv = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("csv");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String path = (String) args[0];
            returnValue = _dataStreamReader.csv(path);
            return Utils.javaToJs(returnValue);
            //return new DataFrame((DataFrame)returnValue);
        }
    };

    static WrappedFunction F_parquet = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("parquet");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String path = (String) args[0];
            returnValue = _dataStreamReader.parquet(path);
            return Utils.javaToJs(returnValue);
            //return new DataFrame((DataFrame)returnValue);
        }
    };

    static WrappedFunction F_text = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("text");
            Object returnValue = null;
            org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader = (org.apache.spark.sql.streaming.DataStreamReader) ((DataStreamReader) thiz).getJavaObject();
            String path = (String) args[0];
            returnValue = _dataStreamReader.text(path);
            return Utils.javaToJs(returnValue);
            //return new DataFrame((DataFrame)returnValue);
        }
    };


    private org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader;

    public DataStreamReader(org.apache.spark.sql.streaming.DataStreamReader _dataStreamReader)
    {
       logger.debug("constructor");
       this._dataStreamReader = _dataStreamReader;
    }

    static public String getModuleName() {
        return "sql.streaming.DataStreamReader";
    }

    public boolean checkInstance(Object other) {
        return other instanceof DataStreamReader;
    }

    public Object getJavaObject() {
        return _dataStreamReader;
    }

    @Override
    public String toString() {

        return _dataStreamReader.toString();
    }

    public String getClassName() {
        return "DataStreamReader";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "format":
                return F_format;
            case "schema":
                return F_schema;
            case "option":
                return F_option;
            case "load":
                return F_load;
            case "json":
                return F_json;
            case "csv":
                return F_csv;
            case "parquet":
                return F_parquet;
            case "text":
                return F_text;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "format":
            case "schema":
            case "option":
            case "load":
            case "json":
            case "csv":
            case "parquet":
            case "text":
                return true;
        }
        return super.hasMember(name);
    }

}
