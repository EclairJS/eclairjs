package org.eclairjs.nashorn.wrap;

import jdk.nashorn.api.scripting.AbstractJSObject;

public   abstract class WrappedClass  extends AbstractJSObject {

        public abstract Object getJavaObject();
        public abstract String getClassName();
        public abstract boolean checkInstance(Object other);



        WrappedFunction F_toJSON  = new  WrappedFunction (){
                @Override
                public Object call(Object thiz, Object... args)
                {
                        return ((WrappedClass)thiz).toJSON();
                }
        };

        WrappedFunction F_toString  = new  WrappedFunction (){
                @Override
                public Object call(Object thiz, Object... args)
                {
                        return ((WrappedClass)thiz).toString();
                }
        };

        public String toString()
        {
                return getJavaObject().toString();
        }

        public String toJSON()
        {
                return getJavaObject().toString();
        }


        public Object getDefaultValue(Class<?> hint)
        {

                return toString();
        }

        // get the value of that named property
        @Override
        public Object getMember(String name) {
                switch (name) {
                        case "toJSON": return F_toJSON;
                        case "toString": return F_toString;
                }
                throw new RuntimeException(getClassName()+"."+name+" is not defined");
        }
        @Override
        public boolean hasMember(String name) {
                switch (name) {
                        case "toJSON":
                        case "toString":
                                return true;
                }
                return false;
        }

        public boolean isInstance(Object instance) {
                return checkInstance(instance);
        }

}
