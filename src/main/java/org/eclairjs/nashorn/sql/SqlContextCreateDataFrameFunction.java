package org.eclairjs.nashorn.sql;


import org.apache.spark.api.java.function.Function;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.RowFactory;
import org.apache.spark.sql.types.IntegerType;
import org.apache.spark.sql.types.FloatType;
import org.apache.spark.sql.types.StructType;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.DataType;

import java.util.ArrayList;
/*
Called from SQLContext.createDataFrame to ensure that the Numbers from JavaScript are mapped to the correct
Java type based on the schema
 */
public class SqlContextCreateDataFrameFunction implements Function {
    StructType scheam;
    public SqlContextCreateDataFrameFunction(Object s) {
        this.scheam = (StructType) s;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override

    public Object call(Object o) throws Exception {
        ArrayList a = new ArrayList();
        Row row = (Row) o;
        StructField[] fields = this.scheam.fields();
        for (int i = 0; i < row.length(); i++) {
            Object f = row.get(i);
            DataType dt = fields[i].dataType();
            /*
             Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed
             So we need to force the "Number" from Nashorn to the correct type based on the schema.
             JavaScript parseInt returns a java.lang.Double and that seems to be the only java type we will need to convert.
             */
            if ((f instanceof Double) && (dt instanceof IntegerType)) {
                f = ((Double) f).intValue();
            } else if ((f instanceof Double) && (dt instanceof FloatType)) {
                f = ((Double) f).floatValue();
            }
            a.add(f);
        }

        Row r =  RowFactory.create(a.toArray());

        return r;
    }

}
