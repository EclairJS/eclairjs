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

    public String toString() {
        Map<String,Object> map=new HashMap<>();
        map.put("_1",_1);
        map.put("_2",_2);
        return Utils.jsonString(map);
    }

    public String toJSON() {return toString();}

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
        }
        return super.getMember(name);
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
