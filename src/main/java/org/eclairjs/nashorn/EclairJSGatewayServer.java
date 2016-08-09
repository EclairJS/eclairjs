package org.eclairjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.spark.api.java.function.Function2;
import py4j.GatewayServer;

import java.util.HashMap;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Created by bburns on 6/10/16.
 */
public class EclairJSGatewayServer {


    class Exec implements Callable {
        private String js;
        private ScriptEngine e;

        Exec(ScriptEngine e, String js) {
            this.js = js;
            this.e = e;
        }

        public Object call() {
            Object res;
            try {
                res = e.eval(js);
            }  catch (Exception e) {
                // TODO Auto-generated catch block
                System.out.println(e);
                res = e.getMessage();
            }

            return res;
        }
    }

    private ScriptEngine engine = NashornEngineSingleton.getEngine();
    private GatewayServer gateway = null;
    private Function2 callback = null;

    public EclairJSGatewayServer() {
        engine.put("eclairJSGatewayServer", this);
    }

    public void setGateway(GatewayServer gateway) {
        this.gateway = gateway;
    }

    public Object eval(String javaScript) throws Exception {


        Callable exec = new Exec(engine, javaScript);
        ExecutorService es = Executors.newFixedThreadPool(1);
        Future f = es.submit(exec);
        Object ret = f.get();

        //leave this here. It tells the python kernel no more stdout output
        //is coming.
        //System.out.println("eclairjs_done_execute");
        //return (ret != null) ? ret.toString() : null;
        if(ret == null)
            return ret;

        if(ret instanceof Number)
            return ret;

        if(ret instanceof ScriptObjectMirror)
            return ((ScriptObjectMirror)ret).getClassName();

        return ret.toString();
        //return ret;
    }

    public void registerCallback(Function2 callback) {
        this.callback = callback;
    }

    public void on_rdd(String id, String msg) {
        try {
            this.callback.call(id, msg);
        } catch(Exception e) {
            System.err.print(e.getMessage());
        }
    }

    public static void main(String[] args) {
        EclairJSGatewayServer es = new EclairJSGatewayServer();
        GatewayServer gatewayServer = new GatewayServer(es);
        es.setGateway(gatewayServer);
        gatewayServer.start();

        //ReflectionUtil.setClassLoadingStrategy(new CurrentThreadClassLoadingStrategy());
        System.out.println("Gateway Server Started");
    }
}
