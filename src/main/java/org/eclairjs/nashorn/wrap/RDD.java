package org.eclairjs.nashorn.wrap;


import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.api.scripting.ScriptUtils;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDDLike;
import org.apache.spark.api.java.function.FlatMapFunction2;
import org.apache.spark.storage.StorageLevel;
import org.eclairjs.nashorn.*;
import org.apache.spark.api.java.JavaRDD;

import java.util.List;
import java.util.Map;

public class RDD extends WrappedClass {

    static WrappedFunction  F_aggregate = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            Object zeroValue = Utils.jsToJava(args[0]);
            Object bindArgs1 = (args.length > 3) ? args[3] : null;
            Object bindArgs2 = (args.length > 4) ? args[4] : null;
            JSFunction2 fn1 = (JSFunction2) Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFunction2", bindArgs1);
            JSFunction2 fn2 = (JSFunction2) Utils.createLambdaFunction(args[2], "org.eclairjs.nashorn.JSFunction2", bindArgs2);
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.aggregate(zeroValue, fn1, fn2);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_cache = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
           JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.cache();
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_cartesian = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            Object other = Utils.jsToJava(args[0]);
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.cartesian((JavaRDD) other);
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_checkpoint = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            sparkJavaRDD.checkpoint();
            return null;

        }
    };

    static WrappedFunction  F_coalesce = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            int numPartitions = (int) args[0];
            boolean shuffle = (boolean) args[1];
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.coalesce(numPartitions, shuffle);
            return Utils.javaToJs(val, null);

        }
    };

    static WrappedFunction  F_collect = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
//            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
//            Object val = sparkJavaRDD.collect();
//            return Utils.createJavaScriptObject(val);
            return ((RDD)thiz).collect();

        }
    };

    static WrappedFunction  F_context = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.context();
            return Utils.createJavaScriptObject(val);

        }
    };

    static WrappedFunction  F_count = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            return  sparkJavaRDD.count();

        }
    };

    static WrappedFunction  F_countApprox = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.countApprox((long) args[0], (double) args[1]);
            //return new PartialResult(val);
            return Utils.createJavaScriptObject(val);

        }
    };

    static WrappedFunction  F_countApproxDistinct = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.countApproxDistinct(Utils.toDouble(args[0]));

            return val;

        }
    };

    static WrappedFunction  F_countByValueApprox = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.countByValueApprox(Utils.toLong(args[0]), Utils.toDouble(args[1]));
            return Utils.createJavaScriptObject(val);

        }
    };

    static WrappedFunction  F_distinct = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object val;
            if (args.length > 0) {
                val = sparkJavaRDD.distinct(Utils.toInt(args[0]));
            } else {
                val = sparkJavaRDD.distinct();
            }

            return Utils.javaToJs(val, null);

        }
    };

    static WrappedFunction  F_filter = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.filter(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_first = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.first();
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_flatMap = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFlatMapFunction fn = (JSFlatMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFlatMapFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.flatMap(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_flatMapToPair = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSPairFlatMapFunction fn = (JSPairFlatMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSPairFlatMapFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.flatMapToPair(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_fold = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            Object zeroValue = Utils.jsToJava(args[0]);
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSFunction2 fn1 = (JSFunction2)Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.fold(zeroValue, fn1);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_foreach = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSVoidFunction fn = (JSVoidFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSVoidFunction", sparkJavaRDD.context(), bindArgs);
            sparkJavaRDD.foreach(fn);
            return null;
        }
    };

    static WrappedFunction  F_foreachPartition = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSVoidFunction fn = (JSVoidFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSVoidFunction", sparkJavaRDD.context(), bindArgs);
            sparkJavaRDD.foreachPartition(fn);
            return null;
        }
    };

    static WrappedFunction  F_getCheckpointFile = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.getCheckpointFile();
            return val;
        }
    };

    static WrappedFunction  F_getStorageLevel = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.getStorageLevel();
            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_glom = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object val = sparkJavaRDD.glom();
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_groupBy = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val;
            if (args.length > 1) {
                val = sparkJavaRDD.groupBy(fn, Utils.toInt(args[1]));
            } else {
                val = sparkJavaRDD.groupBy(fn);
            }
           return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_id = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD) thiz).getJavaObject();
            return sparkJavaRDD.id();
        }
    };

    static WrappedFunction  F_intersection = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD other = (JavaRDD) Utils.jsToJava(args[0]);
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object val =  sparkJavaRDD.intersection(other);

            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_isCheckpointed = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            return sparkJavaRDD.isCheckpointed();
        }
    };

    static WrappedFunction  F_isEmpty = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            return sparkJavaRDD.isEmpty();
        }
    };

    static WrappedFunction  F_keyBy = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.keyBy(fn);
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_map = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.map(fn);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_mapPartitions = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSFlatMapFunction fn = (JSFlatMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFlatMapFunction", sparkJavaRDD.context(), bindArgs);
            Object val;
            if (args.length > 1 && args[1] != null) {
                val = sparkJavaRDD.mapPartitions(fn, (boolean) args[1]);
            } else {
                val = sparkJavaRDD.mapPartitions(fn);
            }
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_mapPartitionsWithIndex = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.mapPartitionsWithIndex(fn, (boolean) args[1]);
            return Utils.javaToJs(val, null);
        }
    };

    static WrappedFunction  F_mapToPair = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSPairFunction fn = (JSPairFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSPairFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.mapToPair(fn);
            return Utils.javaToJs(val);
        }
    };

    static WrappedFunction  F_mapToFloat = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSDoubleFunction fn = (JSDoubleFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSDoubleFunction", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.mapToDouble(fn);
            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_max = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSComparator fn = (JSComparator)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSComparator", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.max(fn);
            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_min = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSComparator fn = (JSComparator)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSComparator", sparkJavaRDD.context(), bindArgs);
            Object val = sparkJavaRDD.min(fn);
            return Utils.createJavaScriptObject(val);
        }
    };

    static WrappedFunction  F_name = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            return sparkJavaRDD.name();
        }
    };

    static WrappedFunction  F_persist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object newLevel = Utils.jsToJava(args[0]);
            return Utils.createJavaScriptObject(sparkJavaRDD.persist((StorageLevel) newLevel));
        }
    };

    static WrappedFunction  F_pipe = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            JavaRDD result;
            if (args[0] instanceof String) {
                result = sparkJavaRDD.pipe((String)args[0]);
            } else {
                List cmd = (List) Utils.jsToJava(args[0]);
                if (args[1] != null) {
                    Map env = (Map) Utils.jsToJava(args[1]);
                    result = sparkJavaRDD.pipe(cmd, env);
                } else {
                    result = sparkJavaRDD.pipe(cmd);
                }
            }
            return Utils.javaToJs(result, null);
        }
    };

    static WrappedFunction  F_randomSplit = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result[];

            double weights[] = (double[]) ScriptUtils.convert(args[0], double[].class);
            if (args.length > 1) {
                result = sparkJavaRDD.randomSplit(weights, Utils.toLong(args[1]));
            } else {
                result = sparkJavaRDD.randomSplit(weights);
            }

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_reduce = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSFunction2 fn = (JSFunction2)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object result = sparkJavaRDD.reduce(fn);

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_repartition = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result = sparkJavaRDD.repartition(Utils.toInt(args[0]));

            return Utils.javaToJs(result, null);
        }
    };

    static WrappedFunction  F_sample = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result;
            if (args.length < 3) {
                result = sparkJavaRDD.sample((boolean) args[0], Utils.toDouble(args[1]));
            } else {
                result = sparkJavaRDD.sample((boolean) args[0], Utils.toDouble(args[1]), Utils.toLong(args[2]));
            }


            return Utils.javaToJs(result, null);
        }
    };

    static WrappedFunction  F_saveAsObjectFile = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            sparkJavaRDD.saveAsObjectFile((String) args[0]);

            return null;
        }
    };

    static WrappedFunction  F_saveAsTextFile = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            sparkJavaRDD.saveAsTextFile((String) args[0]);

            return null;
        }
    };

    static WrappedFunction  F_setName = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result = sparkJavaRDD.setName((String) args[0]);

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_sortBy = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 3) {
                bindArgs = args[3];
            }
            JSFunction fn = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", sparkJavaRDD.context(), bindArgs);
            JavaRDD result = sparkJavaRDD.sortBy(fn, (boolean) args[1], Utils.toInt(args[2]));

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_sparkContext = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            SparkContext result = sparkJavaRDD.rdd().sparkContext();

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_subtract = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD other = (JavaRDD) Utils.jsToJava(args[0]);
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result;
            if (args.length > 1) {
                result = sparkJavaRDD.subtract(other, Utils.toInt(args[1]));
            } else {
                result = sparkJavaRDD.subtract(other);
            }

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_take = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            List result = sparkJavaRDD.take(Utils.toInt(args[0]));

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_takeOrdered = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            List result;
            if (args[1] != null) {
                Object  bindArgs = null;
                if (args.length > 2) {
                    bindArgs = args[2];
                }
                JSComparator fn = (JSComparator) Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSComparator", sparkJavaRDD.context(), bindArgs);
                result = sparkJavaRDD.takeOrdered(Utils.toInt(args[0]), fn);
            } else {
                result = sparkJavaRDD.takeOrdered(Utils.toInt(args[0]));
            }

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_takeSample = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            List result;
            if (args.length < 3) {
                result = sparkJavaRDD.takeSample((boolean) args[0], Utils.toInt(args[1]));
            } else {
                result = sparkJavaRDD.takeSample((boolean) args[0], Utils.toInt(args[1]), Utils.toLong(args[2]));
            }

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_toArray = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object result = sparkJavaRDD.toArray();

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_toDebugString= new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            String r = sparkJavaRDD.toDebugString();

            return r;
        }
    };

    static WrappedFunction  F_top = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            List result = sparkJavaRDD.top(Utils.toInt(args[0]));

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_treeAggregate = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object zeroValue = Utils.jsToJava(args[0]);
            Object  bindArgs = null;
            if (args.length > 3) {
                bindArgs = args[3];
            }
            JSFunction2 fn = (JSFunction2) Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object  bindArgs2 = null;
            if (args.length > 4) {
                bindArgs2 = args[4];
            }
            JSFunction2 fn2 = (JSFunction2) Utils.createLambdaFunction(args[2], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs2);
            Object result = sparkJavaRDD.treeAggregate(zeroValue, fn, fn2);

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_treeReduce = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSFunction2 fn = (JSFunction2) Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction2", sparkJavaRDD.context(), bindArgs);
            Object result = sparkJavaRDD.treeReduce(fn, Utils.toInt(args[1]));

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_union = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD other = (JavaRDD) Utils.jsToJava(args[0]);
            JavaRDD result = sparkJavaRDD.union(other);

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_unpersist = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD sparkJavaRDD = (JavaRDD) ((RDD)thiz).getJavaObject();
            JavaRDD result = sparkJavaRDD.unpersist((boolean) args[0]);

            return Utils.javaToJs(result);
        }
    };

    static WrappedFunction  F_zip = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            JavaRDD other = (JavaRDD) Utils.jsToJava(args[0]);
            JavaPairRDD result = sparkJavaRDD.zip(other);

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_zipPartitions = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            JavaRDDLike other = (JavaRDDLike) Utils.jsToJava(args[0]);
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            FlatMapFunction2 fn = (FlatMapFunction2) Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFlatMapFunction2", sparkJavaRDD.context(), bindArgs);
            JavaRDD result = sparkJavaRDD.zipPartitions(other, fn);

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_zipWithIndex = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            JavaPairRDD result = sparkJavaRDD.zipWithIndex();

            return Utils.createJavaScriptObject(result);
        }
    };

    static WrappedFunction  F_zipWithUniqueId = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDDLike sparkJavaRDD = (JavaRDDLike) ((RDD)thiz).getJavaObject();
            JavaPairRDD result = sparkJavaRDD.zipWithUniqueId();

            return Utils.createJavaScriptObject(result);
        }
    };

    private JavaRDD javaRDD;

    public RDD(JavaRDD rdd) {
        javaRDD = rdd;
    }
    public RDD() {};

    static public String getModuleName() {
        return "RDD";
    }

    public Object getJavaObject() {
       return javaRDD;
    }

    public String getClassName() {return "RDD";}

    public  boolean checkInstance(Object other){ return other instanceof RDD;}

    @Override
    public String toJSON() {
        return Utils.JsonStringify(javaRDD.collect());
    }

    public Object collect() {
        JavaRDDLike sparkJavaRDD = (JavaRDDLike) getJavaObject();
        Object result = sparkJavaRDD.collect();
        Object x = Utils.createJavaScriptObject(result);
        return x;
    }
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
            case "aggregate": return F_aggregate;
            case "cache": return F_cache;
            case "cartesian": return F_cartesian;
            case "checkpoint": return F_checkpoint;
            case "coalesce": return F_coalesce;
            case "collect": return F_collect;
            case "context": return F_context;
            case "count": return F_count;
            case "countApprox": return F_countApprox;
            case "countApproxDistinct": return F_countApproxDistinct;
            case "countByValueApprox": return F_countByValueApprox;
            case "distinct": return F_distinct;
            case "filter": return F_filter;
            case "first": return F_first;
            case "flatMap": return F_flatMap;
            case "flatMapToPair": return F_flatMapToPair;
            case "fold": return F_fold;
            case "foreach": return F_foreach;
            case "foreachPartition": return F_foreachPartition;
            case "getCheckpointFile": return F_getCheckpointFile;
            case "getStorageLevel": return F_getStorageLevel;
            case "glom": return F_glom;
            case "groupBy": return F_groupBy;
            case "id": return F_id;
            case "intersection": return F_intersection;
            case "isCheckpointed": return F_isCheckpointed;
            case "isEmpty": return F_isEmpty;
            case "keyBy": return F_keyBy;
            case "map": return F_map;
            case "mapPartitions": return F_mapPartitions;
            case "mapPartitionsWithIndex": return F_mapPartitionsWithIndex;
            case "mapToPair": return F_mapToPair;
            case "mapToFloat": return F_mapToFloat;
            case "max": return F_max;
            case "min": return F_min;
            case "name": return F_name;
            case "persist": return F_persist;
            case "pipe": return F_pipe;
            case "randomSplit": return F_randomSplit;
            case "reduce": return F_reduce;
            case "repartition": return F_repartition;
            case "sample": return F_sample;
            case "saveAsObjectFile": return F_saveAsObjectFile;
            case "saveAsTextFile": return F_saveAsTextFile;
            case "setName": return F_setName;
            case "sortBy": return F_sortBy;
            case "sparkContext": return F_sparkContext;
            case "subtract": return F_subtract;
            case "take": return F_take;
            case "takeOrdered": return F_takeOrdered;
            case "takeSample": return F_takeSample;
            case "toArray": return F_toArray;
            case "toDebugString": return F_toDebugString;
            case "top": return F_top;
            case "treeAggregate": return F_treeAggregate;
            case "treeReduce": return F_treeReduce;
            case "union": return F_union;
            case "unpersist": return F_unpersist;
            case "zip": return F_zip;
            case "zipPartitions": return F_zipPartitions;
            case "zipWithIndex": return F_zipWithIndex;
            case "zipWithUniqueId": return F_zipWithUniqueId;
        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "aggregate":
            case "cache":
            case "cartesian":
            case "checkpoint":
            case "coalesce":
            case "collect":
            case "context":
            case "count":
            case "countApprox":
            case "countApproxDistinct":
            case "countByValueApprox":
            case "distinct":
            case "filter":
            case "first":
            case "flatMap":
            case "flatMapToPair":
            case "fold":
            case "foreach":
            case "foreachPartition":
            case "getCheckpointFile":
            case "getStorageLevel":
            case "glom":
            case "groupBy":
            case "id":
            case "intersection":
            case "isCheckpointed":
            case "isEmpty":
            case "keyBy":
            case "map":
            case "mapPartitions":
            case "mapPartitionsWithIndex":
            case "mapToPair":
            case "mapToFloat":
            case "max":
            case "min":
            case "name":
            case "persist":
            case "pipe":
            case "randomSplit":
            case "reduce":
            case "repartition":
            case "sample":
            case "saveAsObjectFile":
            case "saveAsTextFile":
            case "setName":
            case "sortBy":
            case "sparkContext":
            case "subtract":
            case "take":
            case "takeOrdered":
            case "takeSample":
            case "toArray":
            case "toDebugString":
            case "top":
            case "treeAggregate":
            case "treeReduce":
            case "union":
            case "unpersist":
            case "zip":
            case "zipPartitions":
            case "zipWithIndex":
            case "zipWithUniqueId":
                return true;
        }
        return super.hasMember(name);
    }

}