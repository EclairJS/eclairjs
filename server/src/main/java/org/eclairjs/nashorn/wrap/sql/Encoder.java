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


public class Encoder extends WrappedClass {

 static Logger logger = Logger.getLogger(Encoder.class);

    static WrappedFunction F_schema = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("schema");
            Object returnValue = null;
            org.apache.spark.sql.Encoder _encoder = (org.apache.spark.sql.Encoder) ((Encoder) thiz).getJavaObject();
            returnValue = _encoder.schema();
            return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.types.StructType((org.apache.spark.sql.types.StructType)returnValue);
        }
    };

    static WrappedFunction F_clsTag = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("clsTag");
            Object returnValue = null;
            org.apache.spark.sql.Encoder _encoder = (org.apache.spark.sql.Encoder) ((Encoder) thiz).getJavaObject();
            returnValue = _encoder.clsTag();
            return Utils.javaToJs(returnValue);
            //return new ClassTag((ClassTag)returnValue);
        }
    };


    private org.apache.spark.sql.Encoder _encoder;

    public Encoder(org.apache.spark.sql.Encoder _encoder)
    {
       logger.debug("constructor");
       this._encoder = _encoder;
    }

    static public String getModuleName() {
        return "sql.Encoder";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Encoder;
    }

    public Object getJavaObject() {
        return _encoder;
    }

    @Override
    public String toString() {

        return _encoder.toString();
    }

    public String getClassName() {
        return "Encoder";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "schema":
                return F_schema;
            case "clsTag":
                return F_clsTag;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "schema":
            case "clsTag":
                return true;
        }
        return super.hasMember(name);
    }

}
