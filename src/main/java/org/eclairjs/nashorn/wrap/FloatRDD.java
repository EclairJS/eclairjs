package org.eclairjs.nashorn.wrap;


import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.api.scripting.ScriptUtils;
import org.apache.spark.api.java.JavaDoubleRDD;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaRDDLike;
import org.apache.spark.storage.StorageLevel;
import org.eclairjs.nashorn.JSFunction;
import org.eclairjs.nashorn.JSFunction2;
import org.eclairjs.nashorn.Utils;

import java.util.Map;

public class FloatRDD extends RDD {

    static public Object toRDD(Object rdd) {
        JavaDoubleRDD rdd_uw = (JavaDoubleRDD) Utils.jsToJava(rdd);
        JavaRDD javaObject = org.apache.spark.api.java.JavaDoubleRDD.toRDD( rdd_uw).toJavaRDD();
        return  Utils.javaToJs(javaObject);
    }

    static public Object fromRDD(Object rdd) {
        JavaRDD rdd_uw = (JavaRDD) Utils.jsToJava(rdd);
        JavaDoubleRDD javaObject = org.apache.spark.api.java.JavaDoubleRDD.fromRDD(rdd_uw.rdd());
        return  Utils.javaToJs(javaObject);
    }

    static WrappedFunction  F_wrapRDD = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD rdd = (JavaRDD) Utils.jsToJava(args[0]);
            JavaDoubleRDD sparkPairRDD  = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val = sparkPairRDD.wrapRDD(rdd.rdd());
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_cache = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.cache();
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_persist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object newLevel = Utils.jsToJava(args[0]);
            return Utils.createJavaScriptObject(sparkJavaRDD.persist((StorageLevel) newLevel));
        }
    };

    static WrappedFunction  F_unpersist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD result = sparkJavaRDD.unpersist((boolean) args[0]);

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_distinct = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 0) {
                val = sparkJavaRDD.distinct((int) args[0]);
            } else {
                val = sparkJavaRDD.distinct();
            }

            return Utils.javaToJs(val, null);

        }
    };

    static WrappedFunction  F_filter = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.filter(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_coalesce = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int numPartitions = (int) args[0];
            boolean shuffle = (boolean) args[1];
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.coalesce(numPartitions, shuffle);
            return Utils.javaToJs(val, null);

        }
    };


    static WrappedFunction  F_repartition = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD result = sparkJavaRDD.repartition(((int) args[0]));

            return Utils.javaToJs(result, null);
        }
    };

    static WrappedFunction  F_subtract = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD other = (JavaDoubleRDD) Utils.jsToJava(args[0]);
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD result;
            if (args.length > 1) {
                result = sparkJavaRDD.subtract(other, (int) args[1]);
            } else {
                result = sparkJavaRDD.subtract(other);
            }

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_sample = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD result = sparkJavaRDD.sample((boolean) args[0], (double) args[1], (long) args[2]);

            return Utils.javaToJs(result, null);
        }
    };

    static WrappedFunction  F_union = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD other = (JavaDoubleRDD) Utils.jsToJava(args[0]);
            JavaDoubleRDD result = sparkJavaRDD.union(other);

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_intersection = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD other = (JavaDoubleRDD) Utils.jsToJava(args[0]);
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.intersection(other);

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_sum = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.sum();

            return val;
        }
    };

    static WrappedFunction  F_min = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.min();

            return val;
        }
    };

    static WrappedFunction  F_max = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.max();

            return val;
        }
    };

    static WrappedFunction  F_stats = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.stats();

            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_mean = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.mean();

            return val;
        }
    };

    static WrappedFunction  F_variance = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.variance();

            return val;
        }
    };

    static WrappedFunction  F_stdev = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.stdev();

            return val;
        }
    };

    static WrappedFunction  F_sampleStdev = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.sampleStdev();

            return val;
        }
    };

    static WrappedFunction  F_sampleVariance = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.sampleVariance();

            return val;
        }
    };

    static WrappedFunction  F_meanApprox = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            long timeout = ((Integer) args[0]).longValue();
            Object val;
            if (args.length > 1) {
                double confidence = (Double) args[1];
                val =  sparkJavaRDD.meanApprox(timeout, confidence);
            } else {
                val =  sparkJavaRDD.meanApprox(timeout);
            }

            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_sumApprox = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            long timeout = ((Integer) args[0]).longValue();
            Object val;
            if (args.length > 1) {
                double confidence = (Double) args[1];
                val =  sparkJavaRDD.sumApprox(timeout, confidence);
            } else {
                val =  sparkJavaRDD.sumApprox(timeout);
            }

            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_histogram = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            Object val;
            ScriptObjectMirror buckets = (ScriptObjectMirror) args[0];
            if (buckets.isArray()) {
                if (args.length > 1) {
                    Double[] bucketsArray = (Double[]) ScriptUtils.convert(buckets, Double[].class);
                    val =  sparkJavaRDD.histogram(bucketsArray, (boolean) args[1]);
                } else {
                    double[] bucketsArray = (double[]) ScriptUtils.convert(buckets, double[].class);
                    val =  sparkJavaRDD.histogram(bucketsArray);
                }
            } else {
                val =  sparkJavaRDD.histogram( buckets.to(Integer.class));
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_setName = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaDoubleRDD sparkJavaRDD = (JavaDoubleRDD) ((FloatRDD)thiz).getJavaObject();
            JavaDoubleRDD result = sparkJavaRDD.setName((String) args[0]);

            return Utils.javaToJs(result);
        }
    };

    private JavaDoubleRDD javaDoubleRDD;

    public FloatRDD(JavaDoubleRDD rdd) {
        javaDoubleRDD = rdd;
        //super((rdd));
    }

    static public String getModuleName() {
        return "FloatRDD";
    }

    @Override
    public Object getJavaObject() {

       return javaDoubleRDD;
    }

    public String getClassName() {return "FloatRDD";}

    public  boolean checkInstance(Object other){ return other instanceof FloatRDD;}

//    @Override
//    public String toJSON() {
//        return Utils.JsonStringify(javaRDD.collect());
//    }
/*
    @Override
    public String toString() {
        return "(" + _1 + "," + _2 + ")" ;
    }
*/

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "wrapRDD": return F_wrapRDD;
            case "cache": return F_cache;
            case "persist": return F_persist;
            case "unpersist": return F_unpersist;
            case "distinct": return F_distinct;
            case "filter": return F_filter;
            case "coalesce": return F_coalesce;
            case "repartition": return F_repartition;
            case "subtract": return F_subtract;
            case "sample": return F_sample;
            case "union": return F_union;
            case "intersection": return F_intersection;
            case "sum": return F_sum;
            case "min": return F_min;
            case "max": return F_max;
            case "stats": return F_stats;
            case "mean": return F_mean;
            case "variance": return F_variance;
            case "stdev": return F_stdev;
            case "sampleStdev": return F_sampleStdev;
            case "sampleVariance": return F_sampleVariance;
            case "meanApprox": return F_meanApprox;
            case "sumApprox": return F_sumApprox;
            case "histogram": return F_histogram;
            case "setName": return F_setName;


        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "wrapRDD":
            case "cache":
            case "persist":
            case "unpersist":
            case "distinct":
            case "filter":
            case "coalesce":
            case "repartition":
            case "subtract":
            case "sample":
            case "union":
            case "intersection":
            case "sum":
            case "min":
            case "max":
            case "stats":
            case "mean":
            case "variance":
            case "stdev":
            case "sampleStdev":
            case "sampleVariance":
            case "meanApprox":
            case "sumApprox":
            case "histogram":
            case "setName":

                return true;
        }
        return super.hasMember(name);
    }

}