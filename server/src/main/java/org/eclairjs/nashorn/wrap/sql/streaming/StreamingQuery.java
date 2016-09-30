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


public class StreamingQuery extends WrappedClass {

 static Logger logger = Logger.getLogger(StreamingQuery.class);

    static WrappedFunction F_name = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("name");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.name();
            return returnValue;
        }
    };

    static WrappedFunction F_id = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("id");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.id();
            return returnValue;
        }
    };

    static WrappedFunction F_sparkSession = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sparkSession");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.sparkSession();
             return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.SparkSession((org.apache.spark.sql.SparkSession)returnValue);
        }
    };

    static WrappedFunction F_isActive = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("isActive");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.isActive();
            return returnValue;
        }
    };

    static WrappedFunction F_exception = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("exception");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.exception();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sourceStatuses = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sourceStatuses");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.sourceStatuses();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sinkStatus = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sinkStatus");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            returnValue = _streamingQuery.sinkStatus();
            return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.streaming.SinkStatus((org.apache.spark.sql.streaming.SinkStatus)returnValue);
        }
    };

    static WrappedFunction F_awaitTermination = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("awaitTermination");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            
            if (args.length==0) {
              /*returnValue = */_streamingQuery.awaitTermination();
            
            } else {
            long timeoutMs =  Utils.toLong(args[0]);
              returnValue = _streamingQuery.awaitTermination(timeoutMs);
            
            }
            return returnValue;
        }
    };

    static WrappedFunction F_processAllAvailable = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("processAllAvailable");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            _streamingQuery.processAllAvailable();
            return null;
        }
    };

    static WrappedFunction F_stop = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("stop");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            _streamingQuery.stop();
            return null;
        }
    };

    static WrappedFunction F_explain = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("explain");
            Object returnValue = null;
            org.apache.spark.sql.streaming.StreamingQuery _streamingQuery = (org.apache.spark.sql.streaming.StreamingQuery) ((StreamingQuery) thiz).getJavaObject();
            
            if (args.length==0) {
              _streamingQuery.explain();
            
            } else {
            boolean extended = (boolean) args[0];
              _streamingQuery.explain(extended);
            
            }
            return null;
        }
    };


    private org.apache.spark.sql.streaming.StreamingQuery _streamingQuery;

    public StreamingQuery(org.apache.spark.sql.streaming.StreamingQuery _streamingQuery)
    {
       logger.debug("constructor");
       this._streamingQuery = _streamingQuery;
    }

    static public String getModuleName() {
        return "sql.streaming.StreamingQuery";
    }

    public boolean checkInstance(Object other) {
        return other instanceof StreamingQuery;
    }

    public Object getJavaObject() {
        return _streamingQuery;
    }

    @Override
    public String toString() {

        return _streamingQuery.toString();
    }

    public String getClassName() {
        return "StreamingQuery";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "name":
                return F_name;
            case "id":
                return F_id;
            case "sparkSession":
                return F_sparkSession;
            case "isActive":
                return F_isActive;
            case "exception":
                return F_exception;
            case "sourceStatuses":
                return F_sourceStatuses;
            case "sinkStatus":
                return F_sinkStatus;
            case "awaitTermination":
                return F_awaitTermination;
            case "processAllAvailable":
                return F_processAllAvailable;
            case "stop":
                return F_stop;
            case "explain":
                return F_explain;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "name":
            case "id":
            case "sparkSession":
            case "isActive":
            case "exception":
            case "sourceStatuses":
            case "sinkStatus":
            case "awaitTermination":
            case "processAllAvailable":
            case "stop":
            case "explain":
                return true;
        }
        return super.hasMember(name);
    }

}
