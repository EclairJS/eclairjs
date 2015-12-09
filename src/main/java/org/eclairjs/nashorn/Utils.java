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

package org.eclairjs.nashorn;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import org.apache.log4j.Logger;
import org.apache.spark.SparkFiles;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Row;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import scala.Tuple2;
import scala.collection.Seq;
import scala.collection.convert.Wrappers.IteratorWrapper;

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
		if(o != null)
			logger.debug(o.getClass().getName());
    	if (o instanceof LabeledPoint) {
    		try {
 	  			Invocable invocable = (Invocable) engine;
	  			logger.info("create LabledPoint");
	  			// FIXME should be using createJavaWrapperObject
	  			Object parm = invocable.invokeFunction("labeledPointFromJavaObject", o);
	  			logger.info(parm);
	  			return parm;
  			} catch (Exception e) {
    			logger.error(" LabeledPoint convertion " + e);
    			return null;
    		}

    	}if (o instanceof Row) {
			try {
				Invocable invocable = (Invocable) engine;
				logger.info("create Row");
				Object params[] = {"Row", o};
				Object parm = invocable.invokeFunction("createJavaWrapperObject", params);
				logger.info(parm);
				return parm;
			} catch (Exception e) {
				logger.error(" Row convertion " + e);
				return null;
			}

		} else if(o instanceof RDD) {
			Object er = null;
			Object params[] = {o};
			try {
				Invocable invocable = (Invocable)engine;
				er = invocable.invokeFunction("convertToRDD",params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error("Error converting to RDD " + e);
			}

			return er;
    	} else if(o instanceof Tuple2) {
            Tuple2 t = (Tuple2)o;
            logger.info("Tupple2 " + t.toString());
            Object er = null;
            Object o1 = javaToJs(t._1(),engine);
            Object o2 = javaToJs(t._2(), engine);
            logger.debug("o1 = " + o1);
             try {
				//engine.eval("function convertTuple2(o1, o2) { return [o1 ,o2 ]}");
				Invocable invocable = (Invocable) engine;
				 Object params[] = {o1, o2};
				// FIXME should be using createJavaWrapperObject
				 er  = invocable.invokeFunction("convertJavaTuple2",params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error(" Tuple2 convertion " + e);
			}
            return er;
        } else if (o instanceof IteratorWrapper) {
        	ArrayList alist = new ArrayList();
        			
        	while(((IteratorWrapper) o).hasMoreElements()) {
        		//alist.add(((IteratorWrapper) o).nextElement());
        		alist.add(javaToJs(((IteratorWrapper) o).nextElement(),engine));
        	}
        	return wrapObject(alist);
        } else if (o instanceof JSONObject) {
        	Object er = null;
        	try {
        		logger.debug("JSONObject " + o.toString());
				Invocable invocable = (Invocable) engine;
				 Object params[] = {o.toString()};
				 er  = invocable.invokeFunction("convertJavaJSONObject",params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error(" JSONObject convertion " + e);
			}
        	return er;
        } else
            return wrapObject(o);


    }

    public static Object jsToJava(Object o) {
    	Logger logger = Logger.getLogger(Utils.class);
		if(o != null)
			logger.debug("jsToJava" + o.getClass().getName());
    	if ( (o instanceof ScriptObjectMirror) && ((ScriptObjectMirror) o).hasMember("getJavaObject") ) {
    		Object r = ((ScriptObjectMirror) o).callMember("getJavaObject");
    		logger.debug("getJavaObject" + r.getClass().getName());
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
 
    /**
     * Takes an array of objects and returns a scala Seq
     * @param {Object[]} o 
     * @return {scala.collection.Seq}
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Seq toScalaSeq(Object[] o) {
    	ArrayList list = new ArrayList();
    	for (int i = 0; i < o.length; i++) {
    		list.add(o[i]);
    	}
  		return scala.collection.JavaConversions.asScalaBuffer(list).toList();

    }

	
}
