package org.eclairjs.nashorn.wrap;


import org.eclairjs.nashorn.Utils;

import java.util.HashMap;
import java.util.Map;

public class Tuple2 extends WrappedClass {

    Object _1;
    Object _2;

    public Tuple2(scala.Tuple2 tuple2) {
        _1=Utils.javaToJs(tuple2._1(),null);
        _2=Utils.javaToJs(tuple2._2(),null);
    }

    public Tuple2(Object _1, Object _2)  {
        this._1=_1;
        this._2=_2;
    }

    public Object getJavaObject() {
        return new scala.Tuple2(
            Utils.jsToJava(_1),
            Utils.jsToJava(_2));
    }

    public String getClassName() {return "Tuple2";}

    public String toJSON() {
        return "{\"0\":" + _1 + ",\"1\":" + _2 + "}" ;
    }

    WrappedFunction  F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return "{\"0\":" + _1 + ",\"1\":" + _2 + "}" ;
        }
    };

    WrappedFunction  F_valueOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return "(" + _1 + "," + _2 + ")";
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


    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "_1": return F_1;
            case "_2": return F_2;
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
        }
        throw new RuntimeException("Tuple2."+name+" is not defined");
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "_1":
            case "_2":
                return true;
        }
        return super.hasMember(name);
    }

}
