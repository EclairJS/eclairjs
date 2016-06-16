package examples;


import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.ml.feature.Binarizer;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaBinarizerExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaBinarizerExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext jsql = new SQLContext(jsc);

        // $example on$
        JavaRDD<Row> jrdd = jsc.parallelize(Arrays.asList(
                RowFactory.create(0, 0.1),
                RowFactory.create(1, 0.8),
                RowFactory.create(2, 0.2)
        ));
        StructType schema = new StructType(new StructField[]{
                new StructField("label", DataTypes.DoubleType, false, Metadata.empty()),
                new StructField("feature", DataTypes.DoubleType, false, Metadata.empty())
        });
        DataFrame continuousDataFrame = jsql.createDataFrame(jrdd, schema);
        Binarizer binarizer = new Binarizer()
                .setInputCol("feature")
                .setOutputCol("binarized_feature")
                .setThreshold(0.5);
        DataFrame binarizedDataFrame = binarizer.transform(continuousDataFrame);
        DataFrame binarizedFeatures = binarizedDataFrame.select("binarized_feature");
        for (Row r : binarizedFeatures.collectAsList()) {
            Double binarized_value = r.getDouble(0);
            System.out.println(binarized_value);
        }
        // $example off$
        jsc.stop();
    }
}

