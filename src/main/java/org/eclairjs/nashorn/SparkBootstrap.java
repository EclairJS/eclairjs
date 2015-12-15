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

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class SparkBootstrap implements Bootstrap {

    private String getResourceAsURLStirng(String file) {

        String res = null;
        try {
            res = getClass().getResource(file).toURI().toString();
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
        	
        	//spark
        	engine.eval("load('" + getResourceAsURLStirng("/SparkConf.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/SparkContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/RDD.js") + "');");
            
            // storage
            engine.eval("load('" + getResourceAsURLStirng("/storage/StorageLevel.js") + "');");
            
            // streaming
            engine.eval("load('" + getResourceAsURLStirng("/streaming/Duration.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/Time.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/StreamingContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/KafkaUtils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/streaming/dstream/DStream.js") + "');");
            
            //mllib 
            engine.eval("load('" + getResourceAsURLStirng("/mllib/linalg/Vector.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/linalg/DenseVector.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LinearRegressionModel.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LinearRegressionWithSGD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/mllib/regression/LabeledPoint.js") + "');");
            
            // sql
            engine.eval("load('" + getResourceAsURLStirng("/sql/Column.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrame.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameNaFunctions.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameReader.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/DataFrameWriter.js") + "');");  
            engine.eval("load('" + getResourceAsURLStirng("/sql/GroupedData.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SQLContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SQLContextQueryExecution.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SqlDate.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/SqlTimestamp.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/Row.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/RowFactory.js") + "');");
           
            
            // sql.types
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/DataTypes.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/Metadata.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/StructField.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/sql/types/StructType.js") + "');");
            NashornEngineSingleton.setEngine(engine);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
