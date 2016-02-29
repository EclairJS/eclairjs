/*
 * Copyright 2015 IBM Corp.
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

package org.eclairjs.nashorn;

import java.io.FileReader;
import java.net.URL;
import java.util.Properties;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class SparkBootstrap implements Bootstrap {

    private String debugJSSourceLocation = null;

    public  SparkBootstrap() {
        Properties props = System.getProperties();
        debugJSSourceLocation = (String) props.getProperty("eclairjs.jssource");
    }

    private String getResourceAsURLStirng(String file) {

        String res = null;
        try {
            if (debugJSSourceLocation != null) {
                res = debugJSSourceLocation + file;
            } else {
                res = getClass().getResource(file).toURI().toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public void load(ScriptEngine engine) {
        try {
        	engine.eval("load('" + getResourceAsURLStirng("/JavaWrapper.js") + "');");
        	engine.eval("load('" + getResourceAsURLStirng("/Logger.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Utils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Serialize.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/DebugUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/utils/List.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/utils/Tuple.js") + "');");

        	//spark

        	engine.eval("load('" + getResourceAsURLStirng("/SparkConf.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/SparkContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/RDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/FloatRDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/PairRDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Partitioner.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Accumulators.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/FutureAction.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/SparkStatusTracker.js") + "');");

            // storage
            engine.eval("load('" + getResourceAsURLStirng("/storage/StorageLevel.js") + "');");

            // streaming
            engine.eval("load('" + getResourceAsURLStirng("/streaming/Duration.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/Time.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/StreamingContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/KafkaUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/dstream/DStream.js") + "');");

            //mllib
            engine.eval("load('" + getResourceAsURLStirng("/mllib/linalg/Vectors.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/clustering/BisectingKMeans.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/clustering/BisectingKMeansModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/recommendation/ALS.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/recommendation/MatrixFactorizationModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/IsotonicRegression.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LinearRegressionModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LinearRegressionWithSGD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LabeledPoint.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/util.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/evaluation.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/classification.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/recommendation.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/feature/Word2Vec.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/fpm/FPGrowth.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/fpm/AssociationRules.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/DecisionTree.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/GradientBoostedTrees.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/configuration/Strategy.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/configuration/BoostingStrategy.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/model/DecisionTreeModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/model/treeEnsembleModels.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/tree/loss/Loss.js") + "');");
            //ml
            engine.eval("load('" + getResourceAsURLStirng("/ml/Word2Vec.js") + "');");

            // sql
            engine.eval("load('" + getResourceAsURLStirng("/sql/Column.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrame.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameNaFunctions.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameReader.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameStatFunctions.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameWriter.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/functions.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/GroupedData.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SQLContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SqlDate.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SqlTimestamp.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/Row.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/RowFactory.js") + "');");


            // sql.types
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/DataType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/ArrayType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/BinaryType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/BooleanType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/CalendarIntervalType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/DateType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/NumericType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/DoubleType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/FloatType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/IntegerType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/MapType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/NullType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/StringType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/TimestampType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/Metadata.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/StructField.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/StructType.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/DataTypes.js") + "');");
            NashornEngineSingleton.setEngine(engine);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
