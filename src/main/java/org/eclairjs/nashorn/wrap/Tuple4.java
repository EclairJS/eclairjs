package org.eclairjs.nashorn.wrap;


import org.eclairjs.nashorn.Utils;

import java.util.HashMap;
import java.util.Map;

public class Tuple4 extends WrappedClass {
    static WrappedFunction  F_1 = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple4)thiz)._1;
        }
    };
    static WrappedFunction F_2  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple4)thiz)._2;
        }
    };
    static WrappedFunction F_3  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple4)thiz)._3;
        }
    };
    static WrappedFunction F_4  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Tuple4)thiz)._4;
        }
    };
    static Map<String,WrappedFunction> functions = new HashMap<>();

    static {
        functions.put("_1",F_1);
        functions.put("_2",F_2);
        functions.put("_3",F_3);
        functions.put("_4",F_4);
    }

    Object _1;
    Object _2;
    Object _3;
    Object _4;
    public Tuple4(scala.Tuple4 tuple4) {
        _1=Utils.javaToJs(tuple4._1(),null);
        _2=Utils.javaToJs(tuple4._2(),null);
        _3=Utils.javaToJs(tuple4._3(),null);
        _4=Utils.javaToJs(tuple4._4(),null);
    }

    public Tuple4(Object _1, Object _2, Object _3, Object _4)  {
        this._1=_1;
        this._2=_2;
        this._3=_3;
        this._4=_4;
    }

    static public String getModuleName() {
        return "Tuple4";
    }

    public Object getJavaObject() {
        return new scala.Tuple4(
            Utils.jsToJava(_1),
            Utils.jsToJava(_2),
            Utils.jsToJava(_3),
            Utils.jsToJava(_4)
        );
    }

    @Override
    public String toJSON() {
        return "{\"0\":" + Utils.JsonStringify(_1) + ",\"1\":" + Utils.JsonStringify(_2) +
                ",\"2\":" + Utils.JsonStringify(_3) + ",\"4\":" + Utils.JsonStringify(_4) + ",\"length\":4}" ;
    }

    @Override
    public String toString() {
        return "(" + _1 + "," + _2 + "," + _3 + "," + _4 + ")" ;
    }

    public String getClassName() {return "Tuple4";}
    public  boolean checkInstance(Object other){ return other instanceof Tuple3;}

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "_1": return F_1;
            case "_2": return F_2;
            case "_3": return F_3;
            case "_4": return F_4;
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
                return true;
        }
        return super.hasMember(name);
    }

}
