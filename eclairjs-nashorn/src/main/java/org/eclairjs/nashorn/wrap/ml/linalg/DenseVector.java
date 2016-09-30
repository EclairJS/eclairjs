package org.eclairjs.nashorn.wrap.ml.linalg;
/*                                                                         
* Copyright 2016 IBM Corp.                                                 
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

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.eclairjs.nashorn.wrap.ml.linalg.Vector;


public class DenseVector extends Vector {

    static WrappedFunction F_values = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.ml.linalg.DenseVector _vector = (org.apache.spark.ml.linalg.DenseVector) ((DenseVector) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_vector.values());
            return returnValue;
        }
    };

    private org.apache.spark.ml.linalg.DenseVector _denseVector;

    public DenseVector(org.apache.spark.ml.linalg.DenseVector _denseVector)
    {
        this._denseVector= _denseVector;
    }
    public DenseVector(double... values)
    {
        this._denseVector = new org.apache.spark.ml.linalg.DenseVector(values);
    }

    static public String getModuleName() {
        return "ml.linalg.DenseVector";
    }

    public boolean checkInstance(Object other) {
        return other instanceof DenseVector;
    }

    public Object getJavaObject() {
        return _denseVector;
    }

    @Override
    public String toString() {

        return _denseVector.toString();
    }

    @Override
    public String toJSON() {
        String json = "{";
        json += "\"values\":[";
        double[] values =  _denseVector.values();
        for (int i = 0; i < values.length; i++) {
            json += values[i];
            if (i < (values.length -1)) {
                json += ",";
            }
        }
        json += "]}";
        return json;

    }

    public String getClassName() {
        return "DenseVector";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "values":
                return F_values;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "values":
                return true;
        }
        return super.hasMember(name);
    }

//
// static methods
//

}
