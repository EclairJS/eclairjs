package examples;/*
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
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.ml.feature.OneHotEncoder;
import org.apache.spark.ml.feature.StringIndexer;
import org.apache.spark.ml.feature.StringIndexerModel;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaOneHotEncoderExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaOneHotEncoderExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext sqlContext = new SQLContext(jsc);

        // $example on$
        JavaRDD<Row> jrdd = jsc.parallelize(Arrays.asList(
                RowFactory.create(0.0, "a"),
                RowFactory.create(1.0, "b"),
                RowFactory.create(2.0, "c"),
                RowFactory.create(3.0, "a"),
                RowFactory.create(4.0, "a"),
                RowFactory.create(5.0, "c")
        ));

        StructType schema = new StructType(new StructField[]{
                new StructField("id", DataTypes.DoubleType, false, Metadata.empty()),
                new StructField("category", DataTypes.StringType, false, Metadata.empty())
        });

        DataFrame df = sqlContext.createDataFrame(jrdd, schema);

        StringIndexerModel indexer = new StringIndexer()
                .setInputCol("category")
                .setOutputCol("categoryIndex")
                .fit(df);
        DataFrame indexed = indexer.transform(df);

        OneHotEncoder encoder = new OneHotEncoder()
                .setInputCol("categoryIndex")
                .setOutputCol("categoryVec");
        DataFrame encoded = encoder.transform(indexed);
        encoded.select("id", "categoryVec").show();
        // $example off$
        jsc.stop();
    }
}

