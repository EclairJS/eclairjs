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

import java.util.Properties;

import javax.script.ScriptEngine;

public class SparkBootstrap implements Bootstrap {

    private String debugJSSourceLocation = null;
    private String sparkHome = null;

    public  SparkBootstrap() {
        Properties props = System.getProperties();
        debugJSSourceLocation = (String) props.getProperty("eclairjs.jssource");
        sparkHome = System.getenv().get("SPARK_HOME");
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

    /*
     * If we're on a workernode then SPARK_HOME will be in JAR's path.
     * Note: Commenting out for now as we don't need given that we're only
     * going to load bare essentials for both driver and worker nodes now.
     * Leaving in for now but commented out in case we change our minds.
     */
    /*
    private boolean isLoadingOnWorkerNode() {
        String jarLoc = Utils.jarLoc();
        if (jarLoc != null && sparkHome != null) {
            return jarLoc.indexOf(sparkHome, 0) > -1;
        }
        return false;
    }
    */

    public void load(ScriptEngine engine) {
        try {
            //module loading
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/EclairJS_Globals.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/ModuleUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/jvm-npm/jvm-npm.js") + "');");

            // core
        	engine.eval("load('" + getResourceAsURLStirng("/eclairjs/JavaWrapper.js") + "');");
        	engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Logger.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Utils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Serialize.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/DebugUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/utils/List.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/utils/Tuple.js") + "');");

        	//spark

        	engine.eval("load('" + getResourceAsURLStirng("/eclairjs/SparkConf.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/SparkContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/RDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/FloatRDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/PairRDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Partitioner.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/Accumulators.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/FutureAction.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/SparkStatusTracker.js") + "');");

            // storage
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/storage/StorageLevel.js") + "');");

            // streaming
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/Duration.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/Time.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/StreamingContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/KafkaUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/TwitterUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/dstream/DStream.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/streaming/dstream/PairDStream.js") + "');");

            //mllib

            // Not blindly loading mllib/linalg package any more for master or slave
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/linalg/Vectors.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/linalg/Matrices.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/linalg/SingularValueDecomposition.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/linalg/distributed/DistributedMatrix.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/linalg/distributed/RowMatrix.js") + "');");

            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/BisectingKMeans.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/BisectingKMeansModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/KMeans.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/KMeansModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/LDA.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/LDAModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/clustering/PowerIterationClustering.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/evaluation/BinaryClassificationMetrics.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/evaluation/RankingMetrics.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/evaluation/MulticlassMetrics.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/evaluation/MultilabelMetrics.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/evaluation/RegressionMetrics.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/recommendation/ALS.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/recommendation/MatrixFactorizationModel.js") + "');");

            // Not blindly loading mllib/regression any more for master or slave
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/regression/IsotonicRegression.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/regression/GeneralizedLinearModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/regression/LinearRegressionModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/regression/LinearRegressionWithSGD.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs//mllib/regression/LabeledPoint.js") + "');");

            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/util.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/classification/LogisticRegression.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/classification/ClassificationModel.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/classification/NaiveBayes.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/classification/SVM.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/feature/Word2Vec.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/fpm/FPGrowth.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/fpm/AssociationRules.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/fpm/PrefixSpan.js") + "');");
/*            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/DecisionTree.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/RandomForest.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/GradientBoostedTrees.js") + "');");*/
           /* engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/configuration/Strategy.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/configuration/BoostingStrategy.js") + "');");*/
  /*          engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/model/DecisionTreeModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/model/treeEnsembleModels.js") + "');");*/
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/optimization/LBFGS.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/optimization/Gradient.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/optimization/LogisticGradient.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/optimization/Updater.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/optimization/SquaredL2Updater.js") + "');");
            //engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/tree/loss/Loss.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/mllib/random/RandomRDDs.js") + "');");
            //ml
            engine.eval("load('" + getResourceAsURLStirng("/eclairjs/ml/Word2Vec.js") + "');");

            // sql
           /* engine.eval("load('" + getResourceAsURLStirng("/sql/Column.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrame.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameHolder.js") + "');");
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
            engine.eval("load('" + getResourceAsURLStirng("/sql/RowFactory.js") + "');");*/


            // sql.types
            /*
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
            */
            NashornEngineSingleton.setEngine(engine);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
