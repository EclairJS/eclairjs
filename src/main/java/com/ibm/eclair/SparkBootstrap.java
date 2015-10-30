package com.ibm.eclair;

import java.io.FileReader;
import java.net.URL;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class SparkBootstrap implements Bootstrap {

    private String getResourceAsURLStirng(String file) {

        String res = null;
        try {
            res = getClass().getResource(file).toURI().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public void load(ScriptEngine engine) {
        try {
        	engine.eval("load('" + getResourceAsURLStirng("/SparkConf.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/SparkContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/RDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/DataFrame.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/SQLContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Duration.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/DStream.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/StreamingContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/KafkaUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Utils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/LinearRegressionWithSGD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/LabeledPoint.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Logger.js") + "');");
            NashornEngineSingleton.setEngine(engine);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
