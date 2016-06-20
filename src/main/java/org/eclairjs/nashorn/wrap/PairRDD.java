package org.eclairjs.nashorn.wrap;


import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.FlatMapFunction2;
import org.apache.spark.storage.StorageLevel;
import org.eclairjs.nashorn.*;

import java.util.List;
import java.util.Map;

public class PairRDD extends RDD {

    static WrappedFunction  F_wrapRDD = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            JavaRDD rdd = (JavaRDD) Utils.jsToJava(args[0]);
            JavaPairRDD sparkPairRDD  = (JavaPairRDD) ((PairRDD)thiz).getJavaObject();
            Object val = sparkPairRDD.wrapRDD(rdd.rdd());
            return Utils.javaToJs(val, null);
        }
    };

    //PairRDD.prototype.wrapRDD = function (rdd) {
    //    var rdd_uw = Utils.unwrapObject(rdd);
    //    var javaObject = this.getJavaObject().wrapRDD(rdd_uw);
    //    return new PairRDD(javaObject);
    //};
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

        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "wrapRDD":

                return true;
        }
        return super.hasMember(name);
    }

}