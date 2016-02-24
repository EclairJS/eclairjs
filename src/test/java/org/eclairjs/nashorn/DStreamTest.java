package org.eclairjs.nashorn;

import org.junit.Test;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import static org.junit.Assert.assertEquals;

public class DStreamTest {

    /*
    @Test
    public void foreachRDD() throws Exception {
        runTest("foreachRDDTest",
                "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z");
    }
    */

    @Test
    public void flatMapForeachRDD() throws Exception {
        runTest("flatMapTest",
                "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z");
    }

    @Test
    public void flatMapToPair() throws Exception {
        //runTest("flatMapToPairTest",
        //        "(a,1),(b,1),(c,1),(d,1),(e,1),(f,1),(g,1),(h,1),(i,1),(j,1),(k,1),(l,1),(m,1),(n,1),(o,1),(p,1),(q,1),(r,1),(s,1),(t,1),(u,1),(v,1),(w,1),(x,1),(y,1),(z,1)");
        runTest("flatMapToPairTest",
                "a,1,b,1,c,1,d,1,e,1,f,1,g,1,h,1,i,1,j,1,k,1,l,1,m,1,n,1,o,1,p,1,q,1,r,1,s,1,t,1,u,1,v,1,w,1,x,1,y,1,z,1");
    }

    @Test
    public void map() throws Exception {
        runTest("mapTest",
                "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z");
    }

    private void runTest(String name, String expected) throws Exception {
        StreamProducer sp = new StreamProducer();
        Thread producer = new Thread(sp);
        ScriptEngine engine = TestUtils.getNewEngine();

        TestUtils.evalJSResource(engine, "/dstreamtest.js");
        producer.start();
        ((Invocable)engine).invokeFunction(name, null);

        Object ret = null;
        while(true) {
            if(sp.done) {
                ret = ((Invocable)engine).invokeFunction("getData", null);
                ((Invocable)engine).invokeFunction("stop", null);
                break;
            } else
                Thread.sleep(1000);
        }
        assertEquals(
                "should be same",
                expected,
                ret.toString()
        );
    }

    class StreamProducer implements Runnable {

        PrintWriter out = null;
        boolean done = false;

        String[] data = {
                "a,b,c,d,e,f",
                "g,h,i,j,k,l",
                "m,n,o,p,q,r",
                "s,t,u,v,w,x",
                "y,z"
        };

        public void run() {
            ServerSocket ss = null;
            Socket s = null;
            try {
                ss = new ServerSocket(9999);
                s = ss.accept();
                out = new PrintWriter(s.getOutputStream(), true);
            } catch(Exception e) {
                e.printStackTrace();
                close(ss);
                done = true;
                return;
            }

            int index = 0;
            while(index <= 4) {
                try {
                    //System.out.println(data[index]);
                    out.println(data[index]);
                    index++;
                    Thread.sleep(500);
                } catch (Exception e) {
                    e.printStackTrace();
                    break;
                }
            }

            close(ss);
            done = true;
        }

        private void close(ServerSocket ss) {
            try {
                ss.close();
            } catch(Exception e) { e.printStackTrace(); }
        }
    }
}
