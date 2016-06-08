package org.eclairjs.nashorn.wrap;


import org.eclairjs.nashorn.Utils;

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
        }
        throw new RuntimeException("Rating."+name+" is not defined");
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "_1":
            case "_2":
            case "_3":
                return true;
        }
        return false;
    }

}
