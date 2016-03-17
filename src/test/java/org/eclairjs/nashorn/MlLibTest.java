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

import org.junit.Test;
import static org.junit.Assert.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class MlLibTest {

	@Test
    public void LinearRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("LinearRegressionWithSGDExample");
        
        String expected = "[{\"0\":34.802055592544406,\"1\":-0.4307829,\"length\":2}," +
                "{\"0\":32.26369105545771,\"1\":-0.1625189,\"length\":2}," +
                "{\"0\":27.073768640300933,\"1\":-0.1625189,\"length\":2}," +
                "{\"0\":32.956369807610656,\"1\":-0.1625189,\"length\":2}," +
                "{\"0\":26.589176152816094,\"1\":0.3715636,\"length\":2}," +
                "{\"0\":34.161678328568854,\"1\":0.7654678,\"length\":2}," +
                "{\"0\":24.3647041765334,\"1\":0.8544153,\"length\":2}," +
                "{\"0\":26.661937949806784,\"1\":1.2669476,\"length\":2}," +
                "{\"0\":28.790597957841044,\"1\":1.2669476,\"length\":2}," +
                "{\"0\":20.51350661135643,\"1\":1.2669476,\"length\":2}]";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        SparkContext.parallelize([FreqItemset])
        FreqItemset()
        AssociationRules()
        AssociationRules.setMinConfidence()
        AssociationRules.run()
        Rule.antecedent()
        Rule.consequent()
        Rule.confidence()
        RDD.collect()
     */
    @Test
    public void AssociationRulesTest() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("AssociationRulesTest");

        String expected = "[a] => [b], 0.8";
        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
            tests
            Vectors.dense
            BisectingKMeans()
            BisectingKMeans.setK()
            BisectingKMeans.run()
            BisectingKMeansModel()
            BisectingKMeansModel.computeCost()
            BisectingKMeansModel.clusterCenters()
     */
    @Test
    public void BisectingKMeansExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("BisectingKMeansExample");

        String expected = "{\"Compute_Cost\":0.07999999999994545," +
                "\"Cluster_Center_0\":\"[0.2]\",\"Cluster_Center_1\":\"[10.2]\"," +
                "\"Cluster_Center_2\":\"[20.200000000000003]\",\"Cluster_Center_3\":\"[30.200000000000003]\"}";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
    /*
            tests
            MLUtils.loadLibSVMFile()
            RDD.randomSplit()
            DecisionTree.trainClassifier()
            DecisionTreeModel()
            LabeledPoint.getLabel()
            LabeledPoint.getFeatures()

     */
    @Test
    public void DecisionTreeClassificationExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("DecisionTreeClassificationExample");

        String expected = "successful";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
           tests
           MLUtils.loadLibSVMFile()
           RDD.randomSplit()
           DecisionTree.trainRegressor()
           DecisionTreeModel()
           LabeledPoint.getLabel()
           LabeledPoint.getFeatures()

    */
    @Test
    public void DecisionTreeRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("DecisionTreeRegressionExample");

        String expected = "successful";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
           tests
           FPGrowth()
           FPGrowth.setMinSupport()
           FPGrowth.setNumPartitions()
           FPGrowth.run()
           FPGrowthModel()
           FPGrowthModel.freqItemsets()
           FreqItemset()
           FreqItemset.items()
           FreqItemset.freq()
           List()

    */
    @Test
    public void fpGrowthExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("fpGrowthExample");

        String expected = "[{\"freq\":3,\"items\":\"[t]\"},{\"freq\":3,\"items\":\"[t, x]\"},{\"freq\":3,\"items\":\"[t, x, z]\"}]";

        assertEquals("failure - strings are not equal", expected, ret);

    }
    /*
               tests
               MLUtils.loadLibSVMFile()
               RDD.randomSplit()
               BoostingStrategy.defaultParams("Classification")
               BoostingStrategy.setNumIterations()
               BoostingStrategy.getTreeStrategy()
               Strategy.setMaxDepth()
               Strategy.setNumClasses()
               Strategy.setCategoricalFeaturesInfo()
               GradientBoostedTrees.train()
               GradientBoostedTreesModel.predict(Vector)
               GradientBoostedTreesModel.toString()
               GradientBoostedTreesModel.toDebugString()
               GradientBoostedTreesModel.load()
               GradientBoostedTreesModel.save()
               LabeledPoint.getLabel()
               LabeledPoint.getFeatures()

    */
    @Test
    public void GradientBoostingClassificationExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("GradientBoostingClassificationExample");

        String expected = "successful";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
               tests
               MLUtils.loadLibSVMFile()
               RDD.randomSplit()
               BoostingStrategy.defaultParams("Regression")
               BoostingStrategy.setNumIterations()
               BoostingStrategy.getTreeStrategy()
               Strategy.setMaxDepth()
               Strategy.setCategoricalFeaturesInfo()
               GradientBoostedTrees.train()
               GradientBoostedTreesModel.predict(Vector)
               GradientBoostedTreesModel.toString()
               GradientBoostedTreesModel.toDebugString()
               GradientBoostedTreesModel.load()
               GradientBoostedTreesModel.save()
               LabeledPoint.getLabel()
               LabeledPoint.getFeatures()

    */
    @Test
    public void GradientBoostingRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("GradientBoostingRegressionExample");

        String expected = "successful";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
    /*
           tests
           RDD.randomSplit()
           IsotonicRegression()
           IsotonicRegression.setIsotonic()
           IsotonicRegression.run()
           IsotonicRegressionModel()
           IsotonicRegressionModel.predict()
           IsotonicRegressionModel.save()
           IsotonicRegressionModel.load()
           FloatRDD()
           FloatRDD.mean()
           Tuple()
        */
    @Test
    public void IsotonicRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("IsotonicRegressionExample");

        String expected = "{\"meanSquaredError\":0.008860256490591363}";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
        /*
            Tests
            KMeans.train();
            KMeansModel.clusterCenters();
            KMeansModel.computeCost(points);
         */
    @Test
    public void KMeansExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("KMeansExample");

        String expected = "all is good";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        LogisticRegressionWithLBFGS()
        LogisticRegressionWithLBFGS.setNumClasses()
        LogisticRegressionWithLBFGS.run()
        LogisticRegressionWithLBFGSModel.predict()
        BinaryClassificationMetrics()
        BinaryClassificationMetrics.precisionByThreshold()
        BinaryClassificationMetrics.recallByThreshold()
        BinaryClassificationMetrics.fMeasureByThreshold()
        BinaryClassificationMetrics.pr()
     */
    @Test
    public void BinaryClassificationMetricsExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("binaryClassificationMetricsExample");

        String expected = "all is good";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        tests
        MLUtils.loadLibSVMFile()
        MLUtils.appendBias()
        RDD.sample()
        RDD.subtract()
        LBFGS.runLBFGS()
        LogisticGradient()
        SquaredL2Updater()
        LogisticRegressionModel()
        LogisticRegressionModel.clearThreshold()
        BinaryClassificationMetrics()
        BinaryClassificationMetrics.areaUnderROC

     */

    @Test
    public void lbfgsExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("lbfgsExample");

        String expected = "0.5";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        RDD.zipWithIndex()
        PairRDD.fromRDD()
        LDA()
        LDA.setK()
        LDA.run()
        DistributedLDAModel.vocabSize()
        DistributedLDAModel.topicsMatrix()
        DenseMatrix.apply()

     */
    @Test
    public void ldaExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("ldaExample");

        String expected = "11";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        LogisticRegressionWithSGD.train()
        LogisticRegressionModel.weights()
     */

    @Test
    public void lrExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("lrExample");

        String expected = "[0.9550072129824428,0.7533138476702799]";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        LogisticRegressionWithLBFGS()
        LogisticRegressionWithLBFGS.setNumClasses()
        LogisticRegressionWithLBFGS.run(training)
        LogisticRegressionModel.predict()
        LogisticRegressionModel.save()
        LogisticRegressionModel.load()
        MulticlassMetrics()
        MulticlassMetrics.confusionMatrix()
        MulticlassMetrics.precision());
        MulticlassMetrics.recall());
        MulticlassMetrics.fMeasure());
        MulticlassMetrics.weightedPrecision());
        MulticlassMetrics.weightedRecall());
        MulticlassMetrics.weightedFMeasure());
        MulticlassMetrics.weightedFalsePositiveRate());
      */

    @Test
    public void multiclassClassificationMetricsExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("multiclassClassificationMetricsExample");

        String expected = "0.04391931170794093";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        RandomRDDs.normalRDD
        RandomRDDs.normalVectorRDD
     */
    @Test
    public void RandomRDDGenerationExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("RandomRDDGenerationExample");

        String expected = "all is good";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }

    /*
        MultilabelMetrics()
        MultilabelMetrics.recall()
        MultilabelMetrics.precision());
        MultilabelMetrics.f1Measure());
        MultilabelMetrics.accuracy());
        MultilabelMetrics.labels()
        MultilabelMetrics.precision(metrics.labels()[i]));
        MultilabelMetrics.recall(metrics.labels()[i]));
        MultilabelMetrics.f1Measure(metrics.labels()[i]));
        MultilabelMetrics.microRecall());
        MultilabelMetrics.microPrecision());
        MultilabelMetrics.microF1Measure());
        MultilabelMetrics.hammingLoss());
        MultilabelMetrics.subsetAccuracy());
     */

    @Test
    public void multilabelClassificationMetricsExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/mllib/lpsa.data");

        TestUtils.evalJSResource(engine, "/mllib/mllibtest.js");
        Object ret = ((Invocable)engine).invokeFunction("multilabelClassificationMetricsExample");

        String expected = "0.3333333333333333";

        assertEquals("failure - strings are not equal", expected, ret.toString());

    }
}
