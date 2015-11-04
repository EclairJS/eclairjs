/*
 * Copyright 2015 IBM Corp.
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

package com.ibm.eclair;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import org.apache.log4j.Logger;
import org.apache.spark.SparkFiles;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.json.simple.JSONValue;
import scala.Tuple2;

import java.io.FileReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * Created by bburns on 9/18/15.
 */
public class Utils {

    /*
    public static Object javaToJs(Object o) {
        if(o instanceof Tuple2) {
            Tuple2 t = (Tuple2)o;
            ArrayList l = new ArrayList();
            l.add(t._1());
            l.add(t._2());
            return l.toArray();
        } else
            return o;
    }
    */
    public static Object javaToJs(Object o, ScriptEngine engine) {
    	Logger logger = Logger.getLogger(Utils.class);
    	logger.debug(o.getClass().getName());
    	if (o instanceof LabeledPoint) {
    		try {
 	  			Invocable invocable = (Invocable) engine;
	  			logger.info("create LabledPoint");
	  			Object parm = invocable.invokeFunction("labeledPointFromJavaObject", o);
	  			logger.info(parm);
	  			return parm;
  			} catch (Exception e) {
    			logger.error(" LabeledPoint convertion " + e);
    			return null;
    		}

    	} else if(o instanceof Tuple2) {
            Tuple2 t = (Tuple2)o;
            logger.debug("Tupple2 " + t.toString());
            Object er = null;
            Object o1 = javaToJs(t._1(),engine);
            Object o2 = javaToJs(t._2(), engine);
            logger.debug("o1 = " + o1);
             try {
				//engine.eval("function convertTuple2(o1, o2) { return [o1 ,o2 ]}");
				Invocable invocable = (Invocable) engine;
				 Object params[] = {o1, o2};
				 er  = invocable.invokeFunction("convertJavaTuple2",params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error(" Tuple2 convertion " + e);
			}
            return er;
        }  else
            return wrapObject(o);

    }

    public static Object jsToJava(Object o) {
    	if ( (o instanceof ScriptObjectMirror) && ((ScriptObjectMirror) o).hasMember("getJavaObject") ) {
    		Object r = ((ScriptObjectMirror) o).callMember("getJavaObject");
    		return r;
    	} else if(o instanceof JSObject) {
            Object obj = ScriptObjectMirror.wrapAsJSONCompatible(o, null);
            String j = JSONValue.toJSONString(obj);
            return JSONValue.parse(j);
        }

        return o;
    }

    public static String getUniqeFunctionName() {
        return "EXPORTEDFUNCTION" + java.util.UUID.randomUUID().toString().replace("-", "_");
    }

    public static ScriptEngine addScopeVarsToEngine(HashMap scopeVars, ScriptEngine engine) {
    	//System.out.println("addScopeVarsToEngine");
    	if (scopeVars != null) {
        	Iterator it = scopeVars.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry)it.next();
                System.out.println("adding " + pair.getKey() + " value " + pair.getValue());
                engine.put((String)pair.getKey(), pair.getValue());
            }
    	}
    	return engine;
    }

    private static Object wrapObject(Object o) {
    	Logger logger = Logger.getLogger(Utils.class);
        if(o instanceof String ||
           o instanceof Number) {
            return o;
        }
        logger.debug("wrapAsJSONCompatible " + o);
        return ScriptObjectMirror.wrapAsJSONCompatible(o,null);
    }
    
    public static String jarLoc() {
    	Logger logger = Logger.getLogger(Utils.class);
    	String jarPath = null;
    	Map<String, String> env = System.getenv();
    	jarPath = env.get("ECLAIR_JAR_LOC");
    	if (jarPath == null) {
    		String path = Utils.class.getProtectionDomain().getCodeSource().getLocation().getPath();
    		logger.info("jar path = " + path);
            String decodedPath = null;
    		try {
    			decodedPath = URLDecoder.decode(path, "UTF-8");
    		} catch (UnsupportedEncodingException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		jarPath = decodedPath;
    	}
    	logger.info("env = "+ jarPath);
    	return jarPath;
    	
    }
}
