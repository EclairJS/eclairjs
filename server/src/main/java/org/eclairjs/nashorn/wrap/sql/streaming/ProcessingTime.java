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
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;


public class ProcessingTime extends WrappedClass {

 static Logger logger = Logger.getLogger(ProcessingTime.class);


    private org.apache.spark.sql.streaming.ProcessingTime _processingTime;

    public ProcessingTime(org.apache.spark.sql.streaming.ProcessingTime _processingTime)
    {
       logger.debug("constructor");
       this._processingTime = _processingTime;
    }

    static public String getModuleName() {
        return "sql.streaming.ProcessingTime";
    }

    public boolean checkInstance(Object other) {
        return other instanceof ProcessingTime;
    }

    public Object getJavaObject() {
        return _processingTime;
    }

    @Override
    public String toString() {

        return _processingTime.toString();
    }

    public String getClassName() {
        return "ProcessingTime";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
//        switch (name) {
//
//                return true;
//        }
        return super.hasMember(name);
    }

//
// static methods
//
  public static Object apply( String interval) {
    logger.debug("apply");
//     return Utils.javaToJs(org.apache.spark.sql.streaming.ProcessingTime.apply(interval));
    return new org.eclairjs.nashorn.wrap.sql.streaming.ProcessingTime((org.apache.spark.sql.streaming.ProcessingTime)org.apache.spark.sql.streaming.ProcessingTime.apply(interval));

  }

//  public static Object apply( Object interval) {
//    logger.debug("apply");
//    org.apache.spark.streaming.Duration interval_uw = (org.apache.spark.streaming.Duration) Utils.toObject(interval);
////     return Utils.javaToJs(org.apache.spark.sql.streaming.ProcessingTime.apply(interval_uw));
//    return new org.eclairjs.nashorn.wrap.sql.streaming.ProcessingTime((org.apache.spark.sql.streaming.ProcessingTime)org.apache.spark.sql.streaming.ProcessingTime.apply(interval_uw));
//
//  }

  public static Object create( String interval) {
    logger.debug("create");
//     return Utils.javaToJs(org.apache.spark.sql.streaming.ProcessingTime.create(interval));
    return new org.eclairjs.nashorn.wrap.sql.streaming.ProcessingTime((org.apache.spark.sql.streaming.ProcessingTime)org.apache.spark.sql.streaming.ProcessingTime.create(interval));

  }

//  public static Object create( long interval,TimeUnit unit) {
//    logger.debug("create");
////     return Utils.javaToJs(org.apache.spark.sql.streaming.ProcessingTime.create(interval,unit));
//    return new org.eclairjs.nashorn.wrap.sql.streaming.ProcessingTime((org.apache.spark.sql.streaming.ProcessingTime)org.apache.spark.sql.streaming.ProcessingTime.create(interval,unit));
//
//  }


}
