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
import scala.collection.Iterator;
import scala.collection.mutable.WrappedArray;


public class StreamingQueryStatus extends WrappedClass {

 static Logger logger = Logger.getLogger(StreamingQueryStatus.class);

    static WrappedFunction F_name = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("name");
            Object returnValue = null;
            //org.apache.spark.sql.streaming.StreamingQueryInfo _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryInfo) ((StreamingQueryInfo) thiz).getJavaObject();
            returnValue = ((StreamingQueryStatus) thiz).name();
            return returnValue;
        }
    };

    static WrappedFunction F_id = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("id");
            Object returnValue = null;
            //org.apache.spark.sql.streaming.StreamingQueryInfo _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryInfo) ((StreamingQueryInfo) thiz).getJavaObject();
            returnValue = ((StreamingQueryStatus) thiz).id();
            return returnValue;
        }
    };
    static WrappedFunction F_sourceStatuses = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sourceStatuses");
            Object returnValue = null;
           // org.apache.spark.sql.streaming.StreamingQueryInfo _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryInfo) ((StreamingQueryInfo) thiz).getJavaObject();
            return ((StreamingQueryStatus) thiz).sourceStatuses();
            //return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sinkStatus = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sinkStatus");
            Object returnValue = null;
            //org.apache.spark.sql.streaming.StreamingQueryInfo _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryInfo) ((StreamingQueryInfo) thiz).getJavaObject();
            return ((StreamingQueryStatus) thiz).sinkStatus();
            //return Utils.javaToJs(returnValue);
            //return new org.eclairjs.nashorn.wrap.sql.streaming.SinkStatus((org.apache.spark.sql.streaming.SinkStatus)returnValue);
        }
    };

    private org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQueryStatus;

    public StreamingQueryStatus(org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQueryStatus)
    {
       logger.debug("constructor");
       this._streamingQueryStatus = _streamingQueryStatus;
    }

    static public String getModuleName() {
        return "sql.streaming.StreamingQueryInfo";
    }

    public boolean checkInstance(Object other) {
        return other instanceof StreamingQueryStatus;
    }

    public Object getJavaObject() {
        return _streamingQueryStatus;
    }

    private long id() {
        org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryStatus) this.getJavaObject();
        return _streamingQuery.id();

    }

    private String name() {
        org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryStatus) this.getJavaObject();
        return _streamingQuery.name();
    }

    private Object sinkStatus() {
        org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryStatus) this.getJavaObject();
        return Utils.javaToJs(_streamingQuery.sinkStatus());
    }

    private Object sourceStatuses() {
        org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryStatus) this.getJavaObject();
        return Utils.javaToJs(_streamingQuery.sourceStatuses());
    }

    @Override
    public String toString() {

        return _streamingQueryStatus.toString();
    }

    @Override
    public String toJSON() {
        SinkStatus sink = (SinkStatus) this.sinkStatus();
        org.apache.spark.sql.streaming.StreamingQueryStatus _streamingQuery = (org.apache.spark.sql.streaming.StreamingQueryStatus) this.getJavaObject();
        //WrappedArray a = (WrappedArray) _streamingQuery.sourceStatuses();
        Object[] a =  _streamingQuery.sourceStatuses();
        String ssStr = "[";
        for (Object status : a) {
            SourceStatus ss = (SourceStatus)Utils.javaToJs(status);
            ssStr += ss.toJSON();
        }
       // Object s[] = a.array().length;
        ssStr += "]";
        return "{" +
                    "\"id\":"+this.id()+
                    ",\"name\":\""+this.name()+"\""+
                    ",\"sinkStatus\":"+sink.toJSON()+
                    ",\"sourceStatuses\":"+ssStr+
                "}";
    }

    public String getClassName() {
        return "StreamingQueryInfo";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "name":
                return F_name;
            case "id":
                return F_id;
            case "sourceStatuses":
                return F_sourceStatuses;
            case "sinkStatus":
                return F_sinkStatus;
            case "awaitTermination":
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "name":
            case "id":
            case "sourceStatuses":
            case "sinkStatus":
                return true;
        }
        return super.hasMember(name);
    }

}
