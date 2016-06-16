package examples;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.ml.feature.Bucketizer;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaBucketizerExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaBucketizerExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext jsql = new SQLContext(jsc);

        // $example on$
        double[] splits = {Double.NEGATIVE_INFINITY, -0.5, 0.0, 0.5, Double.POSITIVE_INFINITY};

        JavaRDD<Row> data = jsc.parallelize(Arrays.asList(
                RowFactory.create(-0.5),
                RowFactory.create(-0.3),
                RowFactory.create(0.0),
                RowFactory.create(0.2)
        ));
        StructType schema = new StructType(new StructField[]{
                new StructField("features", DataTypes.DoubleType, false, Metadata.empty())
        });
        DataFrame dataFrame = jsql.createDataFrame(data, schema);

        Bucketizer bucketizer = new Bucketizer()
                .setInputCol("features")
                .setOutputCol("bucketedFeatures")
                .setSplits(splits);

        // Transform original data into its bucket index.
        DataFrame bucketedData = bucketizer.transform(dataFrame);
        bucketedData.show();
        // $example off$
        jsc.stop();
    }
}



