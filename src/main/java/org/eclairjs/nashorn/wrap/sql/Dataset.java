package org.eclairjs.nashorn.wrap.sql;
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

import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.objects.NativeArray;
import org.apache.spark.sql.AnalysisException;
import org.apache.spark.sql.Column;
import org.eclairjs.nashorn.*;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.wrap.WrappedClass;
import scala.collection.Seq;

import java.util.Arrays;
import java.util.Map;


public class Dataset extends WrappedClass {

 static Logger logger = Logger.getLogger(Dataset.class);

    static WrappedFunction F_toDF = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("toDF");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();

            String []argsStr = Arrays.stream(Utils.varArgsObjectArray(args, 0)).toArray(String[]::new);

            returnValue = _dataset.toDF(argsStr);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_schema = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("schema");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.schema();
             return Utils.javaToJs(returnValue);
        }
    };


    static WrappedFunction F_printSchema = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("printSchema");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            _dataset.printSchema();
            return null;
        }
    };

    static WrappedFunction F_explain = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("explain");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            
            if (args.length==0) {
              _dataset.explain();
            
            } else {
            boolean extended = (boolean) args[0];
              _dataset.explain(extended);
            
            }
            return null;
        }
    };

    static WrappedFunction F_dtypes = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("dtypes");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.dtypes();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_columns = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("columns");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_dataset.columns());
            return returnValue;
        }
    };

    static WrappedFunction F_isLocal = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("isLocal");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.isLocal();
            return returnValue;
        }
    };

    static WrappedFunction F_isStreaming = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("isStreaming");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.isStreaming();
            return returnValue;
        }
    };

    static WrappedFunction F_show = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("show");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args.length==0)
                _dataset.show();
            else if (args.length==1)
            {
                int numRows = Utils.toInt(args[0]);
                _dataset.show(numRows);
            }
            else
            {
                int numRows = Utils.toInt(args[0]);
                boolean truncate = (boolean) args[1];
                _dataset.show(numRows,truncate);
            }


            return null;
        }
    };


    static WrappedFunction F_na = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("na");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.na();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_stat = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("stat");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.stat();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_join = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("join");
            Object returnValue = null;
            args = Utils.removeUndefinedArgs(args);
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset right = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            if (args.length==1)
                returnValue = _dataset.join(right);
            else if (args.length==2  ) {
                org.apache.spark.sql.Column joinExprs = (org.apache.spark.sql.Column) Utils.toObject(args[1],false);
                if (joinExprs!=null)
                {
                    returnValue = _dataset.join(right,joinExprs);

                }
                else if (args[1] instanceof String)
                {
                    String usingColumn = (String) args[1];
                    returnValue = _dataset.join(right,usingColumn);
                }
                else
                 {
                    Object [] arr=Utils.toObjectArray(args[1]);
                     returnValue = _dataset.join(right,Utils.toScalaSeq(arr));
                }
            }
            else
            {
                String joinType = (String) args[2];
                org.apache.spark.sql.Column joinExprs = (org.apache.spark.sql.Column) Utils.toObject(args[1],false);
                if (joinExprs!=null)
                {
                    returnValue = _dataset.join(right,joinExprs,joinType);

                }
                else
                    returnValue = _dataset.join(right,Utils.toScalaSeq(Utils.toObjectArray(args[1])),joinType);

            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };



    static WrappedFunction F_joinWith = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("joinWith");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset other = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            org.apache.spark.sql.Column condition = (org.apache.spark.sql.Column) Utils.toObject(args[1]);
            
            if (args.length==2) {
              returnValue = _dataset.joinWith(other,condition);
            
            } else {
                String joinType = (String) args[2];
                returnValue = _dataset.joinWith(other, condition, joinType);
            
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_sortWithinPartitions = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sortWithinPartitions");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.sortWithinPartitions(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.sortWithinPartitions(sortCol, sortCols);
                }
            }
            else
            {
                  Seq cols= Utils.toScalaSeq(Utils.varArgsObjectArray(args, 0));
                  returnValue = _dataset.sortWithinPartitions(cols);
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_sort = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sort");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.sort(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.sort(sortCol, sortCols);
                }
            }
            else
            {
                Seq cols= Utils.toScalaSeq(Utils.varArgsObjectArray(args, 0));
                returnValue = _dataset.sort(cols);
            }
            // return Utils.javaToJs(returnValue);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_orderBy = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("orderBy");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.orderBy(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.orderBy(sortCol, sortCols);
                }
            }
            else
            {
                Seq cols= Utils.toScalaSeq(Utils.varArgsObjectArray(args, 0));
                returnValue = _dataset.orderBy(cols);
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_apply = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("apply");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String colName = (String) args[0];
            returnValue = _dataset.apply(colName);
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_col = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("col");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String colName = (String) args[0];
            returnValue = _dataset.col(colName);
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_as = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("as");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String alias = (String) args[0];
                returnValue = _dataset.as(alias);
            }
            else
            {
                org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[0]);
                returnValue = _dataset.as(encoder);
//                return this;
            }
            // return Utils.javaToJs(returnValue);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_alias = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("alias");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String alias = (String) args[0];
            returnValue = _dataset.alias(alias);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_select = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("select");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.select(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.select(sortCol, sortCols);
                }
            }
            else
            {
                Object[] unwrappedArgs = Utils.varArgsObjectArray(args, 0);
                if (unwrappedArgs[0] instanceof Column)
                {
                    Seq cols= Utils.toScalaSeq(unwrappedArgs);
                    returnValue = _dataset.select(cols);
                }
                else {
                    org.apache.spark.sql.TypedColumn c1 = (org.apache.spark.sql.TypedColumn) unwrappedArgs[0];
                    if (args.length==1)
                        returnValue = _dataset.select(c1);
                    else {
                        org.apache.spark.sql.TypedColumn c2 = (org.apache.spark.sql.TypedColumn) Utils.toObject(args[1]);
                        if (args.length==2)
                            returnValue = _dataset.select(c1,c2);
                        else {
                            org.apache.spark.sql.TypedColumn c3 = (org.apache.spark.sql.TypedColumn) Utils.toObject(args[2]);
                            if (args.length==3)
                                returnValue = _dataset.select(c1,c2,c3);
                            else {
                                org.apache.spark.sql.TypedColumn c4 = (org.apache.spark.sql.TypedColumn) Utils.toObject(args[3]);
                                if (args.length==3)
                                    returnValue = _dataset.select(c1,c2,c3,c4);
                                else {
                                    org.apache.spark.sql.TypedColumn c5 = (org.apache.spark.sql.TypedColumn) Utils.toObject(args[4]);
                                    returnValue = _dataset.select(c1,c2,c3,c4,c5);
                                }

                            }

                        }

                    }

                }
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_selectExpr = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("selectExpr");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String []exprs = Arrays.stream(Utils.varArgsObjectArray(args, 0)).toArray(String[]::new);
            returnValue = _dataset.selectExpr(exprs);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_filter = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("filter");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String conditionExpr = (String) args[0];
                returnValue = _dataset.filter(conditionExpr);
            }
            else
            {
                org.apache.spark.sql.Column condition = (org.apache.spark.sql.Column) Utils.toObject(args[0],false);
                if (condition!=null)
                    returnValue = _dataset.filter(condition);
                else
                {
                    Object  bindArgs = null;
                    if (args.length > 1) {
                        bindArgs = args[1];
                    }
                    JSFilterFunction func = (JSFilterFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFilterFunction", _dataset.sparkSession().sparkContext(), bindArgs);
                    returnValue = _dataset.filter(func);
                }

            }

            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_where = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("where");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String conditionExpr = (String) args[0];
                returnValue = _dataset.where(conditionExpr);
            }
            else
            {
                org.apache.spark.sql.Column condition = (org.apache.spark.sql.Column) Utils.toObject(args[0]);
                returnValue = _dataset.where(condition);
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_groupBy = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("groupBy");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();



            Object [] arr=Utils.toObjectArray(Utils.varArgsObjectArray(args,0));
            if (arr[0] instanceof String)
            {
                String col1=(String)args[0];
                Object[]rest=new Object[arr.length-1];
                System.arraycopy(arr,1,rest,0,rest.length);
                Seq seq=Utils.toScalaSeq(rest);
                returnValue = _dataset.groupBy(col1,seq);

            }
            else
            {
                Seq seq=Utils.toScalaSeq(arr);
                returnValue = _dataset.groupBy(seq);
            }
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_rollup = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("rollup");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.rollup(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.rollup(sortCol, sortCols);
                }
            }
            else
            {
                Object[] unwrappedArgs = Utils.varArgsObjectArray(args, 0);
                    Seq cols= Utils.toScalaSeq(unwrappedArgs);
                    returnValue = _dataset.rollup(cols);
            }
           return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_cube = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("cube");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0] instanceof String)
            {
                String sortCol=(String)args[0];
                if (args.length==1)
                    returnValue= _dataset.cube(sortCol);
                else {
                    String []sortCols = Arrays.stream(Utils.varArgsObjectArray(args, 1)).toArray(String[]::new);
                    returnValue= _dataset.cube(sortCol, sortCols);
                }
            }
            else
            {
                Object[] unwrappedArgs = Utils.varArgsObjectArray(args, 0);
                Seq cols= Utils.toScalaSeq(unwrappedArgs);
                returnValue = _dataset.cube(cols);
            }
             return Utils.javaToJs(returnValue);
        }
    };


    static WrappedFunction F_reduce = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("reduce");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSReduceFunction func = (JSReduceFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSReduceFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            returnValue = _dataset.reduce(func);
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_groupByKey = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("groupByKey");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSMapFunction func = (JSMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSMapFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            returnValue = _dataset.groupByKey(func,encoder);
             return Utils.javaToJs(returnValue);
        }
    };


    static WrappedFunction F_agg = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("agg");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Map exprs =  Utils.createJavaHashMap(args[0]);
            returnValue = _dataset.agg(exprs);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


//    static WrappedFunction F_agg = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("agg");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            org.apache.spark.sql.Column expr = (org.apache.spark.sql.Column) Utils.toObject(args[0]);
//             %%% deliberate syntax error +++ // TODO: handle repeated parm 'exprs'
//            org.apache.spark.sql.Column exprs = (org.apache.spark.sql.Column) Utils.toObject(args[1]);
//            returnValue = _dataset.agg(expr,exprs);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };

    static WrappedFunction F_limit = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("limit");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            int n = Utils.toInt(args[0]);
            returnValue = _dataset.limit(n);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_unionAll = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("unionAll");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset other = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            returnValue = _dataset.unionAll(other);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_union = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("union");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset other = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            returnValue = _dataset.union(other);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_intersect = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("intersect");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset other = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            returnValue = _dataset.intersect(other);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_except = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("except");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Dataset other = (org.apache.spark.sql.Dataset) Utils.toObject(args[0]);
            returnValue = _dataset.except(other);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_sample = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("sample");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            boolean withReplacement = (boolean) args[0];
            double fraction =  Utils.toDouble(args[1]);
            
            if (args.length==2) {
              returnValue = _dataset.sample(withReplacement,fraction);
            
            } else {
            long seed =  Utils.toLong(args[2]);
              returnValue = _dataset.sample(withReplacement,fraction,seed);
            
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_randomSplit = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("randomSplit");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            double[] weights =  Utils.toDoubleArray(args[0]);
            
            if (args.length==1 || args[1].toString().equals("undefined")) {
              returnValue = _dataset.randomSplit(weights);
            
            } else {
            long seed =  Utils.toLong(args[1]);
              returnValue = _dataset.randomSplit(weights,seed);
            
            }
            return Utils.javaToJs(returnValue);
        }
    };

//    static WrappedFunction F_randomSplitAsList = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("randomSplitAsList");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            double[] weights =  Utils.toDoubleArray(args[0]);
//            long seed =  Utils.toLong(args[1]);
//            returnValue = _dataset.randomSplitAsList(weights,seed);
//            return returnValue;
//        }
//    };

//    static WrappedFunction F_explode = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("explode");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//             %%% deliberate syntax error +++ // TODO: handle repeated parm 'input'
//            org.apache.spark.sql.Column input = (org.apache.spark.sql.Column) Utils.toObject(args[0]);
//            Object  bindArgs1 = null;
//            if (args.length > 2) {
//                bindArgs = args[2];
//            }
//            JSFunction f = (JSFunction)Utils.createLambdaFunction(args[1], "org.eclairjs.nashorn.JSFunction", _dataset.context(), bindArgs1);
//            returnValue = _dataset.explode(input,f);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };
//
//    static WrappedFunction F_explode = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("explode");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            String inputColumn = (String) args[0];
//            String outputColumn = (String) args[1];
//            Object  bindArgs2 = null;
//            if (args.length > 3) {
//                bindArgs = args[3];
//            }
//            JSFunction f = (JSFunction)Utils.createLambdaFunction(args[2], "org.eclairjs.nashorn.JSFunction", _dataset.context(), bindArgs2);
//            returnValue = _dataset.explode(inputColumn,outputColumn,f);
//            // return Utils.javaToJs(returnValue);
//            return new DataFrame((DataFrame)returnValue);
//        }
//    };

    static WrappedFunction F_withColumn = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("withColumn");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String colName = (String) args[0];
            org.apache.spark.sql.Column col = (org.apache.spark.sql.Column) Utils.toObject(args[1]);
            returnValue = _dataset.withColumn(colName,col);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_withColumnRenamed = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("withColumnRenamed");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String existingName = (String) args[0];
            String newName = (String) args[1];
            returnValue = _dataset.withColumnRenamed(existingName, newName);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_drop = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("drop");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args[0]instanceof String)
            {
                String colName = (String) args[0];
                returnValue = _dataset.drop(colName);
            }
            else
            {
                Column col = (Column) Utils.toObject(args[0]);
                returnValue = _dataset.drop(col);
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_dropDuplicates = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("dropDuplicates");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            if (args.length==0)
                returnValue = _dataset.dropDuplicates();
            else if (Utils.isJSArray(args[0])) {
                String [] cols=Utils.toStringArray(args[0]);
                returnValue = _dataset.dropDuplicates(cols);
            }
            else
            {
                String [] cols=Utils.toStringArray(Utils.varArgsObjectArray(args,0));
                returnValue = _dataset.dropDuplicates(cols);

            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_describe = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("describe");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
                    String [] cols=Utils.toStringArray(Utils.varArgsObjectArray(args,0));
            returnValue = _dataset.describe(cols);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_head = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("head");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            
            if (args.length==0) {
              returnValue = _dataset.head();
            
            } else {
            int n = Utils.toInt(args[0]);
              returnValue = _dataset.head(n);
            
            }
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_first = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("first");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.first();
             return Utils.javaToJs(returnValue);
        }
    };

//    static WrappedFunction F_transform = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("transform");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            Object  bindArgs = null;
//            if (args.length > 1) {
//                bindArgs = args[1];
//            }
//            JSFunction t = (JSFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFunction", _dataset.context(), bindArgs);
//            returnValue = _dataset.transform(t);
//            // return Utils.javaToJs(returnValue);
//            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
//        }
//    };

    static WrappedFunction F_map = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("map");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSMapFunction func = (JSMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSMapFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            returnValue = _dataset.map(func,encoder);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };


    static WrappedFunction F_mapPartitions = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("mapPartitions");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 2) {
                bindArgs = args[2];
            }
            JSMapPartitionsFunction func = (JSMapPartitionsFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSMapPartitionsFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[1]);
            returnValue = _dataset.mapPartitions(func,encoder);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_flatMap = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("flatMap");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            org.apache.spark.sql.Encoder encoder = (org.apache.spark.sql.Encoder) Utils.toObject(args[1],false);
            int bindArgsInx=(encoder!=null)? 2 : 1;
            Object  bindArgs = null;
            if (args.length > bindArgsInx) {
                bindArgs = args[bindArgsInx];
            }
            JSFlatMapFunction func = (JSFlatMapFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSFlatMapFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            returnValue = _dataset.flatMap(func,encoder);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_foreach = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("foreach");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSForeachFunction f = (JSForeachFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSForeachFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            _dataset.foreach(f);
            return null;
        }
    };


    static WrappedFunction F_foreachPartition = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("foreachPartition");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            Object  bindArgs = null;
            if (args.length > 1) {
                bindArgs = args[1];
            }
            JSForeachPartitionFunction f = (JSForeachPartitionFunction)Utils.createLambdaFunction(args[0], "org.eclairjs.nashorn.JSForeachPartitionFunction", _dataset.sparkSession().sparkContext(), bindArgs);
            _dataset.foreachPartition(f);
            return null;
        }
    };


    static WrappedFunction F_take = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("take");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            int n = Utils.toInt(args[0]);
            returnValue = _dataset.take(n);
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_collect = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("collect");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.collect();
            return Utils.javaToJs(returnValue);
        }
    };


//
//    static WrappedFunction F_toLocalIterator = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("toLocalIterator");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            returnValue = _dataset.toLocalIterator();
//            // return Utils.javaToJs(returnValue);
//            return new java.util.Iterator((java.util.Iterator)returnValue);
//        }
//    };
//
    static WrappedFunction F_count = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("count");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.count();
            return returnValue;
        }
    };

    static WrappedFunction F_repartition = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("repartition");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            int numPartitions = Utils.toInt(args[0]);
            returnValue = _dataset.repartition(numPartitions);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };
//
//    static WrappedFunction F_repartition = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("repartition");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//            int numPartitions = Utils.toInt(args[0]);
//             %%% deliberate syntax error +++ // TODO: handle repeated parm 'partitionExprs'
//            org.apache.spark.sql.Column partitionExprs = (org.apache.spark.sql.Column) Utils.toObject(args[1]);
//            returnValue = _dataset.repartition(numPartitions,partitionExprs);
//            // return Utils.javaToJs(returnValue);
//            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
//        }
//    };
//
//    static WrappedFunction F_repartition = new WrappedFunction() {
//        @Override
//        public Object call(Object thiz, Object... args) {
//            logger.debug("repartition");
//            Object returnValue = null;
//            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
//             %%% deliberate syntax error +++ // TODO: handle repeated parm 'partitionExprs'
//            org.apache.spark.sql.Column partitionExprs = (org.apache.spark.sql.Column) Utils.toObject(args[0]);
//            returnValue = _dataset.repartition(partitionExprs);
//            // return Utils.javaToJs(returnValue);
//            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
//        }
//    };

    static WrappedFunction F_coalesce = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("coalesce");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            int numPartitions = Utils.toInt(args[0]);
            returnValue = _dataset.coalesce(numPartitions);
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_distinct = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("distinct");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.distinct();
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_cache = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("cache");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.cache();
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_persist = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("persist");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            
            if (args.length==0) {
              returnValue = _dataset.persist();
            
            } else {
            org.apache.spark.storage.StorageLevel newLevel = (org.apache.spark.storage.StorageLevel) Utils.toObject(args[0]);
              returnValue = _dataset.persist(newLevel);
            
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_unpersist = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("unpersist");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            
            if (args.length==0) {
              returnValue = _dataset.unpersist();
            
            } else {
            boolean blocking = (boolean) args[0];
              returnValue = _dataset.unpersist(blocking);
            
            }
            return new Dataset((org.apache.spark.sql.Dataset)returnValue);
        }
    };

    static WrappedFunction F_toRDD = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("toRDD");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.toJavaRDD();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_rdd = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("javaRDD");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.javaRDD();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_registerTempTable = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("registerTempTable");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String tableName = (String) args[0];
            _dataset.registerTempTable(tableName);
            return null;
        }
    };

    static WrappedFunction F_createTempView = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("createTempView");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String viewName = (String) args[0];
            try {
                _dataset.createTempView(viewName);
            } catch (AnalysisException e) {
                throw new RuntimeException(e);
            }
            return null;
        }
    };

    static WrappedFunction F_createOrReplaceTempView = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("createOrReplaceTempView");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            String viewName = (String) args[0];
            _dataset.createOrReplaceTempView(viewName);
            return null;
        }
    };

    static WrappedFunction F_write = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("write");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.write();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_writeStream = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("writeStream");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.writeStream();
             return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_toJSON = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("toJSON");
            Object returnValue;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_dataset.collect());;
            return Utils.JsonStringify(returnValue);
        }
    };

    static WrappedFunction F_inputFiles = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("inputFiles");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.inputFiles();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_queryExecution = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("queryExecution");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.queryExecution();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sqlContext = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("queryExecution");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.sqlContext();
            return Utils.javaToJs(returnValue);
        }
    };

    static WrappedFunction F_sparkSession = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            logger.debug("queryExecution");
            Object returnValue = null;
            org.apache.spark.sql.Dataset _dataset = (org.apache.spark.sql.Dataset) ((Dataset) thiz).getJavaObject();
            returnValue = _dataset.sparkSession();
            return new SparkSession((org.apache.spark.sql.SparkSession)returnValue);

        }
    };


    private org.apache.spark.sql.Dataset _dataset;

    public Dataset(org.apache.spark.sql.Dataset _dataset)
    {
       logger.debug("constructor");
       this._dataset = _dataset;
    }

    static public String getModuleName() {
        return "sql.Dataset";
    }

    public boolean checkInstance(Object other) {
        return other instanceof Dataset;
    }

    public Object getJavaObject() {
        return _dataset;
    }

    @Override
    public String toString() {

        return _dataset.toString();
    }

    @Override
    public String toJSON()
    {
        this._dataset.toJSON().collectAsList();
        System.out.println("JSON=" + this._dataset.toJSON());
        System.out.println("JSONList="+this._dataset.toJSON().collectAsList());
        return getJavaObject().toString();
    }


    public String getClassName() {
        return "Dataset";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "toDF":
                return F_toDF;
            case "schema":
                return F_schema;
            case "printSchema":
                return F_printSchema;
            case "explain":
                return F_explain;
            case "dtypes":
                return F_dtypes;
            case "columns":
                return F_columns;
            case "isLocal":
                return F_isLocal;
            case "isStreaming":
                return F_isStreaming;
            case "show":
                return F_show;
            case "na":
                return F_na;
            case "stat":
                return F_stat;
            case "join":
                return F_join;
            case "joinWith":
                return F_joinWith;
            case "sortWithinPartitions":
                return F_sortWithinPartitions;
            case "sort":
                return F_sort;
            case "orderBy":
                return F_orderBy;
            case "apply":
                return F_apply;
            case "col":
                return F_col;
            case "as":
                return F_as;
            case "alias":
                return F_alias;
            case "select":
                return F_select;
            case "selectExpr":
                return F_selectExpr;
            case "filter":
            case "filterWithColumn":
                return F_filter;
            case "where":
                return F_where;
            case "groupBy":
                return F_groupBy;
            case "rollup":
                return F_rollup;
            case "cube":
                return F_cube;
            case "reduce":
                return F_reduce;
            case "groupByKey":
                return F_groupByKey;
            case "agg":
                return F_agg;
            case "limit":
                return F_limit;
            case "unionAll":
                return F_unionAll;
            case "union":
                return F_union;
            case "intersect":
                return F_intersect;
            case "except":
                return F_except;
            case "sample":
                return F_sample;
            case "randomSplit":
                return F_randomSplit;
//            case "explode":
//                return F_explode;
            case "withColumn":
                return F_withColumn;
            case "withColumnRenamed":
                return F_withColumnRenamed;
            case "drop":
                return F_drop;
            case "dropDuplicates":
                return F_dropDuplicates;
            case "describe":
                return F_describe;
            case "head":
                return F_head;
            case "first":
                return F_first;
//            case "transform":
//                return F_transform;
            case "map":
                return F_map;
            case "mapPartitions":
                return F_mapPartitions;
            case "flatMap":
                return F_flatMap;
            case "foreach":
                return F_foreach;
            case "foreachPartition":
                return F_foreachPartition;
            case "take":
                return F_take;
            case "collect":
                return F_collect;
//            case "toLocalIterator":
//                return F_toLocalIterator;
            case "count":
                return F_count;
            case "repartition":
                return F_repartition;
            case "coalesce":
                return F_coalesce;
            case "distinct":
                return F_distinct;
            case "cache":
                return F_cache;
            case "persist":
                return F_persist;
            case "unpersist":
                return F_unpersist;
            case "toRDD":
                return F_toRDD;
            case "rdd":
                return F_rdd;
            case "registerTempTable":
                return F_registerTempTable;
            case "createTempView":
                return F_createTempView;
            case "createOrReplaceTempView":
                return F_createOrReplaceTempView;
            case "write":
                return F_write;
            case "writeStream":
                return F_writeStream;
            case "toJSON":
                return F_toJSON;
            case "inputFiles":
                return F_inputFiles;
            case "queryExecution":
                return F_queryExecution;
            case "sqlContext":
                return F_sqlContext;
            case "sparkSession":
                return F_sparkSession;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "toDF":
            case "schema":
            case "printSchema":
            case "explain":
            case "dtypes":
            case "columns":
            case "isLocal":
            case "isStreaming":
            case "show":
            case "na":
            case "stat":
            case "join":
            case "joinWith":
            case "sortWithinPartitions":
            case "sort":
            case "orderBy":
            case "apply":
            case "col":
            case "as":
            case "alias":
            case "select":
            case "selectExpr":
            case "filter":
            case "filterWithColumn":
            case "where":
            case "groupBy":
            case "rollup":
            case "cube":
            case "reduce":
            case "groupByKey":
            case "agg":
            case "limit":
            case "unionAll":
            case "union":
            case "intersect":
            case "except":
            case "sample":
            case "randomSplit":
            case "randomSplitAsList":
            case "explode":
            case "withColumn":
            case "withColumnRenamed":
            case "drop":
            case "dropDuplicates":
            case "describe":
            case "head":
            case "first":
            case "transform":
            case "map":
            case "mapPartitions":
            case "flatMap":
            case "foreach":
            case "foreachPartition":
            case "take":
            case "takeAsList":
            case "collect":
            case "collectAsList":
            case "toLocalIterator":
            case "count":
            case "repartition":
            case "coalesce":
            case "distinct":
            case "cache":
            case "persist":
            case "unpersist":
            case "toJavaRDD":
            case "javaRDD":
            case "registerTempTable":
            case "createTempView":
            case "createOrReplaceTempView":
            case "write":
            case "writeStream":
            case "toJSON":
            case "inputFiles":
            case "queryExecution":
            case "sqlContext":
            case "sparkSession":

                return true;
        }
        return super.hasMember(name);
    }

}
