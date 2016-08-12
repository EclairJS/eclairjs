package org.eclairjs.nashorn;/*
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

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.JavaRDD;

import java.util.Arrays;
import java.util.List;

public class TestSpark {
    public static void main(String args[]) {
        SparkConf conf = new SparkConf().setAppName("JavaScript word count");
        JavaSparkContext sc = new JavaSparkContext(conf);

        List<String> data = Arrays.asList("1", "2");
        JavaRDD<String> rdd = sc.parallelize(data);


        System.out.println("rdd value: " + rdd.count());
    }
}
