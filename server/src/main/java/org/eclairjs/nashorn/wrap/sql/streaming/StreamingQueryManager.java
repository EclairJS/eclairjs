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
import org.eclairjs.nashorn.sql.JSStreamingQueryListener;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class StreamingQueryManager extends WrappedClass {

 static Logger logger = Logger.getLogger(StreamingQueryManager.class);

    static WrappedFunction F_active = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("active");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();
            returnValue = _streamingQueryManager.active();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_get = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("get");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();
            long id =  Utils.toLong(args[0]);
            returnValue = _streamingQueryManager.get(id);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.streaming.StreamingQuery((org.apache.spark.sql.streaming.StreamingQuery)returnValue);
        }
    };

    static WrappedFunction F_awaitAnyTermination = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("awaitAnyTermination");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();
            
            if (args.length==0) {
              _streamingQueryManager.awaitAnyTermination();
            
            } else {
            long timeoutMs =  Utils.toLong(args[0]);
              returnValue = _streamingQueryManager.awaitAnyTermination(timeoutMs);
            
            }
            return returnValue;
        }
    };

    static WrappedFunction F_resetTerminated = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("resetTerminated");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();
            _streamingQueryManager.resetTerminated();
            return null;
        }
    };

    static WrappedFunction F_addListener = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("addListener");
            JSStreamingQueryListener listener;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();

            Object bindArgs1 = (args.length > 3) ? args[3] : null;
            Object bindArgs2 = (args.length > 4) ? args[4] : null;
            Object bindArgs3 = (args.length > 5) ? args[5] : null;
            listener = new JSStreamingQueryListener(args[0], args[1], args[2],
                    bindArgs1, bindArgs2, bindArgs3);
            _streamingQueryManager.addListener(listener);
            //return Utils.javaToJs(returnValue);
            return listener;

        }
    };

    static WrappedFunction F_removeListener = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("removeListener");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager = (org.apache.spark.sql.streaming.StreamingQueryManager) ((StreamingQueryManager) thiz).getJavaObject();
            org.apache.spark.sql.streaming.StreamingQueryListener listener = (org.apache.spark.sql.streaming.StreamingQueryListener) args[0];
            _streamingQueryManager.removeListener(listener);
            return null;
        }
    };


    private org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager;

    public StreamingQueryManager(org.apache.spark.sql.streaming.StreamingQueryManager _streamingQueryManager)
    {
       logger.debug("constructor");
       this._streamingQueryManager = _streamingQueryManager;
    }

    static public String getModuleName() {
        return "sql.streaming.StreamingQueryManager";
    }

    public boolean checkInstance(Object other) {
        return other instanceof StreamingQueryManager;
    }

    public Object getJavaObject() {
        return _streamingQueryManager;
    }

    @Override
    public String toString() {

        return _streamingQueryManager.toString();
    }

    public String getClassName() {
        return "StreamingQueryManager";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "active":
                return F_active;
            case "get":
                return F_get;
            case "awaitAnyTermination":
                return F_awaitAnyTermination;
            case "resetTerminated":
                return F_resetTerminated;
            case "addListener":
                return F_addListener;
            case "removeListener":
                return F_removeListener;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "active":
            case "get":
            case "awaitAnyTermination":
            case "resetTerminated":
            case "addListener":
            case "removeListener":
                return true;
        }
        return super.hasMember(name);
    }

}
