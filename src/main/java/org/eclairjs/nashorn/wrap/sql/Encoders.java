package org.eclairjs.nashorn.wrap.sql;
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
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class Encoders extends WrappedClass {

    static Logger logger = Logger.getLogger(Encoders.class);

    static WrappedFunction F_BOOLEAN = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("BOOLEAN");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.BOOLEAN();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

//    static WrappedFunction F_BYTE = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("BYTE");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.BYTE();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

//    static WrappedFunction F_SHORT = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("SHORT");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.SHORT();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

    static WrappedFunction F_INT = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("INT");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.INT();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

//    static WrappedFunction F_LONG = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("LONG");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.LONG();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

//    static WrappedFunction F_FLOAT = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("FLOAT");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.FLOAT();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

    static WrappedFunction F_DOUBLE = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("DOUBLE");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.DOUBLE();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

    static WrappedFunction F_STRING = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("STRING");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.STRING();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

//    static WrappedFunction F_DECIMAL = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("DECIMAL");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.DECIMAL();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

    static WrappedFunction F_DATE = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("DATE");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.DATE();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

    static WrappedFunction F_TIMESTAMP = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("TIMESTAMP");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            returnValue = _encoders.TIMESTAMP();
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

//    static WrappedFunction F_BINARY = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("BINARY");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            returnValue = _encoders.BINARY();
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

//    static WrappedFunction F_bean = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("bean");
//            Object returnValue = null;
//            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
//            Class beanClass = (Class) Utils.toObject(args[0]);
//            returnValue = _encoders.bean(beanClass);
//            // return Utils.javaToJs(returnValue);
//            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
//        }
//    };

    static WrappedFunction F_tuple2 = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("tuple");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            org.apache.spark.sql.Encoder e1 = (org.apache.spark.sql.Encoder) Utils.toObject(args[0]);
            org.apache.spark.sql.Encoder e2 = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            returnValue = _encoders.tuple(e1,e2);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

    static WrappedFunction F_tuple3 = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("tuple");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            org.apache.spark.sql.Encoder e1 = (org.apache.spark.sql.Encoder) Utils.toObject(args[0]);
            org.apache.spark.sql.Encoder e2 = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            org.apache.spark.sql.Encoder e3 = (org.apache.spark.sql.Encoder) Utils.toObject(args[2]);
            returnValue = _encoders.tuple(e1,e2,e3);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

    static WrappedFunction F_tuple4 = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("tuple");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            org.apache.spark.sql.Encoder e1 = (org.apache.spark.sql.Encoder) Utils.toObject(args[0]);
            org.apache.spark.sql.Encoder e2 = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            org.apache.spark.sql.Encoder e3 = (org.apache.spark.sql.Encoder) Utils.toObject(args[2]);
            org.apache.spark.sql.Encoder e4 = (org.apache.spark.sql.Encoder) Utils.toObject(args[3]);
            returnValue = _encoders.tuple(e1,e2,e3,e4);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };

    static WrappedFunction F_tuple5 = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("tuple");
            Object returnValue = null;
            org.apache.spark.sql.Encoders _encoders = (org.apache.spark.sql.Encoders) ((Encoders) thiz).getJavaObject();
            org.apache.spark.sql.Encoder e1 = (org.apache.spark.sql.Encoder) Utils.toObject(args[0]);
            org.apache.spark.sql.Encoder e2 = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            org.apache.spark.sql.Encoder e3 = (org.apache.spark.sql.Encoder) Utils.toObject(args[2]);
            org.apache.spark.sql.Encoder e4 = (org.apache.spark.sql.Encoder) Utils.toObject(args[3]);
            org.apache.spark.sql.Encoder e5 = (org.apache.spark.sql.Encoder) Utils.toObject(args[4]);
            returnValue = _encoders.tuple(e1,e2,e3,e4,e5);
            // return Utils.javaToJs(returnValue);
            return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)returnValue);
        }
    };




    private org.apache.spark.sql.Encoders _encoders;

    public Encoders(org.apache.spark.sql.Encoders _encoders)
    {
        logger.debug("constructor");
        this._encoders = _encoders;
    }

    static public String getModuleName() {
        return "sql.Encoders";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Encoders;
    }

    public Object getJavaObject() {
        return _encoders;
    }

    @Override
    public String toString() {

        return null;//_encoders.toString();
    }

    public String getClassName() {
        return "Encoders";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "BOOLEAN":
                return F_BOOLEAN;
//            case "BYTE":
//                return F_BYTE;
//            case "SHORT":
//                return F_SHORT;
            case "INT":
                return F_INT;
//            case "LONG":
//                return F_LONG;
            case "FLOAT":
               // return F_FLOAT;
            case "DOUBLE":
                return F_DOUBLE;
            case "STRING":
                return F_STRING;
//            case "DECIMAL":
//                return F_DECIMAL;
            case "DATE":
                return F_DATE;
            case "TIMESTAMP":
                return F_TIMESTAMP;
//            case "BINARY":
//                return F_BINARY;
            case "tuple2":
                return F_tuple2;
            case "tuple3":
                return F_tuple3;
            case "tuple4":
                return F_tuple4;
            case "tuple5":
                return F_tuple5;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "BOOLEAN":
//            case "BYTE":
//            case "SHORT":
            case "INT":
//            case "LONG":
            case "FLOAT":
            case "DOUBLE":
            case "STRING":
//            case "DECIMAL":
            case "DATE":
            case "TIMESTAMP":
//            case "BINARY":
            case "tuple2":
            case "tuple3":
            case "tuple4":
            case "tuple5":
                return true;
        }
        return super.hasMember(name);
    }

    //
// static methods
//
    public static Object BOOLEAN( ) {
        logger.debug("BOOLEAN");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.BOOLEAN());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.BOOLEAN());

    }

//    public static Object BYTE( ) {
//        logger.debug("BYTE");
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.BYTE());
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.BYTE());
//
//    }

//    public static Object SHORT( ) {
//        logger.debug("SHORT");
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.SHORT());
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.SHORT());
//
//    }

    public static Object INT( ) {
        logger.debug("INT");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.INT());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.INT());

    }

//    public static Object LONG( ) {
//        logger.debug("LONG");
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.LONG());
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.LONG());
//
//    }

    public static Object FLOAT( ) {
        logger.debug("FLOAT");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.FLOAT());
        //return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.FLOAT());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.DOUBLE());

    }

    public static Object DOUBLE( ) {
        logger.debug("DOUBLE");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.DOUBLE());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.DOUBLE());

    }

    public static Object STRING( ) {
        logger.debug("STRING");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.STRING());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.STRING());

    }

//    public static Object DECIMAL( ) {
//        logger.debug("DECIMAL");
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.DECIMAL());
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.DECIMAL());
//
//    }

    public static Object DATE( ) {
        logger.debug("DATE");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.DATE());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.DATE());

    }

    public static Object TIMESTAMP( ) {
        logger.debug("TIMESTAMP");
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.TIMESTAMP());
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.TIMESTAMP());

    }

//    public static Object BINARY( ) {
//        logger.debug("BINARY");
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.BINARY());
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.BINARY());
//
//    }

//    public static Object bean( Object beanClass) {
//        logger.debug("bean");
//        Class beanClass_uw = (Class) Utils.toObject(beanClass);
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.bean(beanClass_uw));
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.bean(beanClass_uw));
//
//    }


//    public static Object kryo( Object clazz) {
//        logger.debug("kryo");
//        Class clazz_uw = (Class) Utils.toObject(clazz);
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.kryo(clazz_uw));
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.kryo(clazz_uw));
//
//    }

//    public static Object javaSerialization( Object clazz) {
//        logger.debug("javaSerialization");
//        Class clazz_uw = (Class) Utils.toObject(clazz);
////     return Utils.javaToJs(org.apache.spark.sql.Encoders.javaSerialization(clazz_uw));
//        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.javaSerialization(clazz_uw));
//
//    }

    public static Object tuple2( Object e1,Object e2) {
        logger.debug("tuple2");
        org.apache.spark.sql.Encoder e1_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e1);
        org.apache.spark.sql.Encoder e2_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e2);
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw));
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw));

    }

    public static Object tuple3( Object e1,Object e2,Object e3) {
        logger.debug("tuple3");
        org.apache.spark.sql.Encoder e1_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e1);
        org.apache.spark.sql.Encoder e2_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e2);
        org.apache.spark.sql.Encoder e3_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e3);
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw));
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw));

    }

    public static Object tuple4( Object e1,Object e2,Object e3,Object e4) {
        logger.debug("tuple4");
        org.apache.spark.sql.Encoder e1_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e1);
        org.apache.spark.sql.Encoder e2_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e2);
        org.apache.spark.sql.Encoder e3_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e3);
        org.apache.spark.sql.Encoder e4_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e4);
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw));
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw));

    }

    public static Object tuple5( Object e1,Object e2,Object e3,Object e4,Object e5) {
        logger.debug("tuple5");
        org.apache.spark.sql.Encoder e1_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e1);
        org.apache.spark.sql.Encoder e2_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e2);
        org.apache.spark.sql.Encoder e3_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e3);
        org.apache.spark.sql.Encoder e4_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e4);
        org.apache.spark.sql.Encoder e5_uw = (org.apache.spark.sql.Encoder) Utils.toObject(e5);
//     return Utils.javaToJs(org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw,e5_uw));
        return new org.eclairjs.nashorn.wrap.sql.Encoder((org.apache.spark.sql.Encoder)org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw,e5_uw));

    }




}