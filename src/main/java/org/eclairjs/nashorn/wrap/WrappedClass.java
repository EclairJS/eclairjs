package org.eclairjs.nashorn.wrap;

import jdk.nashorn.api.scripting.AbstractJSObject;

public abstract class WrappedClass extends AbstractJSObject {
    /*

    IMPORTANT this method needs to be implmented in subclasses for module loading
    static public String getModuleName(){ return null;}

     */
    public abstract Object getJavaObject();

    public abstract String getClassName();

    public abstract boolean checkInstance(Object other);


    WrappedFunction F_toJSON = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((WrappedClass) thiz).toJSON();
        }
    };

    WrappedFunction F_toString = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((WrappedClass) thiz).toString();
        }
    };

    WrappedFunction F_valueOf = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((WrappedClass) thiz).valueOf();
        }
    };

    WrappedFunction F_getJavaObject = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((WrappedClass) thiz).getJavaObject();
        }
    };

    public String toString() {
        return getJavaObject().toString();
    }

    public String toJSON() {
        return getJavaObject().toString();
    }

    public String valueOf() {
        return getJavaObject().toString();
    }


    public Object getDefaultValue(Class<?> hint) {

        return toString();
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "toJSON":
                return F_toJSON;
            case "toString":
                return F_toString;
            case "valueOf":
                return F_valueOf;
            case "getJavaObject":
                return F_getJavaObject;
        }
        throw new RuntimeException(getClassName() + "." + name + " is not defined");
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "toJSON":
            case "toString":
            case "valueOf":
            case "getJavaObject":
                return true;
        }
        return false;
    }

    public boolean isInstance(Object instance) {
        return checkInstance(instance);
    }

}
