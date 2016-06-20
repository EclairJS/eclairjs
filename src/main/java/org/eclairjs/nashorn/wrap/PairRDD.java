package org.eclairjs.nashorn.wrap;


import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.FlatMapFunction2;
import org.apache.spark.storage.StorageLevel;
import org.eclairjs.nashorn.*;
import org.eclairjs.nashorn.wrap.sql.Row;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PairRDD extends RDD {

    static public Object toRDD(Object rdd) {
        JavaPairRDD rdd_uw = (JavaPairRDD) Utils.jsToJava(rdd);
        JavaRDD javaObject = org.apache.spark.api.java.JavaPairRDD.toRDD( rdd_uw).toJavaRDD();
        return  Utils.javaToJs(javaObject);
    }

    static public Object fromRDD(Object rdd) {
        JavaRDD rdd_uw = (JavaRDD) Utils.jsToJava(rdd);
        JavaPairRDD javaObject = org.apache.spark.api.java.JavaPairRDD.fromJavaRDD( rdd_uw);
        return  Utils.javaToJs(javaObject);
    }

    static WrappedFunction  F_wrapRDD = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD rdd = (JavaRDD) Utils.jsToJava(args[0]);
            JavaPairRDD sparkPairRDD  = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkPairRDD.wrapRDD(rdd.rdd());
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_persist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            StorageLevel sl = (StorageLevel) Utils.jsToJava(args[0]);
            JavaPairRDD sparkPairRDD  = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkPairRDD.persist(sl);
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_unpersist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkPairRDD  = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 0) {
                val = sparkPairRDD.unpersist((boolean) args[0]);
            } else {
                val = sparkPairRDD.unpersist();
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_distinct = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkPairRDD  = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 0) {
                val = sparkPairRDD.distinct((int) args[0]);
            } else {
                val = sparkPairRDD.distinct();
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_filter = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.filter(fn);
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_cache = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
           Object val = sparkJavaRDD.cache();
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_coalesce = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            int numPartitions = (int) args[0];
            if (args.length > 1) {
                val = sparkJavaRDD.coalesce(numPartitions, (boolean) args[1]);
            } else {
                val = sparkJavaRDD.coalesce(numPartitions);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_repartition = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.repartition((int) args[0]);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_sample = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            boolean withReplacement = (boolean) args[0];
            double fraction;
            if (args[1] instanceof Integer) {
                fraction = ((Integer) args[1]).doubleValue();
            } else {
                fraction = (double) args[1];
            }
            if (args.length > 2) {
                long seed;
                if (args[2] instanceof Double) {
                    seed = ((Double) args[2]).longValue();
                } else {
                    seed = ((Integer) args[2]).longValue();
                }
                val = sparkJavaRDD.sample(withReplacement, fraction, seed);
            } else {
                val = sparkJavaRDD.sample(withReplacement, fraction);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_sampleByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Map fractions = (Map) Utils.createJavaHashMap(args[1]);
            Object val;
            boolean withReplacement = (boolean) args[0];
            if (args.length > 2) {
                long seed;
                if (args[2] instanceof Double) {
                    seed = ((Double) args[2]).longValue();
                } else {
                    seed = ((Integer) args[2]).longValue();
                }
                val = sparkJavaRDD.sampleByKey(withReplacement, fractions, seed);
            } else {
                val = sparkJavaRDD.sampleByKey(withReplacement, fractions);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_sampleByKeyExact = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Map fractions = (Map) Utils.createJavaHashMap(args[1]);
            Object val;
            boolean withReplacement = (boolean) args[0];
            if (args.length > 2) {
                long seed;
                if (args[2] instanceof Double) {
                    seed = ((Double) args[2]).longValue();
                } else {
                    seed = ((Integer) args[2]).longValue();
                }
                val = sparkJavaRDD.sampleByKeyExact(withReplacement, fractions, seed);
            } else {
                val = sparkJavaRDD.sampleByKeyExact(withReplacement, fractions);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_union = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val = sparkJavaRDD.union(other);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_intersection = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val = sparkJavaRDD.intersection(other);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_first = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.first();

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_combineByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            // FIXME args[3] numPartitions from JavaScript is not used
            if (args.length > 3) {
                bindArgs = args[4];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            JSFunction2 fn2 = (JSFunction2)Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            JSFunction2 fn3 = (JSFunction2)Utils.createLambdaFunction(args[2], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.combineByKey(fn, fn2, fn3);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_reduceByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.reduceByKey(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_reduceByKeyLocally = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.reduceByKeyLocally(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_countByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.countByKey();
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_countByKeyApprox = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.countByKeyApprox((long) args[0], (double) args[1]);
            } else {
                val = sparkJavaRDD.countByKeyApprox((long) args[0]);
            }

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_aggregateByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object zeroValue = Utils.jsToJava(args[0]);
            Object  bindArgs = null;
            if (args.length > 4) {
                bindArgs = args[4];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            JSFunction2 fn2 = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val;
            if (args.length > 3 ) {
                val = sparkJavaRDD.aggregateByKey(zeroValue, (int) args[3], fn, fn2);
            } else {
                val = sparkJavaRDD.aggregateByKey(zeroValue, fn, fn2);
            }

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_foldByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object zeroValue = Utils.jsToJava(args[0]);
            Object  bindArgs = null;
            if (args.length > 4) {
                bindArgs = args[4];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val;
            if (args.length > 3 ) {
                val = sparkJavaRDD.foldByKey(zeroValue, (int) args[3], fn);
            } else {
                val = sparkJavaRDD.foldByKey(zeroValue, fn);
            }

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_groupByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 0 ) {
                val = sparkJavaRDD.groupByKey((int) args[0]);
            } else {
                val = sparkJavaRDD.groupByKey();
            }

            return Utils.javaToJs(val, null);
        }
    };


    static WrappedFunction  F_subtract = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val;
            if (args.length > 1 ) {
                val = sparkJavaRDD.subtract(other, (int) args[1]);
            } else {
                val = sparkJavaRDD.subtract(other);
            }

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_subtractByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val;
            if (args.length > 1 ) {
                val = sparkJavaRDD.subtractByKey(other, (int) args[1]);
            } else {
                val = sparkJavaRDD.subtractByKey(other);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_join = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val = sparkJavaRDD.join(other);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_leftOuterJoin = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val;
            if (args.length > 1) {
               val = sparkJavaRDD.leftOuterJoin(other, (int) args[1]);
            } else {
               val = sparkJavaRDD.leftOuterJoin(other);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_rightOuterJoin = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.rightOuterJoin(other, (int) args[1]);
            } else {
                val = sparkJavaRDD.rightOuterJoin(other);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_fullOuterJoin = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.fullOuterJoin(other, (int) args[1]);
            } else {
                val = sparkJavaRDD.fullOuterJoin(other);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_collectAsMap = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.collectAsMap();

            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_mapValues = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.mapValues(fn);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_flatMapValues = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.flatMapValues(fn);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_cogroup = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            JavaPairRDD other2 = null;
            JavaPairRDD other3 = null;
            if (args.length > 1) {
                other2 = (JavaPairRDD) Utils.jsToJava(args[1]);
            }
            if (args.length > 2) {
                other3 = (JavaPairRDD) Utils.jsToJava(args[2]);
            }
            Object val;
            if (args.length > 3) {
                int numPartitions = (int) args[3];
                if (other3 != null) {
                    val = sparkJavaRDD.cogroup(other, other2, other3, numPartitions);
                } else if (other2 != null) {
                    val = sparkJavaRDD.cogroup(other, other2, numPartitions);
                } else {
                    val = sparkJavaRDD.cogroup(other, numPartitions);
                }
            } else {
                if (other3 != null) {
                    val = sparkJavaRDD.cogroup(other, other2, other3);
                } else if (other2 != null) {
                    val = sparkJavaRDD.cogroup(other, other2);
                } else {
                    val = sparkJavaRDD.cogroup(other);
                }
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_groupWith = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            JavaPairRDD other = (JavaPairRDD) Utils.jsToJava(args[0]);
            JavaPairRDD other2 = null;
            JavaPairRDD other3 = null;
            if (args.length > 1) {
                other2 = (JavaPairRDD) Utils.jsToJava(args[1]);
            }
            if (args.length > 2) {
                other3 = (JavaPairRDD) Utils.jsToJava(args[2]);
            }
            Object val;
            if (other3 != null) {
                val = sparkJavaRDD.groupWith(other, other2, other3);
            } else if (other2 != null) {
                val = sparkJavaRDD.groupWith(other, other2);
            } else {
                val = sparkJavaRDD.groupWith(other);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_lookup = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object key =  Utils.jsToJava(args[0]);

            Object val = sparkJavaRDD.lookup(key);

            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_sortByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.sortByKey((boolean) args[0], (int) args[1]);
            } else {
                val = sparkJavaRDD.sortByKey((boolean) args[0]);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_keys = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.keys();

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_values = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.values();

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_countApproxDistinctByKey = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.countApproxDistinctByKey((double) args[0], (int)args[1]);
            } else {
                val = sparkJavaRDD.countApproxDistinctByKey((double) args[0]);
            }

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_setName = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.setName((String) args[0]);

            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_rdd = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaPairRDD sparkJavaRDD = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.rdd();

            return Utils.javaToJs(val);
        }
    };

    private JavaPairRDD javaPairRDD;

    public PairRDD(JavaPairRDD rdd) {
        javaPairRDD = rdd;
        //super((rdd));
    }

    static public String getModuleName() {
        return "PairRDD";
    }

    @Override
    public Object getJavaObject() {

       return javaPairRDD;
    }

    public String getClassName() {return "PairRDD";}

    public  boolean checkInstance(Object other){ return other instanceof PairRDD;}

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
            case "persist": return F_persist;
            case "unpersist": return F_unpersist;
            case "distinct": return F_distinct;
            case "filter": return F_filter;
            case "cache": return F_cache;
            case "coalesce": return F_coalesce;
            case "repartition": return F_repartition;
            case "sample": return F_sample;
            case "sampleByKey": return F_sampleByKey;
            case "sampleByKeyExact": return F_sampleByKeyExact;
            case "union": return F_union;
            case "intersection": return F_intersection;
            case "first": return F_first;
            case "combineByKey": return F_combineByKey;
            case "reduceByKey": return F_reduceByKey;
            case "reduceByKeyLocally": return F_reduceByKeyLocally;
            case "countByKey": return F_countByKey;
            case "countByKeyApprox": return F_countByKeyApprox;
            case "aggregateByKey": return F_aggregateByKey;
            case "foldByKey": return F_foldByKey;
            case "groupByKey": return F_groupByKey;
            case "subtract": return F_subtract;
            case "subtractByKey": return F_subtractByKey;
            case "join": return F_join;
            case "leftOuterJoin": return F_leftOuterJoin;
            case "rightOuterJoin": return F_rightOuterJoin;
            case "fullOuterJoin": return F_fullOuterJoin;
            case "collectAsMap": return F_collectAsMap;
            case "mapValues": return F_mapValues;
            case "flatMapValues": return F_flatMapValues;
            case "cogroup": return F_cogroup;
            case "groupWith": return F_groupWith;
            case "lookup": return F_lookup;
            case "sortByKey": return F_sortByKey;
            case "keys": return F_keys;
            case "values": return F_values;
            case "countApproxDistinctByKey": return F_countApproxDistinctByKey;
            case "setName": return F_setName;
            case "rdd": return F_rdd;

        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "wrapRDD":
            case "persist":
            case "unpersist":
            case "distinct":
            case "filter":
            case "cache":
            case "coalesce":
            case "repartition":
            case "sample":
            case "sampleByKey":
            case "sampleByKeyExact":
            case "union":
            case "intersection":
            case "first":
            case "combineByKey":
            case "reduceByKey":
            case "reduceByKeyLocally":
            case "countByKey":
            case "countByKeyApprox":
            case "aggregateByKey":
            case "foldByKey":
            case "groupByKey":
            case "subtract":
            case "subtractByKey":
            case "join":
            case "leftOuterJoin":
            case "rightOuterJoin":
            case "fullOuterJoin":
            case "collectAsMap":
            case "mapValues":
            case "flatMapValues":
            case "cogroup":
            case "groupWith":
            case "lookup":
            case "sortByKey":
            case "keys":
            case "values":
            case  "countApproxDistinctByKey":
            case "setName":
            case "rdd":
                return true;
        }
        return super.hasMember(name);
    }

}