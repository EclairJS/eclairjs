package org.eclairjs.nashorn.wrap;


import org.eclairjs.nashorn.Utils;

import java.util.HashMap;
import java.util.Map;

public class Tuple5 extends WrappedClass {
    static WrappedFunction  F_1 = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple5)thiz)._1;
        }
    };
    static WrappedFunction F_2  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple5)thiz)._2;
        }
    };
    static WrappedFunction F_3  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple5)thiz)._3;
        }
    };
    static WrappedFunction F_4  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple5)thiz)._4;
        }
    };
    static WrappedFunction F_5  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple5)thiz)._5;
        }
    };
    static Map<String,WrappedFunction> functions = new HashMap<>();

    static {
        functions.put("_1",F_1);
        functions.put("_2",F_2);
        functions.put("_3",F_3);
        functions.put("_4",F_4);
        functions.put("_5",F_5);
    }

    Object _1;
    Object _2;
    Object _3;
    Object _4;
    Object _5;
    public Tuple5(scala.Tuple5 tuple5) {
        _1=Utils.javaToJs(tuple5._1(),null);
        _2=Utils.javaToJs(tuple5._2(),null);
        _3=Utils.javaToJs(tuple5._3(),null);
        _4=Utils.javaToJs(tuple5._4(),null);
        _5=Utils.javaToJs(tuple5._5(),null);
    }

    public Tuple5(Object _1, Object _2, Object _3, Object _4, Object _5)  {
        this._1=Utils.javaToJs(_1);
        this._2=Utils.javaToJs(_2);
        this._3=Utils.javaToJs(_3);
        this._4=Utils.javaToJs(_4);
        this._5=Utils.javaToJs(_5);
    }

    static public String getModuleName() {
        return "Tuple5";
    }

    public Object getJavaObject() {
        return new scala.Tuple5(
            Utils.jsToJava(_1),
            Utils.jsToJava(_2),
            Utils.jsToJava(_3),
            Utils.jsToJava(_4),
            Utils.jsToJava(_5)
        );
    }

    @Override
    public String toJSON() {
        return "{\"0\":" + Utils.JsonStringify(_1) + ",\"1\":" + Utils.JsonStringify(_2) +
                ",\"2\":" + Utils.JsonStringify(_3) + ",\"3\":" + Utils.JsonStringify(_4) + ",\"4\":" + Utils.JsonStringify(_5) + ",\"length\":5}" ;
    }

    @Override
    public String toString() {
        return "(" + _1 + "," + _2 + "," + _3 + "," + _4 + "," + _5 + ")" ;
    }

    public String getClassName() {return "Tuple5";}
    public  boolean checkInstance(Object other){ return other instanceof Tuple5;}

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "_1": return F_1;
            case "_2": return F_2;
            case "_3": return F_3;
            case "_4": return F_4;
            case "_5": return F_5;
        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "_1":
            case "_2":
            case "_3":
            case "_4":
            case "_5":
                return true;
        }
        return super.hasMember(name);
    }

}
