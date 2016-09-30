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

import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;


public class SourceStatus extends WrappedClass {

 static Logger logger = Logger.getLogger(SourceStatus.class);

    static WrappedFunction F_description = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("F_description");
            Object returnValue = null;
            //org.apache.spark.sql.streaming.SourceStatus _sourceStatus = (org.apache.spark.sql.streaming.SourceStatus) ((SourceStatus) thiz).getJavaObject();
            returnValue = ((SourceStatus) thiz).description(); // _sourceStatus.description ();
            // return Utils.javaToJs(returnValue);
            return returnValue;
        }
    };

    static WrappedFunction F_offsetDesc = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("F_offsetDesc");
            Object returnValue = null;
            //org.apache.spark.sql.streaming.SourceStatus _sourceStatus = (org.apache.spark.sql.streaming.SourceStatus) ((SourceStatus) thiz).getJavaObject();
             returnValue = ((SourceStatus) thiz).offsetDesc(); //_sourceStatus.offsetDesc().toString();
            // return Utils.javaToJs(returnValue);
            return returnValue;
        }
    };

    private org.apache.spark.sql.streaming.SourceStatus _sourceStatus;

    public SourceStatus(org.apache.spark.sql.streaming.SourceStatus _sourceStatus)
    {
       logger.debug("constructor");
       this._sourceStatus = _sourceStatus;
    }

    static public String getModuleName() {
        return "sql.streaming.SourceStatus";
    }

    public boolean checkInstance(Object other) {
        return other instanceof SourceStatus;
    }

    public Object getJavaObject() {
        return _sourceStatus;
    }

    private String description() {
        org.apache.spark.sql.streaming.SourceStatus _sourceStatus = (org.apache.spark.sql.streaming.SourceStatus) this.getJavaObject();
        return _sourceStatus.description();
    }

    private String offsetDesc() {
        org.apache.spark.sql.streaming.SourceStatus _sourceStatus = (org.apache.spark.sql.streaming.SourceStatus) this.getJavaObject();
        return _sourceStatus.offsetDesc().toString();
    }

    @Override
    public String toString() {

        return _sourceStatus.toString();
    }

    @Override
    public String toJSON() {

        return "{" +
                    "\"description\": \"" + this.description() +
                    "\", \"offsetDesc\": \"" + this.offsetDesc() +
                "\"}";
    }

    public String getClassName() {
        return "SourceStatus";
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
