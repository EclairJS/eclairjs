package org.eclairjs.nashorn.sql;/*
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

import org.apache.spark.sql.types.*;

public class JSUDF {
    private DataType returnType = null;

    public void setReturnType(DataType type) {
        this.returnType = type;
    }

    public DataType getReturnType() {
        return this.returnType;
    }

    public Object castValueToReturnType(Object value) {
        Object ret = value;
         /*
             Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed
             So we need to force the "Number" from Nashorn to the correct type based on the schema.
             JavaScript parseInt returns a java.lang.Double and that seems to be the only java type we will need to convert.
             */
        if (this.getReturnType() == DataTypes.IntegerType && value instanceof Double) {
            ret =  ((Double)value).intValue();
        } else if (this.getReturnType() == DataTypes.FloatType && value instanceof Double) {
            ret =  ((Double)value).floatValue();
        } else if (this.getReturnType() == DataTypes.DoubleType && value instanceof Integer) {
            ret =  ((Integer)value).doubleValue();
        } else if (this.getReturnType() == DataTypes.FloatType && value instanceof Integer) {
            ret =  ((Integer)value).floatValue();
        }

        return ret;

    }
}
