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

import javax.script.Invocable;
import javax.script.ScriptEngine;

import static org.junit.Assert.assertEquals;

public class MlTest {

    /*
        tests
        Word2Vec()
        Word2Vec.setInputCol("text")
        Word2Vec.setOutputCol("result")
        Word2Vec.setVectorSize(3)
        Word2Vec.setMinCount(0)
        Word2Vec.fit(documentDF)
        Word2VecModel.transform()
     */
	@Test
    public void Word2VecExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("Word2VecExample");
        
        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        AFTSurvivalRegression()
        AFTSurvivalRegression.setQuantileProbabilities(quantileProbabilities)
        AFTSurvivalRegression.setQuantilesCol("quantiles");
        AFTSurvivalRegression.fit(training);
        AFTSurvivalRegressionModel.censorCol();
        AFTSurvivalRegressionModel.transform(training);
     */
    @Test
    public void AFTSurvivalRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("AFTSurvivalRegressionExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        ALS()
        ALS.setMaxIter(5)
        ALS.setRegParam(0.01)
        ALS.setUserCol("userId")
        ALS.setItemCol("movieId")
        ALS.setRatingCol("rating");
        ALS.fit(training);
        ALSModel.transform(test)
        RegressionEvaluator()
        RegressionEvaluator.setMetricName("rmse")
        RegressionEvaluator.setLabelCol("rating")
        RegressionEvaluator.setPredictionCol("prediction");
        RegressionEvaluator.evaluate(DataFrame);
     */
    @Test
    public void ALSExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("ALSExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        Binarizer()
        Binarizer.setInputCol("feature")
        Binarizer.setOutputCol("binarized_feature")
        Binarizer.setThreshold(0.5);
        Binarizer.transform(DataFrame)
     */
    @Test
    public void BinarizerExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("BinarizerExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"binarized_feature\",\"dataType\":\"double\",\"nullable\":true}" +
                            "]" +
                        "}";
        String expected = "[" +
                "{\"values\":[0]," +
                "\"schema\":"+schema+"}," +
                "{\"values\":[1]," +
                "\"schema\":"+schema+"}," +
                "{\"values\":[0]," +
                "\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        Bucketizer()
        Bucketizer.setInputCol("features")
        Bucketizer.setOutputCol("bucketedFeatures")
        Bucketizer.setSplits(splits);
        Bucketizer.transform(dataFrame);
     */
    @Test
    public void BucketizerExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("BucketizerExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"features\",\"dataType\":\"double\",\"nullable\":false}," +
                                "{\"name\":\"bucketedFeatures\",\"dataType\":\"double\",\"nullable\":true}" +
                            "]" +
                        "}";
        String expected = "[" +
                "{\"values\":[-0.5,1],\"schema\":"+schema+"}," +
                "{\"values\":[-0.3,1],\"schema\":"+schema+"}," +
                "{\"values\":[0,2],\"schema\":"+schema+"}," +
                "{\"values\":[0.2,2],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        ChiSqSelector()
        ChiSqSelector.setNumTopFeatures(1)
        ChiSqSelector.setFeaturesCol("features")
        ChiSqSelector.setLabelCol("clicked")
        ChiSqSelector.setOutputCol("selectedFeatures");
        ChiSqSelector.fit(dataFrame)
        ChiSqSelectorModel.transform(dataFrame);
     */
    @Test
    public void ChiSqSelectorExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("ChiSqSelectorExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"id\",\"dataType\":\"integer\",\"nullable\":false}," +
                                "{\"name\":\"features\",\"dataType\":\"vector\",\"nullable\":false}," +
                                "{\"name\":\"clicked\",\"dataType\":\"double\",\"nullable\":false}," +
                                "{\"name\":\"selectedFeatures\",\"dataType\":\"vector\",\"nullable\":true}" +
                            "]" +
                         "}";
        String expected = "[" +
                "{\"values\":[7,[0,0,18,1],1,[1]],\"schema\":"+schema+"}," +
                "{\"values\":[8,[0,1,12,0],0,[0]],\"schema\":"+schema+"}," +
                "{\"values\":[9,[1,0,15,0.1],0,[0.1]],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        CountVectorizer()
        CountVectorizer.setInputCol("text")
        CountVectorizer.setOutputCol("feature")
        CountVectorizer.setVocabSize(3)
        CountVectorizer.setMinDF(2)
        CountVectorizer.fit(df)
        CountVectorizerModel(["a", "b", "c"])
        CountVectorizerModel.setInputCol("text")
        CountVectorizerModel.setOutputCol("feature")
        CountVectorizerModel.transform(df);
     */
    @Test
    public void CountVectorizerExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("CountVectorizerExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"text\",\"dataType\":\"array\",\"nullable\":false}," +
                                "{\"name\":\"feature\",\"dataType\":\"vector\",\"nullable\":true}" +
                            "]" +
                        "}";
        String expected = "[" +
                            "{\"values\":[null,[1,1,1]],\"schema\":"+schema+"}," +
                            "{\"values\":[null,[2,2,1]],\"schema\":"+schema+"}" +
                        "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        DCT()
        DCT.setInputCol("features")
        DCT.setOutputCol("featuresDCT")
        DCT.setInverse(false);
        DCT.transform(df)
     */
    @Test
    public void DCTExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("DCTExample");

        String schema = "{\"fields\":[{\"name\":\"featuresDCT\",\"dataType\":\"vector\",\"nullable\":true}]}";
        String expected = "[" +
                "{\"values\":[[1,-1.1480502970952693,2.0000000000000004,-2.7716385975338604]],\"schema\":"+schema+"}," +
                "{\"values\":[[-1,3.378492794482933,-7.000000000000001,2.9301512653149677]],\"schema\":"+schema+"}," +
                "{\"values\":[[4,9.304453421915744,11.000000000000002,1.5579302036357163]],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        StringIndexer()
        StringIndexer.setInputCol("label")
        StringIndexer.setOutputCol("indexedLabel")
        StringIndexer.fit(data);
        VectorIndexer()
        VectorIndexer.setInputCol("features")
        VectorIndexer.setOutputCol("indexedFeatures")
        VectorIndexer.setMaxCategories(4)
        VectorIndexer.fit(data);
        DecisionTreeClassifier()
        DecisionTreeClassifier.setLabelCol("indexedLabel")
        DecisionTreeClassifier.setFeaturesCol("indexedFeatures");
        IndexToString()
        IndexToString.setInputCol("prediction")
        IndexToString.setOutputCol("predictedLabel")
        IndexToString.setLabels(labelIndexer.labels());
        Pipeline()
        Pipeline.setStages([labelIndexer, featureIndexer, dt, labelConverter]);
        Pipeline.fit(trainingData);
        PipelineModel.transform(testData);
        PipelineModel..stages()
        MulticlassClassificationEvaluator()
        MulticlassClassificationEvaluator.setLabelCol("indexedLabel")
        MulticlassClassificationEvaluator.setPredictionCol("prediction")
        MulticlassClassificationEvaluator.setMetricName("precision");
        MulticlassClassificationEvaluator.evaluate(predictions);
        DecisionTreeClassifierModel.toDebugString()
     */
    @Test
    public void DecisionTreeClassificationExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("DecisionTreeClassificationExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        VectorIndexer()
        VectorIndexer.setInputCol("features")
        VectorIndexer.setOutputCol("indexedFeatures")
        VectorIndexer.setMaxCategories(4)
        VectorIndexer.fit(data);
        DecisionTreeRegressor()
        DecisionTreeRegressor.setFeaturesCol("indexedFeatures");
        Pipeline()
        Pipeline.setStages([featureIndexer, dt]);
        Pipeline.fit(trainingData);
        PipelineModel.transform(testData);
        RegressionEvaluator()
        RegressionEvaluator.setLabelCol("label")
        RegressionEvaluator.setPredictionCol("prediction")
        RegressionEvaluator.setMetricName("rmse");
        RegressionEvaluator.evaluate(predictions);
        PipelineModel.stages()
        DecisionTreeRegressorModel.toDebugString()
     */
    @Test
    public void DecisionTreeRegressionExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("DecisionTreeRegressionExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        ElementwiseProduct()
        ElementwiseProduct.setScalingVec(transformingVector)
        ElementwiseProduct.setInputCol("vector")
        ElementwiseProduct.setOutputCol("transformedVector");
        ElementwiseProduct.transform(dataFrame);
     */
    @Test
    public void ElementwiseProductExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("ElementwiseProductExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"id\",\"dataType\":\"string\",\"nullable\":false}," +
                                "{\"name\":\"vector\",\"dataType\":\"vector\",\"nullable\":false}," +
                                "{\"name\":\"transformedVector\",\"dataType\":\"vector\",\"nullable\":true}" +
                            "]" +
                        "}";
        String expected = "[" +
                            "{\"values\":[\"a\",[1,2,3],[0,2,6]],\"schema\":"+schema+"}" +
                            ",{\"values\":[\"b\",[4,5,6],[0,5,12]],\"schema\":"+schema+"}" +
                        "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        LogisticRegression()
        LogisticRegression.explainParams()
        LogisticRegression.setMaxIter(10)
        LogisticRegression.setRegParam(0.01);
        LogisticRegression.fit(training);
        LogisticRegression.fit(training, paramMapCombined)
        LogisticRegression.maxIter()
        LogisticRegression.regParam()
        LogisticRegression.w()
        LogisticRegression.threshold()
        LogisticRegressionModel()
        LogisticRegressionModel.transform(test)
        Estimator.parent()
        Estimator.extractParamMap()
        ParamMap()
        ParamMap.put()
     */
    @Test
    public void EstimatorTransformerParamExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("EstimatorTransformerParamExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        StringIndexer()
        StringIndexer.setInputCol("label")
        StringIndexer.setOutputCol("indexedLabel")
        StringIndexer.fit(dataframe);
        StringIndexer.labels()
        VectorIndexer()
        VectorIndexer.setInputCol("features")
        VectorIndexer.setOutputCol("indexedFeatures")
        VectorIndexer.setMaxCategories(4)
        VectorIndexer.fit(dataframe);
        GBTClassifier()
        GBTClassifier.setLabelCol("indexedLabel")
        GBTClassifier.setFeaturesCol("indexedFeatures")
        GBTClassifier.setMaxIter(10);
        IndexToString()
        IndexToString.setInputCol("prediction")
        IndexToString.setOutputCol("predictedLabel")
        IndexToString.setLabels(StringIndexer.labels());
        Pipeline()
        Pipeline.setStages([labelIndexer, featureIndexer, gbt, labelConverter]);
        Pipeline.fit(trainingData);
        GBTClassifierModel.transform(testData);
        MulticlassClassificationEvaluator()
        MulticlassClassificationEvaluator.setLabelCol("indexedLabel")
        MulticlassClassificationEvaluator.setPredictionCol("prediction")
        MulticlassClassificationEvaluator.setMetricName("precision");
        MulticlassClassificationEvaluator.evaluate(predictions);
     */
    @Test
    public void GradientBoostedTreeClassifierExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("GradientBoostedTreeClassifierExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        VectorIndexer()
        VectorIndexer.setInputCol("features")
        VectorIndexer.setOutputCol("indexedFeatures")
        VectorIndexer.setMaxCategories(4)
        VectorIndexer.fit(data);
        GBTRegressor()
        GBTRegressor.setLabelCol("label")
        GBTRegressor.setFeaturesCol("indexedFeatures")
        GBTRegressor.setMaxIter(10);
        Pipeline().setStages([featureIndexer, gbt]);
        Pipeline.fit(trainingData);
        GBTRegressorModel.transform(testData);
        RegressionEvaluator()
        RegressionEvaluator.setLabelCol("label")
        RegressionEvaluator.setPredictionCol("prediction")
        RegressionEvaluator.setMetricName("rmse");
        RegressionEvaluator.evaluate(predictions);
        GBTRegressorModel.stages();
     */
    @Test
    public void GradientBoostedTreeRegressorExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("GradientBoostedTreeRegressorExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        StringIndexer()
        StringIndexer.setInputCol("category")
        StringIndexer.setOutputCol("categoryIndex")
        StringIndexer.fit(df);
        StringIndexer.transform(df);
        IndexToString()
        IndexToString.setInputCol("categoryIndex")
        IndexToString.setOutputCol("originalCategory");
        IndexToString.transform(indexed);
     */
    @Test
    public void IndexToStringExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("IndexToStringExample");

        String schema = "{" +
                "\"fields\":[" +
                    "{\"name\":\"id\",\"dataType\":\"integer\",\"nullable\":false}," +
                    "{\"name\":\"originalCategory\",\"dataType\":\"string\",\"nullable\":true}" +
                "]" +
            "}";
        String expected = "[" +
                    "{\"values\":[0,\"a\"],\"schema\":"+schema+"}," +
                    "{\"values\":[1,\"b\"],\"schema\":"+schema+"}," +
                    "{\"values\":[2,\"c\"],\"schema\":"+schema+"}," +
                    "{\"values\":[3,\"a\"],\"schema\":"+schema+"}," +
                    "{\"values\":[4,\"a\"],\"schema\":"+schema+"}," +
                    "{\"values\":[5,\"c\"],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        KMeans()
        KMeans.setK(k);
        KMeans.fit(dataframe);
        KMeansModel.clusterCenters();
     */
    @Test
    public void KMeansExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("KMeansExample");

        String expected = "[[0.1,0.1,0.1],[9.05,9.05,9.05],[9.2,9.2,9.2]]";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        LDA()
        LDA.setK(10)
        LDA.setMaxIter(10);
        LDA.fit(DataFrame);
        LDAModel.logLikelihood(DataFrame);
        LDAModel.logPerplexity(DataFrame);
        LDAModel.describeTopics(3);
        LDAModel.transform(DataFrame);
     */
    @Test
    public void LDAExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("LDAExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        LinearRegression()
        LinearRegression.setMaxIter(10)
        LinearRegression.setRegParam(0.3)
        LinearRegression.setElasticNetParam(0.8);
        LinearRegression.fit(training);
        LinearRegressionModel.summary();
        LinearRegressionModel.coefficients();
        LinearRegressionModel.intercept();
        LinearRegressionTrainingSummary.totalIterations();
        LinearRegressionTrainingSummary.objectiveHistory()
        LinearRegressionTrainingSummary.residuals();
        LinearRegressionTrainingSummary.rootMeanSquaredError();
        LinearRegressionTrainingSummary.r2();
     */
    @Test
    public void LinearRegressionWithElasticNetExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("LinearRegressionWithElasticNetExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        LogisticRegression()
        LogisticRegression.setMaxIter(10)
        LogisticRegression.setRegParam(0.3)
        LogisticRegression.setElasticNetParam(0.8);
        LogisticRegression.fit(training);
        LogisticRegressionModel.summary();
        LogisticRegressionModel.setThreshold(bestThreshold);
        BinaryLogisticRegressionSummary.objectiveHistory();
        BinaryLogisticRegressionSummary.roc();
        BinaryLogisticRegressionSummary.areaUnderROC();
        BinaryLogisticRegressionSummary.fMeasureByThreshold();
     */
    @Test
    public void LogisticRegressionSummaryExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("LogisticRegressionSummaryExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }
    /*
        tests
        LogisticRegression()
        LogisticRegression.setMaxIter(10)
        LogisticRegression.setRegParam(0.3)
        LogisticRegression.setElasticNetParam(0.8);
        LogisticRegression.fit(training);
        LogisticRegressionModel.coefficients();
        LogisticRegressionModel.intercept();
     */
    @Test
    public void LogisticRegressionWithElasticNetExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("LogisticRegressionWithElasticNetExample");

        String expected = "passed";

        assertEquals("failure - strings are not equal", expected, ret);

    }

    /*
        tests
        PCA()
        PCA.setInputCol("features");
        PCA.setOutputCol("pcaFeatures");
        PCA.setK(3);
        PCA.fit(dataFrame)
        PCAModel.transform(dataFrame);
     */
    @Test
    public void PCAExample() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/ml/mltest.js");
        Object ret = ((Invocable)engine).invokeFunction("PCAExample");

        String schema = "{" +
                            "\"fields\":[" +
                                "{\"name\":\"pcaFeatures\",\"dataType\":\"vector\",\"nullable\":true}" +
                            "]" +
                         "}";
        String expected = "[" +
                "{\"values\":[[1.6485728230883807,-4.013282700516296,-5.524543751369388]],\"schema\":"+schema+"}," +
                "{\"values\":[[-4.645104331781534,-1.1167972663619026,-5.524543751369387]],\"schema\":"+schema+"}," +
                "{\"values\":[[-6.428880535676489,-5.337951427775355,-5.524543751369389]],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);
    }

}
