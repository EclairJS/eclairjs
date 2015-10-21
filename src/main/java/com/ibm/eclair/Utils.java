package com.ibm.eclair;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import javax.script.Invocable;
import javax.script.ScriptEngine;

import org.apache.log4j.Logger;
import org.apache.spark.SparkFiles;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.json.simple.JSONValue;
import scala.Tuple2;

import java.io.FileReader;
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
    	if (o instanceof LabeledPoint) {
    		try {
    			Logger logger = Logger.getLogger("Utils:javaToJs");
    			logger.info("eval LabledPoint.js");
	  			engine.eval(new FileReader(SparkFiles.get("LabeledPoint.js")));
	  			Invocable invocable = (Invocable) engine;
	  			logger.info("create LabledPoint.js");
	  			Object parm = invocable.invokeFunction("labeledPointFromJavaObject", o);
	  			logger.info(parm);
	  			return parm;
  			} catch (Exception e) {
    			// FIXME need better error handling for File exception and Script exception
    			System.out.println(e);
    			return null;
    		}

    	} else if(o instanceof Tuple2) {
            Tuple2 t = (Tuple2)o;
            ArrayList l = new ArrayList();
            l.add(wrapObject(t._1()));
            l.add(wrapObject(t._2()));
            return l.toArray();
        } else
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
    
    public static ScriptEngine addScopeVarsToEngine(HashMap scopeVars, ScriptEngine engine) {
    	System.out.println("addScopeVarsToEngine");
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
        if(o instanceof String ||
           o instanceof Number) {
            return o;
        }

        return ScriptObjectMirror.wrapAsJSONCompatible(o,null);
    }
}
