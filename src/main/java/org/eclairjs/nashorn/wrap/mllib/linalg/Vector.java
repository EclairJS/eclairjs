package org.eclairjs.nashorn.wrap.mllib.linalg;
/*                                                                         
* Copyright 2016 IBM Corp.                                                 
*                                                                          
* Licensed under the Apache License, Version 2.0 (the "License");          
* you may not use this file except in compliance with the License.         
* You may obtain a copy of the License at                                  
*                                                                          
*      http://www.apache.org/licenses/LICENSE-2.0                          
*                                                                          
* Unless required by applicable law or agreed to in writing, software      
* distributed under the License is distributed on an "AS IS" BASIS,        
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the License for the specific language governing permissions and      
* limitations under the License.                                           
*/ 

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class Vector extends WrappedClass {

    static WrappedFunction F_size = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.size();
            return returnValue;
        }
    };

    static WrappedFunction F_toArray = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_vector.toArray()); // var ret = Java.from(a); // convert java array to JavaScript array.
            return returnValue;
        }
    };

    static WrappedFunction F_equals = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            Object other = Utils.jsToJava(args[0]);
            returnValue = _vector.equals(other);
            return returnValue;
        }
    };

    static WrappedFunction F_hashCode = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.hashCode();
            return returnValue;
        }
    };

    static WrappedFunction F_apply = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            int i = (int) args[0];
            returnValue = _vector.apply(i);
            return returnValue;
        }
    };

    static WrappedFunction F_copy = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue ;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.copy();
            return Utils.javaToJs(returnValue);
        }
    };

//    static WrappedFunction F_foreachActive = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            Object returnValue = null;
//            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
//            Object  bindArgs0 = null;
//            if (args.length > 1) {
//                bindArgs = args[1];
//            }
//            JSFunction2 f = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", _vector.context(), bindArgs0);
//            _vector.foreachActive(f);
//            return null;
//        }
//    };

    static WrappedFunction F_numActives = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.numActives();
            return returnValue;
        }
    };

    static WrappedFunction F_numNonzeros = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.numNonzeros();
            return returnValue;
        }
    };

    static WrappedFunction F_toSparse = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.toSparse();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_toDense = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.toDense();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_compressed = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.compressed();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_argmax = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector) ((Vector) thiz).getJavaObject();
            returnValue = _vector.argmax();
            return returnValue;
        }
    };


    private org.apache.spark.mllib.linalg.Vector _vector;

    public Vector(org.apache.spark.mllib.linalg.Vector _vector)
    { this._vector = _vector; }

    public Vector() {

    }

    static public String getModuleName() {
        return "mllib.linalg.Vector";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Vector;
    }

    public Object getJavaObject() {
        return _vector;
    }

    @Override
    public String toString() {

        return this.getJavaObject().toString();
    }

    @Override
    public String toJSON() {

        String returnValue;
        org.apache.spark.mllib.linalg.Vector _vector = (org.apache.spark.mllib.linalg.Vector)  this.getJavaObject();
        returnValue = _vector.toJson();
        return returnValue;
    }
    public String getClassName() {
        return "Vector";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "size":
                return F_size;
            case "toArray":
                return F_toArray;
            case "equals":
                return F_equals;
            case "hashCode":
                return F_hashCode;
            case "apply":
                return F_apply;
            case "copy":
                return F_copy;
//            case "foreachActive":
//                return F_foreachActive;
            case "numActives":
                return F_numActives;
            case "numNonzeros":
                return F_numNonzeros;
            case "toSparse":
                return F_toSparse;
            case "toDense":
                return F_toDense;
            case "compressed":
                return F_compressed;
            case "argmax":
                return F_argmax;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "$init$":
            case "size":
            case "toArray":
            case "equals":
            case "hashCode":
            case "apply":
            case "copy":
//            case "foreachActive":
            case "numActives":
            case "numNonzeros":
            case "toSparse":
            case "toDense":
            case "compressed":
            case "argmax":
                return true;
        }
        return super.hasMember(name);
    }

}
