package org.eclairjs.nashorn;

import org.apache.spark.api.java.JavaSparkContext;

public class TestKernel {

    private JavaSparkContext sc = null;

    public TestKernel() {
        this.sc = new JavaSparkContext("local[*]", "testapp");
    }

    public JavaSparkContext javaSparkContext() {
        return this.sc;
    }
}

