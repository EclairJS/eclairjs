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


public class SinkStatus extends WrappedClass {

 static Logger logger = Logger.getLogger(SinkStatus.class);

    static WrappedFunction F_description = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("F_description");
            Object returnValue = null;
            org.apache.spark.sql.streaming.SinkStatus _sinkStatus = (org.apache.spark.sql.streaming.SinkStatus) ((SinkStatus) thiz).getJavaObject();
            returnValue = _sinkStatus.description ();
            // return Utils.javaToJs(returnValue);
            return returnValue;
        }
    };

    static WrappedFunction F_offsetDesc = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("F_offsetDesc");
            Object returnValue = null;
            org.apache.spark.sql.streaming.SinkStatus _sinkStatus = (org.apache.spark.sql.streaming.SinkStatus) ((SinkStatus) thiz).getJavaObject();
            returnValue = _sinkStatus.offsetDesc ();
            // return Utils.javaToJs(returnValue);
            return returnValue;
        }
    };

    private org.apache.spark.sql.streaming.SinkStatus _sinkStatus;

    public SinkStatus(org.apache.spark.sql.streaming.SinkStatus _sinkStatus)
    {
       logger.debug("constructor");
       this._sinkStatus = _sinkStatus;
    }

    static public String getModuleName() {
        return "sql.streaming.SinkStatus";
    }

    public boolean checkInstance(Object other) {
        return other instanceof SinkStatus;
    }

    public Object getJavaObject() {
        return _sinkStatus;
    }

    @Override
    public String toString() {

        return _sinkStatus.toString();
    }

    public String getClassName() {
        return "SinkStatus";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "description":
                return F_description;
            case "offsetDesc":
                return F_offsetDesc;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "description":
            case "offsetDesc":
                return true;
        }
        return super.hasMember(name);
    }

}
