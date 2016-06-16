package org.eclairjs.nashorn.wrap;


import org.eclairjs.nashorn.Utils;

import java.util.HashMap;
import java.util.Map;

public class Tuple3 extends WrappedClass {

    Object _1;
    Object _2;
    Object _3;

    public Tuple3(scala.Tuple3 tuple3) {
        _1=Utils.javaToJs(tuple3._1(),null);
        _2=Utils.javaToJs(tuple3._2(),null);
        _3=Utils.javaToJs(tuple3._3(),null);
    }

    public Tuple3(Object _1, Object _2, Object _3)  {
        this._1=_1;
        this._2=_2;
        this._3=_3;
    }

    public Object getJavaObject() {
        return new scala.Tuple3(
            Utils.jsToJava(_1),
            Utils.jsToJava(_2),
            Utils.jsToJava(_3));
    }

    @Override
    public String toJSON() {
        return "{\"0\":" + Utils.JsonStringify(_1) + ",\"1\":" + Utils.JsonStringify(_2) + ",\"2\":" + Utils.JsonStringify(_3) + ",\"length\":3}" ;
    }

    @Override
    public String toString() {
        return "(" + _1 + "," + _2 + "," + _3 + ")" ;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public String getClassName() {return "Tuple3";}


    WrappedFunction  F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toJSON();
        }
    };

    WrappedFunction  F_toString = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toString();
        }
    };

    WrappedFunction  F_valueOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return valueOf();
        }
    };


    WrappedFunction  F_1 = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return _1;
        }
    };

    WrappedFunction F_2  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return _2;
        }
    };

    WrappedFunction F_3  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return _3;
        }
    };


    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "_1": return F_1;
            case "_2": return F_2;
            case "_3": return F_3;
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
            case "toString": return toString();
        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "_1":
            case "_2":
            case "_3":
            case "valueOf":
            case "toJSON":
            case "toString":
                return true;
        }
        return super.hasMember(name);
    }

}
