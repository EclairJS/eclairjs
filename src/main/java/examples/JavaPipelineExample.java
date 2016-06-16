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


// $example on$
import java.util.Arrays;
// $example off$

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
// $example on$
import org.apache.spark.ml.Pipeline;
import org.apache.spark.ml.PipelineModel;
import org.apache.spark.ml.PipelineStage;
import org.apache.spark.ml.classification.LogisticRegression;
import org.apache.spark.ml.feature.HashingTF;
import org.apache.spark.ml.feature.Tokenizer;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.*;
// $example off$


/**
 * Java example for simple text document 'Pipeline'.
 */
public class JavaPipelineExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaPipelineExample").setMaster("local[*]");
        SparkContext sc = new SparkContext(conf);
        SQLContext sqlContext = new SQLContext(sc);

        //long id, String text, double label
        StructType schema = new StructType(new StructField[]{
                new StructField("id", DataTypes.LongType, false, Metadata.empty()),
                new StructField("text", DataTypes.StringType, false, Metadata.empty()),
                new StructField("label", DataTypes.DoubleType, false, Metadata.empty())
        });

        // $example on$
        // Prepare training documents, which are labeled.

/*        DataFrame training = sqlContext.createDataFrame(Arrays.asList(
                new JavaLabeledDocument(0L, "a b c d e spark", 1.0),
                new JavaLabeledDocument(1L, "b d", 0.0),
                new JavaLabeledDocument(2L, "spark f g h", 1.0),
                new JavaLabeledDocument(3L, "hadoop mapreduce", 0.0)
        ), JavaLabeledDocument.class);*/

        DataFrame training = sqlContext.createDataFrame(Arrays.asList(
                RowFactory.create(0L, "a b c d e spark", 1.0),
                RowFactory.create(1L, "b d", 0.0),
                RowFactory.create(2L, "spark f g h", 1.0),
                RowFactory.create(3L, "hadoop mapreduce", 0.0)
        ), schema);

        // Configure an ML pipeline, which consists of three stages: tokenizer, hashingTF, and lr.
        Tokenizer tokenizer = new Tokenizer()
                .setInputCol("text")
                .setOutputCol("words");
        HashingTF hashingTF = new HashingTF()
                .setNumFeatures(1000)
                .setInputCol(tokenizer.getOutputCol())
                .setOutputCol("features");
        LogisticRegression lr = new LogisticRegression()
                .setMaxIter(10)
                .setRegParam(0.01);
        Pipeline pipeline = new Pipeline()
                .setStages(new PipelineStage[] {tokenizer, hashingTF, lr});

        // Fit the pipeline to training documents.
        PipelineModel model = pipeline.fit(training);
        StructType schema2 = new StructType(new StructField[]{
                new StructField("id", DataTypes.LongType, false, Metadata.empty()),
                new StructField("text", DataTypes.StringType, false, Metadata.empty())
        });

        // Prepare test documents, which are unlabeled.
        DataFrame test = sqlContext.createDataFrame(Arrays.asList(
                RowFactory.create(4L, "spark i j k"),
                RowFactory.create(5L, "l m n"),
                RowFactory.create(6L, "mapreduce spark"),
                RowFactory.create(7L, "apache hadoop")
        ), schema2);

        // Make predictions on test documents.
        DataFrame predictions = model.transform(test);
        for (Row r : predictions.select("id", "text", "probability", "prediction").collectAsList()) {
            System.out.println("(" + r.get(0) + ", " + r.get(1) + ") --> prob=" + r.get(2)
                    + ", prediction=" + r.get(3));
        }
        // $example off$

        sc.stop();
    }
}

