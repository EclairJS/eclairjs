package org.eclairjs.nashorn.wrap.mllib.regression;
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

import org.apache.spark.mllib.linalg.Vector;
import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.eclairjs.nashorn.wrap.WrappedClass;


public class LabeledPoint extends WrappedClass {

    static WrappedFunction F_getFeatures = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((LabeledPoint) thiz).getFeatures();
        }
    };

    static WrappedFunction F_getLabel = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((LabeledPoint) thiz).getLabel();
        }
    };

    static WrappedFunction F_parse = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.regression.LabeledPoint _labeledPoint = (org.apache.spark.mllib.regression.LabeledPoint) ((LabeledPoint) thiz).getJavaObject();
            returnValue = new LabeledPoint(_labeledPoint.parse((String) args[0]));
            return returnValue;
        }
    };

    private org.apache.spark.mllib.regression.LabeledPoint _labeledPoint;

    public LabeledPoint(org.apache.spark.mllib.regression.LabeledPoint _labeledPoint)
    {
        this._labeledPoint = _labeledPoint;
    }

    public LabeledPoint (Object label, Object features) {
        this._labeledPoint = new org.apache.spark.mllib.regression.LabeledPoint(Utils.toDouble(label), (Vector) Utils.jsToJava(features));
    }

    static public String getModuleName() {
        return "mllib.regression.LabeledPoint";
    }

    public boolean checkInstance(Object other) {
        return other instanceof LabeledPoint;
    }

    public Object getJavaObject() {
        return _labeledPoint;
    }

    public double getLabel() {
        return this._labeledPoint.label(); // double
    }

    public Object getFeatures() {
        return Utils.javaToJs(this._labeledPoint.features());
    }

    @Override
    public String toString() {
            return "[" + this.getLabel() + ", [" + this.getFeatures() + "]]";
    }

    @Override
    public String toJSON() {
        String jsonStr = "{label: " + this.getLabel() + ", features: " + this.getFeatures() + " }";

        return jsonStr;
    }

    public String getClassName() {
        return "LabeledPoint";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "getFeatures": return F_getFeatures;
            case "getLabel": return F_getLabel;
            case "parse": return F_parse;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "getFeatures":
            case "getLabel":
            case "parse":
                return true;
        }
        return super.hasMember(name);
    }

//
// static methods
//

}
