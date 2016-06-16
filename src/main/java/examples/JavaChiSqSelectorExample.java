package examples;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;

import org.apache.spark.ml.feature.ChiSqSelector;
import org.apache.spark.mllib.linalg.VectorUDT;
import org.apache.spark.mllib.linalg.Vectors;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaChiSqSelectorExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaChiSqSelectorExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext sqlContext = new SQLContext(jsc);

        // $example on$
        JavaRDD<Row> jrdd = jsc.parallelize(Arrays.asList(
                RowFactory.create(7, Vectors.dense(0.0, 0.0, 18.0, 1.0), 1.0),
                RowFactory.create(8, Vectors.dense(0.0, 1.0, 12.0, 0.0), 0.0),
                RowFactory.create(9, Vectors.dense(1.0, 0.0, 15.0, 0.1), 0.0)
        ));
        StructType schema = new StructType(new StructField[]{
                new StructField("id", DataTypes.IntegerType, false, Metadata.empty()),
                new StructField("features", new VectorUDT(), false, Metadata.empty()),
                new StructField("clicked", DataTypes.DoubleType, false, Metadata.empty())
        });

        DataFrame df = sqlContext.createDataFrame(jrdd, schema);

        ChiSqSelector selector = new ChiSqSelector()
                .setNumTopFeatures(1)
                .setFeaturesCol("features")
                .setLabelCol("clicked")
                .setOutputCol("selectedFeatures");

        DataFrame result = selector.fit(df).transform(df);
        result.show();
        // $example off$
        jsc.stop();
    }
}

