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
        
        String expected = "[" +
                "{\"values\":[[-0.006959987431764603,-0.002663574367761612,0.030144984275102617]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[[0.03422858566045761,0.026469426163073094,-0.02045729543481554]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}," +
                "{\"values\":[[0.04996728524565697,0.0027822263538837435,0.04833737155422568]]," +
                "\"schema\":{\"fields\":[{\"name\":\"result\",\"dataType\":\"vector\",\"nullable\":true}]}}" +
                "]";

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
                "{\"values\":[7,[0],1,[0]],\"schema\":"+schema+"}," +
                "{\"values\":[8,[0],0,[0]],\"schema\":"+schema+"}," +
                "{\"values\":[9,[1],0,[1]],\"schema\":"+schema+"}" +
                "]";

        assertEquals("failure - strings are not equal", expected, ret);

    }
}
