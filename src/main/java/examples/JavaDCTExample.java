package examples;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.ml.feature.DCT;
import org.apache.spark.mllib.linalg.VectorUDT;
import org.apache.spark.mllib.linalg.Vectors;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaDCTExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaDCTExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext jsql = new SQLContext(jsc);

        // $example on$
        JavaRDD<Row> data = jsc.parallelize(Arrays.asList(
                RowFactory.create(Vectors.dense(0.0, 1.0, -2.0, 3.0)),
                RowFactory.create(Vectors.dense(-1.0, 2.0, 4.0, -7.0)),
                RowFactory.create(Vectors.dense(14.0, -2.0, -5.0, 1.0))
        ));
        StructType schema = new StructType(new StructField[]{
                new StructField("features", new VectorUDT(), false, Metadata.empty()),
        });
        DataFrame df = jsql.createDataFrame(data, schema);
        DCT dct = new DCT()
                .setInputCol("features")
                .setOutputCol("featuresDCT")
                .setInverse(false);
        DataFrame dctDf = dct.transform(df);
        dctDf.select("featuresDCT").show(3);
        // $example off$
        jsc.stop();
    }
}

