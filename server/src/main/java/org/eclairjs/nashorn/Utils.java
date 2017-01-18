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

import jdk.internal.dynalink.beans.StaticClass;
import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.objects.NativeArray;
import jdk.nashorn.internal.runtime.ScriptFunction;
import jdk.nashorn.internal.runtime.ScriptRuntime;
import jdk.nashorn.internal.runtime.Undefined;
import org.apache.commons.lang.ArrayUtils;
import org.apache.log4j.Logger;
import org.apache.spark.SparkContext;
import org.apache.spark.SparkFiles;
import org.apache.spark.mllib.regression.LinearRegressionModel;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Encoder;
import org.apache.spark.sql.Row;
import org.eclairjs.nashorn.wrap.WrappedClass;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import scala.Tuple2;
import scala.Product;
import scala.collection.Seq;
import scala.collection.convert.Wrappers.IteratorWrapper;
import scala.collection.convert.Wrappers.IterableWrapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileFilter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.util.*;
import java.sql.Timestamp;
import java.util.function.BooleanSupplier;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public class Utils {

  static  	Logger logger = Logger.getLogger(Utils.class);

    public static Object javaToJs(Object o) {
        ScriptEngine engine = NashornEngineSingleton.getEngine();
        return Utils.javaToJs(o, engine);
    }

    public static Object javaToJs(Object o, ScriptEngine engine) {
        if (o==null)
            return o;
        if (engine == null) {
            engine = NashornEngineSingleton.getEngine();
        }
        String packageName=o.getClass().getCanonicalName();
        switch (packageName)
        {
            case "java.lang.String":
            case "java.lang.Integer":
            case "java.lang.Float":
            case "java.lang.Double":
            case "java.lang.Boolean":
                return o;
            case "org.json.simple.JSONObject":
                JSONObject json=(JSONObject)o;
                if (ModuleUtils.isModule(json)) {
                    Object mod = ModuleUtils.getRequiredFile(json,engine);
                   // System.out.println("mod" + mod);
//    Serialize.logger.debug("Serialize.JSModule found a lambda required module: "+mod);
                    return mod;
                   // return (mod && mod.exportname) ? mod.exports[mod.exportname] : (mod ? mod.exports : false);
                }
                //System.out.println("JSONObject" + json.toJSONString());
                Invocable invocable = (Invocable) engine;
                try {

                    String cmd = "JSON.parse('" + json.toJSONString() + "')";
                    /*
                    If the JSON string has a "string" the result is \"string\" which is invalid JSON
                    SO we need to change to \\"string\\" so JSON.parse will be happy
                     */
                    cmd = cmd.replace("\\\"", "\\\\\"");
                    Object r = engine.eval(cmd);
                    return r;
                } catch (javax.script.ScriptException e) {

                    throw new RuntimeException(e.toString());
                 }
//				 er  = invocable.invokeFunction("convertJavaJSONObject",params);
        //        throw new RuntimeException("java2js NOT HANDLED:"+packageName);


            case "java.util.ArrayList":
                ArrayList fromList=(ArrayList)o;
                ArrayList alist = new ArrayList(fromList.size());
                Iterator iter=fromList.iterator();
                 while(iter.hasNext()) {
                    alist.add(javaToJs(iter.next(),engine));
                }

                return Utils.createJavaScriptObject(alist); // FIXME Java wrapper needed
            case "org.apache.spark.mllib.recommendation.Rating":
                return new  org.eclairjs.nashorn.wrap.mllib.recommendation.Rating(
                        (org.apache.spark.mllib.recommendation.Rating)o
                );
            case "org.apache.spark.mllib.linalg.SparseVector":
                return new  org.eclairjs.nashorn.wrap.mllib.linalg.SparseVector(
                        (org.apache.spark.mllib.linalg.SparseVector)o
                );
            case "org.apache.spark.mllib.linalg.DenseVector":
                return new  org.eclairjs.nashorn.wrap.mllib.linalg.DenseVector(
                        (org.apache.spark.mllib.linalg.DenseVector)o
                );
            case "org.apache.spark.mllib.regression.LabeledPoint":
                return new  org.eclairjs.nashorn.wrap.mllib.regression.LabeledPoint(
                        (org.apache.spark.mllib.regression.LabeledPoint)o
                );
            case "org.apache.spark.ml.linalg.SparseVector":
                return new  org.eclairjs.nashorn.wrap.ml.linalg.SparseVector(
                        (org.apache.spark.ml.linalg.SparseVector)o
                );
            case "org.apache.spark.ml.linalg.DenseVector":
                return new  org.eclairjs.nashorn.wrap.ml.linalg.DenseVector(
                        (org.apache.spark.ml.linalg.DenseVector)o
                );
            case "org.apache.spark.sql.catalyst.expressions.GenericRowWithSchema":
            case "org.apache.spark.sql.catalyst.expressions.GenericRow":
            case "org.apache.spark.sql.Row":
                return new  org.eclairjs.nashorn.wrap.sql.Row(
                        (org.apache.spark.sql.Row)o
                );
            case "org.apache.spark.sql.Dataset":
                return new  org.eclairjs.nashorn.wrap.sql.Dataset(
                        (org.apache.spark.sql.Dataset)o
                );
            case "org.apache.spark.sql.streaming.DataStreamReader":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.DataStreamReader(
                        (org.apache.spark.sql.streaming.DataStreamReader)o
                );
            case "org.apache.spark.sql.streaming.DataStreamWriter":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.DataStreamWriter(
                        (org.apache.spark.sql.streaming.DataStreamWriter)o
                );
            case "org.apache.spark.sql.streaming.SinkStatus":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.SinkStatus(
                        (org.apache.spark.sql.streaming.SinkStatus)o
                );
            case "org.apache.spark.sql.streaming.SourceStatus":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.SourceStatus(
                        (org.apache.spark.sql.streaming.SourceStatus)o
                );
            case "org.apache.spark.sql.streaming.StreamingQueryInfo":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.StreamingQueryStatus(
                        (org.apache.spark.sql.streaming.StreamingQueryStatus)o
                );
            case "org.apache.spark.sql.streaming.StreamingQueryManager":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.StreamingQueryManager(
                        (org.apache.spark.sql.streaming.StreamingQueryManager)o
                );
            case "org.apache.spark.sql.streaming.StreamingQuery":
            case "org.apache.spark.sql.execution.streaming.StreamExecution":
                return new  org.eclairjs.nashorn.wrap.sql.streaming.StreamingQuery(
                        (org.apache.spark.sql.streaming.StreamingQuery)o
                );
            case "org.apache.spark.api.java.JavaRDD":
                return new org.eclairjs.nashorn.wrap.RDD((org.apache.spark.api.java.JavaRDD) o);
            case "org.apache.spark.api.java.JavaPairRDD":
                return new org.eclairjs.nashorn.wrap.PairRDD((org.apache.spark.api.java.JavaPairRDD) o);
            case "org.apache.spark.api.java.JavaDoubleRDD":
                return new org.eclairjs.nashorn.wrap.FloatRDD((org.apache.spark.api.java.JavaDoubleRDD) o);
            case "java.sql.Timestamp":
                return new  org.eclairjs.nashorn.wrap.sql.SqlTimestamp(
                        (java.sql.Timestamp)o
                );
            case "java.sql.Date":
                return new  org.eclairjs.nashorn.wrap.sql.SqlDate(
                        (java.sql.Date)o
                );
            case "scala.Tuple2":
                return new  org.eclairjs.nashorn.wrap.Tuple2(
                        (scala.Tuple2)o
                );
            case "scala.Tuple3":
                return new  org.eclairjs.nashorn.wrap.Tuple3(
                        (scala.Tuple3)o
                );
            case "scala.Tuple4":
                return new  org.eclairjs.nashorn.wrap.Tuple4(
                        (scala.Tuple4)o
                );
            case "scala.Tuple5":
                return new  org.eclairjs.nashorn.wrap.Tuple5(
                        (scala.Tuple5)o
                );
            case "scala.collection.convert.Wrappers.IterableWrapper":
            {
                scala.collection.convert.Wrappers.IterableWrapper iterable=
                        (scala.collection.convert.Wrappers.IterableWrapper) o;
                Iterator iterater=iterable.iterator();
                List newList=new ArrayList<>();
                while (iterater.hasNext())
                    newList.add(Utils.javaToJs(iterater.next(),engine));
                return Utils.createJavaScriptObject(newList); // FIXME replace JavaScript wrapper with Java
            }
            default:
                if (o.getClass().isArray())
                {

                    List from=null;
                    if (o instanceof int[] || o instanceof double[] || o instanceof String[])
                    {
                        return Utils.toJsArray(o);
                    } else {
                        from = Arrays.asList((Object[]) o);
                        alist = new ArrayList(from.size());
                        for (int i = 0; i < from.size(); i++) {
                            alist.add(javaToJs(from.get(i), engine));
                        }
                        return Utils.toJsArray(alist.toArray());
                    }

                } else {
                    return Utils.createJavaScriptObject(o); //FIXME we should move this from JavaScript to Java
                }
           //throw new RuntimeException("java2js NOT HANDLED:"+packageName);

        }

       // return o;
    }


     public static Object jsToJava(Object o) {
		if(o != null && !(o instanceof Undefined )) {
			logger.debug("jsToJava" + o.getClass().getName());
		} else {
            return o;
        }
         if (o instanceof jdk.nashorn.internal.objects.NativeArray) {
             Object array[] =  ((NativeArray) o).asObjectArray();
             ArrayList al = new ArrayList();
             for (int i = 0; i < array.length; i++) {
                 al.add(jsToJava(array[i]));
             }
             return al.toArray();
         }
        if ( o.getClass().isPrimitive())
            return o;

         String packageName=o.getClass().getCanonicalName();

         switch (packageName) {
             case "java.lang.String":
             case "java.lang.Integer":
             case "java.lang.Float":
             case "java.lang.Double":
             case "java.lang.Boolean":
             case "java.lang.Long":
             case "org.json.simple.JSONObject":
             case "java.lang.Object[]":
             case "java.lang.String[]":
             case "scala.Tuple2":
             case "scala.Tuple3":
             case "scala.Tuple4":
                return o;
         }
         if (packageName.startsWith("org.apache.spark"))
             return o;

         if (o instanceof WrappedClass)
             return ((WrappedClass)o).getJavaObject();

    	if (o instanceof ScriptObjectMirror ) {
			ScriptObjectMirror m = (ScriptObjectMirror)o;
            if (m.hasMember("getJavaObject")) {
                return m.callMember("getJavaObject");
            }
			if(m.isArray()) {
                try {
                    if (m.containsKey("0")) {
                        Object v = m.get("0");
                        if (v instanceof Double) {
                            double[] doubleArray = (double[]) ScriptUtils.convert(m, double[].class);
                            return doubleArray;
                        } else if (v instanceof Integer) {
                            int[] intArray = (int[]) ScriptUtils.convert(m, int[].class);
                            return intArray;
                        } else {
                            Object[] objectArray = (Object[]) ScriptUtils.convert(m, Object[].class);
                            return objectArray;
                        }
                    }
                } catch (ClassCastException e) {
                    /*
                    If the array contains ScriptObjectMirror the above conversions throws exception
                    so we have to convert the contents of the array as well.
                     */
                    ArrayList list = new ArrayList();
                    for(Object item : m.values()) {
                        list.add(jsToJava(item));
                    }
                    Object x = list.toArray();
                    return x;
                }

			} else {
  //               throw new RuntimeException("js2java IMPLEMENT"+o);
                Object obj = ScriptObjectMirror.wrapAsJSONCompatible(o, null);
                String j = JSONValue.toJSONString(obj);
                return JSONValue.parse(j);
            }
		} else if (o instanceof jdk.nashorn.internal.runtime.ScriptObject){
            ScriptObjectMirror jsObj = ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) o);
            if (jsObj.hasMember("getJavaObject")) {
                return jsObj.callMember("getJavaObject");
            }
        }
        else  if (o instanceof java.util.ArrayList)
        {

            ArrayList list = (ArrayList) o;
            int size=list.size();
            for (int i=0;i<size;i++)
                list.set(i,jsToJava(list.get(i)));
            return list;
        }
        else if (o instanceof StaticClass) {
            return o;
        }
         logger.warn("js2java NOT HANDLED "+packageName);
         return o; // Just return the Java object, it might user created like java.net.Socket
         //new RuntimeException().printStackTrace();
         //throw new RuntimeException("js2java NOT HANDLED "+packageName);

    }

    private static Object wrapObject(Object o) {
    	Logger logger = Logger.getLogger(Utils.class);
        if(o instanceof String ||
           o instanceof Number) {
            return o;
        }
        logger.debug("wrapAsJSONCompatible " + o);
        return ScriptObjectMirror.wrapAsJSONCompatible(o,null);
    }

    public static String jarLoc() {
    	Logger logger = Logger.getLogger(Utils.class);
    	String jarPath = null;
    	Map<String, String> env = System.getenv();
    	jarPath = env.get("ECLAIR_JAR_LOC");
    	if (jarPath == null) {
    		String path = Utils.class.getProtectionDomain().getCodeSource().getLocation().getPath();
    		logger.info("jar path = " + path);
            String decodedPath = null;
    		try {
    			decodedPath = URLDecoder.decode(path, "UTF-8");
    		} catch (UnsupportedEncodingException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		jarPath = decodedPath;
    	}
    	logger.info("env = " + jarPath);
    	return jarPath;

    }

    /**
     * Takes an array of objects and returns a scala Seq
     * @param o {Object[]}
     * @return scala.collection.Seq
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Seq toScalaSeq(Object[] o) {
    	ArrayList list = new ArrayList();
    	for (int i = 0; i < o.length; i++) {
    		list.add(o[i]);
    	}
  		return scala.collection.JavaConversions.asScalaBuffer(list).toList();

    }

    /**
     * Zip up all files (or those that match filesToInclude[]) under a directory into a zipfile with the given name.
     * @param folderToZip {String} folder containing files to zip
     * @param zipFile {String} zipfile name for destination
     * @param filesToInclude {String[]} files to include - if omitted everything under folder will be zipped
     * @throws FileNotFoundException folder to zip up not found
     * @throws IOException problem in creating zipfile
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public static void zipFile(String folderToZip, String zipFile, String[] filesToInclude)
        throws FileNotFoundException, IOException {
        Logger logger = Logger.getLogger(Utils.class);
        logger.debug("zipFile: "+folderToZip);

        ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));    
        boolean excludeContainingFolder = false;

        File srcFile = new File(folderToZip);
        if(excludeContainingFolder && srcFile.isDirectory()) {
            for(String fileName : srcFile.list()) {
                addToZip("", folderToZip + "/" + fileName, zipOut, filesToInclude);
            }
        } else {
            addToZip("", folderToZip, zipOut, filesToInclude);
        }

        zipOut.flush();
        zipOut.close();
        logger.debug("Successfully created zipFile: " + zipFile);
    }

    private static void addToZip(String path, String srcFile, ZipOutputStream zipOut, String[] filesToInclude)
        throws IOException {        
        Logger logger = Logger.getLogger(Utils.class);
        int DEFAULT_BUFFER_SIZE = 4096;

        FileFilter filter = new FileFilter() {
            public boolean accept(File file) {
                if (Arrays.asList(filesToInclude).contains(file.getName()) || file.isDirectory()) {
                    return true;
                } else {
//                    logger.debug("Skipping not including in zipfile: "+file.getName());
                }
                return false;
            }
        };

        File file = new File(srcFile);
        String filePath = "".equals(path) ? file.getName() : path + "/" + file.getName();
        if (file.isDirectory()) {
            for (File childFile : file.listFiles(filter)) {
                addToZip(filePath, srcFile + "/" + childFile.getName(), zipOut, filesToInclude);
            }
        } else {
             logger.debug("Adding to zipfile: "+filePath);

            zipOut.putNextEntry(new ZipEntry(filePath));
            FileInputStream in = new FileInputStream(srcFile);

            byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
            int len;
            while ((len = in.read(buffer)) != -1) {
                zipOut.write(buffer, 0, len);
            }
            in.close();
        }
    }

    public static void unzipFile(String zipfile, String directory) throws IOException {
        Logger logger = Logger.getLogger(Utils.class);
        int DEFAULT_BUFFER_SIZE = 4096;

        logger.debug("Going to try and unzip: " + zipfile);

        ZipFile zfile = new ZipFile(zipfile);
        Enumeration<? extends ZipEntry> entries = zfile.entries();
        while (entries.hasMoreElements()) {
            ZipEntry entry = entries.nextElement();
            logger.debug("Extracting: " +entry.getName());

            File file = new File(directory, entry.getName());
            if (entry.isDirectory()) {
                file.mkdirs();
            } else {
                file.getParentFile().mkdirs();
                InputStream in = zfile.getInputStream(entry);
                OutputStream out = new FileOutputStream(file);
                try {
                    byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
                    while (true) {
                        int readCount = in.read(buffer);
                        if (readCount < 0) {
                            break;
                        }
                        out.write(buffer, 0, readCount);
                    }
                } finally {
                    in.close();
                }
            }
        }
    }

    public static void unzipChildren(String zipfilePrefix, String directory) throws IOException {
        Logger logger = Logger.getLogger(Utils.class);
        
        logger.debug("UNZIP CHILDREN FOR PREFIX: " + zipfilePrefix);
        FileFilter filter = new FileFilter() {
            public boolean accept(File file) {
                if (file.getName().startsWith(zipfilePrefix)) {
                    logger.debug("Unzipping zipfile: "+file.getName());
                    return true;
                } 
                return false;
            }
        };

        File dir = new File(directory);
        for (File childFile : dir.listFiles(filter)) {
            unzipFile(childFile.getName(), directory);
        }
    }

    public static String jsonString(Map<String, Object> map) {
        StringBuffer sb = new StringBuffer("{ ");
        boolean wasOne=false;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            if (wasOne)
                sb.append(" ,");
            sb.append(" \"").append(entry.getKey()).append("\" : ");
            Object value = entry.getValue();
            if (value instanceof String)
                sb.append('"');
            sb.append(value);
            if (value instanceof String)
                sb.append('"');
            wasOne=true;
        }
        sb.append(" } ");
        return sb.toString();
    }

    public static String formatDouble(Double v) {
        try {
            DecimalFormat df = new DecimalFormat();
            df.setGroupingUsed(false);
            df.setMaximumFractionDigits(12);
            return df.format(v);
        } catch (java.lang.IllegalArgumentException e) {
            return  v.toString();
        }
    }

    public static String JsonStringify(Object o) {
        String jsonStr = null;
        if (o == null) {
            return "";
        }
        try {
            Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
            jsonStr = (String) invocable.invokeFunction("objectToJsonString", o);
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return jsonStr;

    }

    public static Object createJavaScriptObject(Object o) {
        /*
        FIXME we should be able to remove this once all the Spark objects are
        wrappered by Java
         */
        Object obj = null;
        try {
            Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
            obj =  invocable.invokeFunction("createJavaScriptSparkObject", o);
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return obj;
    }

    public static Object createLambdaFunction(Object func, Object clazz, Object bindArgs) {
        /*
        FIXME we might be able to move this from JavaScript to Java once we have converted all the
        wrappper objects to Java
         */
        Object obj = null;
        try {
            Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
            Object params[] = {func, clazz, null, bindArgs};
            obj = invocable.invokeFunction("createLambdaFunction", params);
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return obj;
    }


    public static Object createLambdaFunction(Object func, Object clazz, Object context, Object bindArgs) {
        /*
        FIXME we might be able to move this from JavaScript to Java once we have converted all the
        wrappper objects to Java
         */
        Object obj = null;
        try {
            Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
            Object params[] = {func, clazz, context, bindArgs};
            obj = invocable.invokeFunction("createLambdaFunction", params);
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return obj;
    }

    public static Object createLambdaFunction(Object func, Object clazz, Object context, Object bindArgs, org.apache.spark.sql.Encoder encoder) {
        /*
        FIXME we might be able to move this from JavaScript to Java once we have converted all the
        wrappper objects to Java
         */
        Object obj = null;
        try {
            Invocable invocable = (Invocable) NashornEngineSingleton.getEngine();
            Object params[] = {func, clazz, context, bindArgs, encoder};
            obj = invocable.invokeFunction("createLambdaFunction", params);
        } catch (java.lang.Exception e) {
            e.printStackTrace();
        }
        return obj;
    }


    public static Object[] convertBindArgs(Object bindArgs,SparkContext sc) {

        if (bindArgs!=null)
        {
            boolean inJar=true;
            Object[] bindArr=(Object[])ScriptUtils.convert(bindArgs,Object[].class);
            for (int i=0;i<bindArr.length;i++)
            {
                if (ModuleUtils.isModule(bindArr[i]))
                {
                    ScriptObjectMirror som = ModuleUtils.getRequiredFile(bindArr[i]);
//                    som=(ScriptObjectMirror)ScriptObjectMirror.wrapAsJSONCompatible(som,null);
//                    String j = JSONValue.toJSONString(som);
                    String j = toJSON(som);
                    JSONObject json= null;
                    try {
                        json = (JSONObject) new JSONParser().parse(j);
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    Object v=json.get("core");
                    if (v instanceof Boolean && ((Boolean)v).booleanValue())
                    {}
                    else
                        inJar=false;
                    bindArr[i]=json;

                }
                else
                {
                    bindArr[i]=Utils.jsToJava(bindArr[i]);
                }
            }
            if (!inJar  && !sc.isLocal())
            {
                ModuleUtils.addCustomFiles(sc);
            }
            return bindArr;
        }
        return null;
    }

    public static String toJSON(ScriptObjectMirror som)
    {
        som=(ScriptObjectMirror)ScriptObjectMirror.wrapAsJSONCompatible(som,null);
        Map hashmap=new HashMap<>();
        for (Map.Entry<String, Object> entry : som.entrySet()) {
            String key = entry.getKey().toString();
            Object value = entry.getValue();
            boolean ignore=false;
            if (value!=null)
            {
                String clsName=value.getClass().getName().toString();
                switch (clsName) {
                    case "java.lang.String":
                    case "java.lang.Boolean":
                    case "java.lang.Long":
                    case "java.lang.Float":
                    case "java.lang.Double":
                        ignore=false;
                        break;
                    default:
                        ignore=true;


                }
            }
            if (!ignore)
                hashmap.put(key,value);
        }
        String j = JSONValue.toJSONString(hashmap);
        return j;
    }


    public static Map createJavaHashMap(Object map) {

        ScriptObjectMirror jsObject=null;
        if (map instanceof jdk.nashorn.internal.runtime.ScriptObject)
          jsObject=ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) map);
        else if (map instanceof ScriptObjectMirror)
            jsObject = (ScriptObjectMirror)map;
        else
            throw new RuntimeException("not a script object");


            Map hashmap=new HashMap<>();
        for (Map.Entry<String, Object> entry : jsObject.entrySet()) {
            String key = entry.getKey().toString();
            String value = entry.getValue().toString();

            hashmap.put(key,value);
        }
        return hashmap;
    }

    public static int toInt(Object num) {
        int x;
         if (num instanceof Long) {
            x = ((Long) num).intValue();
        } else if (num instanceof Double) {
             x = ((Double) num).intValue();
         } else if (num instanceof String) {
            x = Integer.getInteger((String) num);
        } else {
            x = (int) num;
        }
        return x;
    }

    public static long toLong(Object num) {
        long x;
        if (num instanceof Integer) {
            x = ((Integer) num).longValue();
        } else if (num instanceof Double) {
            x = ((Double) num).longValue();
        } else {
            x = (long) num;
        }
        return x;
    }

    public static double toDouble(Object num) {
        double x;
        if (num instanceof Long) {
            x = ((Long) num).doubleValue();
        } if (num instanceof Integer) {
            x = ((Integer) num).doubleValue();
        } else if (num instanceof String) {
            x = Double.parseDouble((String) num);
        } else {
            x = (double) num;
        }
        return x;
    }

    public static int [] toIntArray(Object arr) {
        if (arr instanceof NativeArray)
            arr=ScriptUtils.wrap((NativeArray)arr);
        if (arr instanceof ScriptObjectMirror) {
            ScriptObjectMirror m = (ScriptObjectMirror) arr;
            if (m.isArray()) {
                try {
                    int[] intArray = (int[]) ScriptUtils.convert(m, int[].class);
                    return intArray;
                } catch (ClassCastException e) {
                    /*
                    If the array contains ScriptObjectMirror the above conversions throws exception
                    so we have to convert the contents of the array as well.
                     */
                    ArrayList list = new ArrayList();
                    for (Object item : m.values()) {
                        list.add(jsToJava(item));
                    }
                    Object x = list.toArray();
                    return (int[]) x;
                }

            }
        }
        throw new RuntimeException("expecting array, got " + arr);
    }

    private static Object smToArray(ScriptObjectMirror m )
    {
        ArrayList list = new ArrayList();
        for (Object item : m.values()) {
            list.add(jsToJava(item));
        }
        return  list.toArray();
    }

    public static double [] toDoubleArray(Object arr) {
        if (arr instanceof NativeArray)
            arr=ScriptUtils.wrap((NativeArray)arr);
        if (arr instanceof ScriptObjectMirror) {
            ScriptObjectMirror m = (ScriptObjectMirror) arr;
            if (m.isArray()) {
                try {
                    double[] doubleArray = (double[]) ScriptUtils.convert(m, double[].class);
                    return doubleArray;
                } catch (ClassCastException e) {
                    /*
                    If the array contains ScriptObjectMirror the above conversions throws exception
                    so we have to convert the contents of the array as well.
                     */
                    return (double[]) smToArray(m);
                }

            }
        }
        throw new RuntimeException("expecting array, got " + arr);
    }

    public static Object [] toObjectArray(Object arr) {
        if (arr instanceof ScriptObjectMirror) {
            ScriptObjectMirror m = (ScriptObjectMirror) arr;
            if (m.isArray()) {
                try {
                    Object[] objectArray = (Object[]) ScriptUtils.convert(m, Object[].class);
                    Object[] uwArray=new Object[objectArray.length];
                    for (int i=0;i<objectArray.length;i++)
                        uwArray[i]=jsToJava(objectArray[i]);
                    return uwArray;
                } catch (ClassCastException e) {
                    /*
                    If the array contains ScriptObjectMirror the above conversions throws exception
                    so we have to convert the contents of the array as well.
                     */
                    return (Object[])smToArray(m);
                }

            }
        }
        else if (arr instanceof jdk.nashorn.internal.objects.NativeArray) {
            Object array[] =  ((NativeArray) arr).asObjectArray();
            ArrayList al = new ArrayList();
            for (int i = 0; i < array.length; i++) {
                al.add(jsToJava(array[i]));
            }
            return al.toArray();
        }
        else
        {
            if (arr.getClass().isArray())
            {
                Object[] o = (Object[])arr;
                Object [] newArr=new Object[o.length];
                for (int i = 0; i < o.length; i++) {
                    newArr[i]=jsToJava(o[i]);
                }
                return newArr;
            }
        }

        throw new RuntimeException("expecting array, got " + arr);

    }

    public static Object[] varArgsObjectArray(Object [] args, int index)
    {
        int len=args.length-index;
        Object [] varArgs=new Object[len];
        System.arraycopy(args,index,varArgs,0,len);
        return toObjectArray(varArgs);
    }


    public static Object [] removeUndefinedArgs(Object []args) {

        int last=args.length-1;
        while (last>=0)
        {
            if (!args[last].toString().equals("undefined"))
                break;
            last--;
        }
        if (last!=args.length-1)
        {
            last++;
            Object[]newArgs=new Object[last];
            System.arraycopy(args,0,newArgs,0,last);
            return newArgs;
        }
        else
            return args;
    }

    public static String [] toStringArray(Object obj) {
        return  Arrays.stream(Utils.toObjectArray(obj)).toArray(String[]::new);

    }

    public static String [] toStringArray(Object []arr) {
        return Arrays.stream(arr).toArray(String[]::new);
    }


    public static boolean isJSArray(Object jsObject)
    {
        if (jsObject instanceof NativeArray)
            return true;
        if ((jsObject instanceof ScriptObjectMirror) && ((ScriptObjectMirror)jsObject).isArray())
            return true;
        if (jsObject.getClass().isArray())
            return true;
        return false;
    }

    public static Object toObject(Object obj) {
        return toObject(obj,true);
    }

    public static Object toObject(Object obj,boolean throwException) {
        if (obj instanceof WrappedClass)
            return ((WrappedClass)obj).getJavaObject();

        if (obj instanceof ScriptObjectMirror ) {
            ScriptObjectMirror m = (ScriptObjectMirror) obj;
            if (m.hasMember("getJavaObject")) {
                return m.callMember("getJavaObject");
            }
        }
        else if (obj instanceof jdk.nashorn.internal.runtime.ScriptObject)
        {
            jdk.nashorn.internal.runtime.ScriptObject scriptObject=
                    (jdk.nashorn.internal.runtime.ScriptObject)obj;

            Object t = scriptObject.get("getJavaObject");

            if (t instanceof ScriptFunction)
            {
                return ScriptRuntime.apply((ScriptFunction) t, scriptObject);
            }
//                    scriptObject.


        }
        if (throwException)
            throw new RuntimeException("expecting spark object, got " + obj);
        else
            return null;
    }

    public static Object toJsArray(Object javaArray) {
        Object jsArray  = javaArray;
        ScriptEngine engine = NashornEngineSingleton.getEngine();
        try {
            String func = "function(javaArray){return Java.from(javaArray)}";
            Object fn = engine.eval(func);
            Object params[] = {jsArray};
            jsArray = ((ScriptObjectMirror) fn).call(null, params);

        } catch (ScriptException e) {
            e.printStackTrace();
        }
        return jsArray;
    }

    public static byte[] toByteArray(Object obj)
    {
        if (obj instanceof Object[])
        {

            Object[] arr=(Object[])obj;
            byte [] byteArr=new byte[arr.length];
            for (int i=0;i<arr.length;i++)
            {
                if (arr[i] instanceof Integer)
                {
                    byteArr[i]=((Integer)arr[i]).byteValue();
                }
                else if (arr [i]instanceof Double)
                {
                    byteArr[i]=((Double)arr[i]).byteValue();

                }
                else throw  new RuntimeException("cant convert to byte - "+arr[i]);
            }
            return byteArr;
        } else throw new RuntimeException("not an array"+obj);

    }
}


