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

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

import org.apache.log4j.Logger;
import org.apache.spark.SparkFiles;
import org.apache.spark.mllib.regression.LinearRegressionModel;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Row;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
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
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

/**
 * Created by bburns on 9/18/15.
 */
public class Utils {

    /*
    public static Object javaToJs(Object o) {
        if(o instanceof Tuple2) {
            Tuple2 t = (Tuple2)o;
            ArrayList l = new ArrayList();
            l.add(t._1());
            l.add(t._2());
            return l.toArray();
        } else
            return o;
    }
    */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	/*public static Object javaToJs(Object o, ScriptEngine engine) {
    	Logger logger = Logger.getLogger(Utils.class);
    	String packageName = null;
 		if(o != null) {
			logger.debug("javaToJs className " + o.getClass().getName());
			Package pack = o.getClass().getPackage();
			if (pack != null) {
	    		packageName = pack.getName();
	    	}
		}
 		*//*
 		 * Any object that belongs to Spark we will wrapper it with a JavaScript object
 		 * If we don't have a JavaScript wrapper for it then we will catch the
 		 * exception and just use the wrapObject method.
 		 *//*
		if ((packageName != null) && (packageName.indexOf("org.apache.spark") > -1)) {
			logger.debug("spark object");
			String className = o.getClass().getSimpleName();
    		try {
 	  			Invocable invocable = (Invocable) engine;
 	  			if (className.endsWith("$")) {
 	  				//anonymous class
 	  				logger.debug("getSuperClass for " + className);
 	  				className = o.getClass().getSuperclass().getSimpleName();
 	  			}
 	  			if ( className.equals("JavaRDD")) {
 	  				*//*
 	  				 * Map JavaRDD to RDD for JavaScript
 	  				 *//*
 	  				className = "RDD"; //o.getClass().getSimpleName();
 	  			} else if ( className.equals("JavaDoubleRDD")) {
 	  				*//*
 	  				 * Map JavaDoubleRDD to FloatRDD for JavaScript
 	  				 *//*
                    className = "FloatRDD"; //o.getClass().getSimpleName();
                } else if ( className.equals("JavaPairRDD")) {
 	  				*//*
 	  				 * Map JavaPairRDD to PairRDD for JavaScript
 	  				 *//*
                    className = "PairRDD"; //o.getClass().getSimpleName();
                } else if (className.equals("Word2Vec") || className.equals("Word2VecModel")) {
					if (packageName.indexOf("org.apache.spark.ml") > -1) {
						*//*
							ML
						 *//*
						className = "ML" + o.getClass().getSimpleName();
					}

				}
 	  			logger.debug("create " + className);
	  			Object params[] = {className, o};
	  			Object parm = invocable.invokeFunction("createJavaWrapperObject", params);
	  			logger.debug(parm);
	  			return parm;
  			} catch (Exception e) {
    			logger.warn(className + " convertion error, will just wrapObject " + e);
    			logger.debug(className + " javaToJs instanceof  " + o.getClass());
    			return wrapObject(o);
    		}

    	} else if(o == null) {
			return o;
    	} else if ((o instanceof Product) && (o.getClass().getName().indexOf("scala.Tuple") > -1))  {
            Product t = (Product)o;
			logger.info("Tuple3 - " + t.toString());
            Invocable invocable = (Invocable) engine;
			Object params[] = {"Tuple", o};

            try {
                Object parm = invocable.invokeFunction("createJavaWrapperObject", params);
                logger.debug("Tuple3= " + parm.toString());
                return parm;
            } catch  (ScriptException | NoSuchMethodException e) {
                logger.error(" Tuple conversion " + e);
            }
            return null;

		} else if (o instanceof IteratorWrapper) {
            logger.debug("Iterator " + o.toString());
        	ArrayList alist = new ArrayList();
        	while(((IteratorWrapper) o).hasMoreElements()) {
        		alist.add(javaToJs(((IteratorWrapper) o).nextElement(),engine));
        	}
        	return wrapObject(alist);
        } else if (o instanceof IterableWrapper) {
            logger.debug("Iterable " + o.toString());
            ArrayList alist = new ArrayList();
            Iterator iter=((IterableWrapper) o).iterator();
            while(iter.hasNext()) {
                alist.add(javaToJs(iter.next(),engine));
            }
            return wrapObject(alist);
        } else if (o.getClass().isArray()) {
			Object[] arr = (Object[])o;
			logger.debug("Array " + o.toString());
			ArrayList alist = new ArrayList();
			for(int i=0; i<arr.length; i++) {
				alist.add(javaToJs(arr[i], engine));
			}
			Object er = null;
			try {
				Object params[] = {alist};
				er = ((Invocable)engine).invokeFunction("createJavaScriptArray", params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error(" Array conversion " + e);
			}

			return er;
			//return wrapObject(alist);
		} else if (o instanceof JSONObject) {
        	Object er = null;
        	try {
        		logger.debug("JSONObject " + o.toString());
				Invocable invocable = (Invocable) engine;
				 Object params[] = {o.toString()};
				 er  = invocable.invokeFunction("convertJavaJSONObject",params);
			} catch (ScriptException | NoSuchMethodException e) {
				logger.error(" JSONObject convertion " + e);
			}
        	return er;
        } else {
        	logger.debug(" jsToJava wrapObject " + o);
            return wrapObject(o);
        }


    }*/

   /* public static Object jsToJava(Object o) {
    	Logger logger = Logger.getLogger(Utils.class);
		if(o != null) {
			logger.debug("jsToJava" + o.getClass().getName());
		}
    	if (o instanceof ScriptObjectMirror) {
			ScriptObjectMirror m = (ScriptObjectMirror)o;
			if(m.hasMember("getJavaObject") ) {
				Object r = m.callMember("getJavaObject");
				logger.debug("getJavaObject" + r.getClass().getName());
				return r;
			} else if(m.isArray()) {
				ArrayList list = new ArrayList();
				for(Object item : m.values()) {
					list.add(jsToJava(item));
				}
				return list;
			} else {
                Object obj = ScriptObjectMirror.wrapAsJSONCompatible(o, null);
                String j = JSONValue.toJSONString(obj);
                return JSONValue.parse(j);
            }
		} else if (o instanceof IteratorWrapper) {
			ArrayList alist = new ArrayList();
			while(((IteratorWrapper) o).hasMoreElements()) {
				alist.add(jsToJava(((IteratorWrapper) o).nextElement()));
			}
			 return alist;
		} else if (o instanceof IterableWrapper) {
			ArrayList alist = new ArrayList();
			Iterator iter=((IterableWrapper) o).iterator();
			while(iter.hasNext()) {
				alist.add(jsToJava(iter.next()));
			}
			return alist;
		} else if(o.getClass().isArray()) {
			Object[] arr = (Object[])o;

			for(int i=0; i<arr.length; i++) {
				Object item = arr[i];
				arr[i] = jsToJava(item);
			}

			return arr;
    	} else if(o instanceof JSObject) {
            Object obj = ScriptObjectMirror.wrapAsJSONCompatible(o, null);
            String j = JSONValue.toJSONString(obj);
            return JSONValue.parse(j);
        }

        return o;
    }*/

   /* public static String getUniqeFunctionName() {
        return "EXPORTEDFUNCTION" + java.util.UUID.randomUUID().toString().replace("-", "_");
    }*/

    /*public static ScriptEngine addScopeVarsToEngine(HashMap scopeVars, ScriptEngine engine) {

    	Logger logger = Logger.getLogger(Utils.class);
    	logger.debug("addScopeVarsToEngine");
    	if (scopeVars != null) {
        	Iterator it = scopeVars.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry pair = (Map.Entry)it.next();
                logger.debug("adding " + pair.getKey() + " value " + pair.getValue());
                engine.put((String)pair.getKey(), pair.getValue());
            }
    	}
    	return engine;
    }*/

    /*private static Object wrapObject(Object o) {
    	Logger logger = Logger.getLogger(Utils.class);
        if(o instanceof String ||
           o instanceof Number) {
            return o;
        }
        logger.debug("wrapAsJSONCompatible " + o);
        return ScriptObjectMirror.wrapAsJSONCompatible(o,null);
    }*/

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
    	logger.info("env = "+ jarPath);
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
                    logger.debug("Adding to zipfile: "+file.getName());
                    return true;
                } else {
                    logger.debug("Skipping not including in zipfile: "+file.getName());
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

        logger.debug("Going to try and unzip: "+zipfile);

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
        
        logger.debug("UNZIP CHILDREN FOR PREFIX: "+zipfilePrefix);
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

}
