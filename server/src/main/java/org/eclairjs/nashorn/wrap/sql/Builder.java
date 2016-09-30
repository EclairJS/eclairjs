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
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class Builder extends WrappedClass {

 static Logger logger = Logger.getLogger(Builder.class);

    static WrappedFunction F_appName = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("appName");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession.Builder _builder = (org.apache.spark.sql.SparkSession.Builder) ((Builder) thiz).getJavaObject();
            String name = (String) args[0];
            returnValue = _builder.appName(name);
            // return Utils.javaToJs(returnValue);
            return new Builder((org.apache.spark.sql.SparkSession.Builder)returnValue);
        }
    };

    static WrappedFunction F_config = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("config");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession.Builder _builder = (org.apache.spark.sql.SparkSession.Builder) ((Builder) thiz).getJavaObject();
            if (args.length==1)
            {
                org.apache.spark.SparkConf conf = (org.apache.spark.SparkConf) Utils.toObject(args[0]);
                returnValue = _builder.config(conf);
            }
            else
            {
                String key = (String) args[0];

                Object obj=Utils.jsToJava(args[1]);
                if (obj instanceof String)
                    returnValue = _builder.config(key,(String)obj);
                else if (obj instanceof Integer)
                    returnValue = _builder.config(key,(Integer)obj);
                else if (obj instanceof Long)
                    returnValue = _builder.config(key,(Long)obj);
                else if (obj instanceof Double)
                    returnValue = _builder.config(key,(Double)obj);
                else throw new RuntimeException("invalid type");

            }
            // return Utils.javaToJs(returnValue);
            return new Builder((org.apache.spark.sql.SparkSession.Builder)returnValue);
        }
    };



    static WrappedFunction F_master = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("master");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession.Builder _builder = (org.apache.spark.sql.SparkSession.Builder) ((Builder) thiz).getJavaObject();
            String master = (String) args[0];
            returnValue = _builder.master(master);
            // return Utils.javaToJs(returnValue);
            return new Builder((org.apache.spark.sql.SparkSession.Builder)returnValue);
        }
    };

    static WrappedFunction F_enableHiveSupport = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("enableHiveSupport");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession.Builder _builder = (org.apache.spark.sql.SparkSession.Builder) ((Builder) thiz).getJavaObject();
            returnValue = _builder.enableHiveSupport();
            // return Utils.javaToJs(returnValue);
            return new Builder((org.apache.spark.sql.SparkSession.Builder)returnValue);
        }
    };

    static WrappedFunction F_getOrCreate = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("getOrCreate");
            Object returnValue = null;
            org.apache.spark.sql.SparkSession.Builder _builder = (org.apache.spark.sql.SparkSession.Builder) ((Builder) thiz).getJavaObject();
            returnValue = _builder.getOrCreate();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.SparkSession((org.apache.spark.sql.SparkSession)returnValue);
        }
    };


    private org.apache.spark.sql.SparkSession.Builder _builder;

    public Builder(org.apache.spark.sql.SparkSession.Builder _builder)
    {
       logger.debug("constructor");
       this._builder = _builder;
    }

    static public String getModuleName() {
        return "sql.Builder";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Builder;
    }

    public Object getJavaObject() {
        return _builder;
    }

    @Override
    public String toString() {

        return _builder.toString();
    }

    public String getClassName() {
        return "Builder";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "appName":
                return F_appName;
            case "config":
                return F_config;
            case "master":
                return F_master;
            case "enableHiveSupport":
                return F_enableHiveSupport;
            case "getOrCreate":
                return F_getOrCreate;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "appName":
            case "config":
            case "master":
            case "enableHiveSupport":
            case "getOrCreate":
                return true;
        }
        return super.hasMember(name);
    }

}
