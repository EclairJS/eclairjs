/*
s * Copyright 2015 IBM Corp.
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

package org.eclairjs.nashorn.mllib.clustering;

import org.apache.spark.api.java.function.Function;
import scala.Tuple3;


public class PowerIterationClusteringRunFunction implements Function {
    private String func = null;
    private Object args[] = null;

    public PowerIterationClusteringRunFunction() {

    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
     /*
        The RDD<Tuple> we get from Nashorn is a Tuple(Double, Double, Double)
        what we need for PowerIterationClustering,run is a RDD<Tuple3<Long, Long, Double>>
        the only way to accomplish this is to RDD.map() the RDD from what we are given to what is required.
        then give the resulting RDD to the run().
     */
    public Object call(Object o) throws Exception {
        Tuple3 t = (Tuple3) o;
        Double l1 = (Double)t._1();
        Double l2 = (Double)t._2();
        Tuple3 x = new Tuple3<Long, Long, Double>(l1.longValue(), l2.longValue(), (Double) t._3());
        return x;
    }
}

