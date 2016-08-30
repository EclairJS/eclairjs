package org.eclairjs.nashorn;
import jdk.internal.dynalink.beans.StaticClass;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.runtime.ScriptObject;
import org.apache.log4j.Logger;
import org.apache.spark.SparkContext;
import org.json.simple.JSONObject;
import scala.Tuple2;

import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ModuleUtils {

    static HashMap<String,Object> modules=new HashMap<>();
    static Logger logger = Logger.getLogger(ModuleUtils.class);


    public static boolean isModule(JSONObject json)
    {
        return json.containsKey("modname");

    }

    public static boolean isModule(Object obj)
    {
        ScriptObjectMirror som=null;
        if (obj instanceof ScriptObject)
        {
            som= ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) obj);
        } else if (obj instanceof ScriptObjectMirror)
            som=(ScriptObjectMirror)obj;
        if (som!=null)
        {
            if (som.isFunction())
            {
                Object mod = ModuleUtils.getRequiredFileByExport(som);
                return mod!=null;

            }
            return som.hasMember("modname");
        }
        if (obj instanceof StaticClass)
        {
            String modID=fincCacheValue(obj);
            return modID!=null;
        }

        return false;
    }

    public static Object getRequiredFile(JSONObject module,ScriptEngine engine) {
        String name = "";
        if (module.containsKey("modname"))
            name=(String)module.get("modname");

        Object requiredMod=modules.get(name);
        if (requiredMod==null) {
            //print("ModuleUtils.getRequiredFile file not found - going to try and load");
            // this could be a worker node - try and load it
            requiredMod = ModuleUtils._tryToLoadFile(module,engine);

        }
        return requiredMod;
/*
        Object obj= engine.get("ModuleUtils");
        if (obj instanceof ScriptObjectMirror)
        {
            ScriptObjectMirror moduleUtils=(ScriptObjectMirror)obj;
            obj=moduleUtils.get("getRequiredFile");
            if (obj instanceof ScriptObjectMirror)
            {
                ScriptObjectMirror getRequiredFile=(ScriptObjectMirror)obj;
                getRequiredFile.call(null);
            }
        }
        return null;
*/

    }
     static Object _tryToLoadFile (JSONObject mod,ScriptEngine engine) {
        //print('ModuleUtils._tryToLoadFile: '+mod.toString());
logger.warn("_tryToLoadFile"+mod);
        try {
            //var e = org.eclairjs.nashorn.NashornEngineSingleton.getEngine();
            boolean doRequire = true;

            // Save off any exportname that has been determined by master as it will be lost once
            // require is envoked again to load module on worker node.
            String expname = "";
            if (mod.containsKey( "exportname"))
                expname=(String)mod.get("exportname");

            if (mod.containsKey("core")) {
//                // Module is part of JAR but not part of Bootstrap so have to manually load.
//                String filename = ModuleUtils.getResourcePath((String)mod.get("id"));
//                engine.eval("load('" + filename + "');");

            } else {
//                // If the required file is NOT on classpath (e.g. core file part of JAR) then it was
//                // downlaoded to the worker node via SparkContext.addFile and we have to get it via
//                // SparkFiles to find it's absolute path and then manually load it as it was not part
//                // of bootstrap process for the NashronSingletonEngine running on worker node.
//                var filename = mod.modname + ModuleUtils._getModuleExtension(mod.id);
//                if (mod.inFolder) {
//                    // Note: For now using one big zipfile for all custom modules. In future may
//                    // revert back to single zips for only modules we need for that worker node.
//                    //var abspath = org.apache.spark.SparkFiles.get(mod.zipfile);
//                    var abspath = org.apache.spark.SparkFiles.get(ModuleUtils.defaultZipFile);
//                    //print("*******ModuleUtils._tryToLoadFile zipfile abspath: "+abspath);
//                    try {
//                        // Note: For now using one big zipfile for all custom modules (see above note).
//                        org.eclairjs.nashorn.Utils.unzipFile(abspath, ".");
//                        //print("Going to try and unzip kids: "+mod.zipfile.replace(".zip", "_child_"));
//                        //org.eclairjs.nashorn.Utils.unzipChildren(mod.zipfile.replace(".zip", "_child_"), ".");
//                        //print("Going to try and load file from unzipped file: "+filename);
//                        load(filename);
//                    } catch (exc) {
//                        print("Cannot unzipFile and loadfile: "+abspath);
//                        print(exc);
//                        doRequire = false;
//                    }
//                } else {
//                    var abspath = org.apache.spark.SparkFiles.get(filename);
//                    //print("*******ModuleUtils._tryToLoadFile that is not in zipfile abspath: "+abspath);
//                    //e.eval("load('" + abspath + "');");
//                    load(abspath);
//                }
            }

            if (doRequire) {
                // If this is worker node then required module needs to pass thru jvm-npm so it's
                // exports are made "live"/available to lambdas thus we have to simulate "require".
                String reqAddOn ="";
                if (mod.containsKey("exportname")) {
                    String exportname = (String) mod.get("exportname");
                    if (exportname.length() > 0 ) {
                        reqAddOn = "." + (String) mod.get("exportname");
                    }
                }
                //print("About to try and eval/require: "+"require('" + mod.modname + "')"+reqAddOn+";");
                Object obj=engine.eval("require('" + mod.get("modname") + "')"+reqAddOn+";");
                modules.put((String)mod.get("modname"),obj);
                return obj;
            }

            // Before returing set the exportname in the new Module instance so worker node had it too.
//            if (ModuleUtils.requires[mod.modname]) {
//                ModuleUtils.requires[mod.modname].setExportName(expname);
//            }
//            return ModuleUtils.requires[mod.modname];
        } catch(Exception ex) {
            logger.error("Cant load module",ex);
        }
        return null;
    };

       static String getResourcePath(String filename) throws URISyntaxException {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        return classloader.getResource(filename).toURI().toString();
    };




    static String defaultZipFile = "modules.zip";

//    ModuleUtils.addRequiredFile = function(module) {
//        var logger= org.apache.log4j.Logger.getLogger("org.eclairjs.nashorn.resource.ModuleUtils_js");
//        if (ModuleUtils.requires[module.modname]) {
//            logger.debug("ModuleUtils.addRequiredFile - Module already required: "+module.modname);
//        } else {
//            // include the path
//            logger.debug("ModuleUtils.addRequiredFile - ADDING MODULE: "+module.modname);
//            // logger.debug("WITH BODY: "+module.body);
//            ModuleUtils.requires[module.modname] = module;
//        }
//    };
//
    static ScriptObjectMirror getRequiredFile(Object module) {

        ScriptObjectMirror som=null;
        String name=null;
        if (module instanceof ScriptObject)
        {
            som= ScriptUtils.wrap((jdk.nashorn.internal.runtime.ScriptObject) module);
        } else if (module instanceof ScriptObjectMirror)
            som=(ScriptObjectMirror)module;

        if (som!=null)
        {
            if (som.isFunction())
            {
                return ModuleUtils.getRequiredFileByExport(som);

            }
            if (som.hasMember("modname"))
                name=(String)som.callMember("modname");
        }
        else if (module instanceof StaticClass)
        {
                return getRequiredFileByExport((StaticClass)module);
        }

        if (module instanceof String)
            name=(String)module;


        if (name!=null && !"undefined".equals(name))
        {
            ScriptObjectMirror requiredMod = ModuleUtils.getRequires(name);
            if (requiredMod==null) {
                //print("ModuleUtils.getRequiredFile file not found - going to try and load");
                // this could be a worker node - try and load it
//                requiredMod = ModuleUtils._tryToLoadFile(module);
            }
            return requiredMod;

        }
        return null;
    };


    static ScriptObjectMirror _requires;
    static ScriptObjectMirror requires()
    {
        if (_requires!=null)
            return  _requires;
        ScriptEngine engine =  NashornEngineSingleton.getEngine();

        try {
            _requires=(ScriptObjectMirror)engine.eval("ModuleUtils.requires");
        } catch (ScriptException e) {
            e.printStackTrace();
        }
        return _requires;
    }

    static ScriptObjectMirror getRequires(String name)
    {
        Object obj=requires().getMember(name);
        if (obj instanceof ScriptObjectMirror)
            return (ScriptObjectMirror)obj;
        else
            return null;
    }


    static ScriptObjectMirror getRequiredFileById(String modid) {
        ScriptObjectMirror requires = requires();

        //print("ModuleUtils.getRequiredFileById for modid: "+modid);
        for ( Map.Entry<String,Object> entry : requires.entrySet()) {
           if (entry.getValue() instanceof ScriptObjectMirror)
           {
               ScriptObjectMirror som = (ScriptObjectMirror)entry.getValue();
               Object o=som.getMember("id");
               if (modid.equals(o))
                   return som;
           }
            else
           {
               throw new RuntimeException("should not happen");
           }
        }
        return null;
    };


    static ScriptObjectMirror _cache;
    static ScriptObjectMirror cache()
    {
        if (_cache!=null)
            return  _cache;
        ScriptEngine engine =  NashornEngineSingleton.getEngine();

        try {
            _cache=(ScriptObjectMirror)engine.eval("require.cache");
        } catch (ScriptException e) {
            e.printStackTrace();
        }
        return _cache;
    }


    static String fincCacheValue(Object obj) {
        // This is a little bit of a hack - require is defined in jvm-npm but
        // caches any exports for any already required modules. We don't want to add
        // exports to the Module's metadata that is stored in ModuleUtils.requires so
        // it doesn't get Serialized as part of bound lambda argument.

        ScriptObjectMirror cache = cache();
        if (cache != null) {
            for (Map.Entry<String, Object> entry : cache.entrySet()) {
                if (obj.equals(entry.getValue()))
                    return entry.getKey();
            }
        }
        return null;
    }

    static Tuple2<String,String> getModIdFromExport(ScriptObjectMirror func) {
        // This is a little bit of a hack - require is defined in jvm-npm but
        // caches any exports for any already required modules. We don't want to add
        // exports to the Module's metadata that is stored in ModuleUtils.requires so
        // it doesn't get Serialized as part of bound lambda argument.

        ScriptObjectMirror cache=cache();
        if (cache!=null) {
            for ( Map.Entry<String,Object> entry : cache.entrySet()) {
//                System.out.println(entry.getKey()+"="+entry.getValue());
                  Object value=entry.getValue();
                  if (value instanceof ScriptObjectMirror )
                  {
                      ScriptObjectMirror som = (ScriptObjectMirror)value;
                      if (som.isFunction() &&som.equals(func))
                        return new Tuple2<>(entry.getKey(),null);
//                    return {modid: modid};
                      else
                      {
                          for ( Map.Entry<String,Object> member : som.entrySet()) {

                              Object o=member.getValue();
                              if ((o instanceof ScriptObjectMirror) && ((ScriptObjectMirror)o).isFunction()
                                  && o.equals(func))
                              return new Tuple2<>(entry.getKey(),member.getKey());
                              //                            return {modid: modid, expname: exp};

                          }

                      }

                  }
//                if ((typeof cache[modid] === "function") && (cache[modid].toString() === func.toString())) {
//                } else if (typeof cache[modid] === "object"){
//                    for (var exp in cache[modid]) {
//                        //print("cache[modid][exp]: "+cache[modid][exp]);
//                        if (typeof cache[modid][exp] === "function" && cache[modid][exp].toString() === func.toString()) {
//                            return {modid: modid, expname: exp};
//                        }
//                    }
//                }
            }
        }
        return  null;
    }

    static ScriptObjectMirror getRequiredFileByExport(ScriptObjectMirror func) {
        if (logger.isDebugEnabled())
            logger.debug("getRequiredFileByExport"+func.toString());
        Tuple2<String,String> expModid = getModIdFromExport(func) ;
        if (expModid!=null)
        {
            ScriptObjectMirror mod= ModuleUtils.getRequiredFileById(expModid._1());
            if (mod!=null) {
                String exprName=expModid._2();
                if (exprName!=null)
                    mod.callMember("setExportName",exprName);
                return mod;
            }

        }
        return null;
    };

    static ScriptObjectMirror getRequiredFileByExport(StaticClass obj) {
        if (logger.isDebugEnabled())
            logger.debug("getRequiredFileByExport"+obj.toString());
        String modId = fincCacheValue(obj) ;
        if (modId!=null)
        {
            ScriptObjectMirror mod= ModuleUtils.getRequiredFileById(modId);
                return mod;

        }
        return null;
    };

    static boolean customModsAdded;
    public static void addCustomFiles(SparkContext sc) {

        if (customModsAdded) {
            logger.debug(ModuleUtils.defaultZipFile + " has already been added for this SparkContext instance");
            return;
        }

        List<ScriptObjectMirror> mods = ModuleUtils.getModulesByType("core", false);
//        logger.debug("addingCustomModules: ",mods.toString());
        String folder = ".";
        String zipfile = ModuleUtils.defaultZipFile;
        List<String> filenames = new ArrayList<>();
        for (ScriptObjectMirror mod : mods) {
            String id = mod.get("id").toString();
            String name = id.substring(id.lastIndexOf("/")+1);
            filenames.add(name);
        };
        logger.debug("SparkContext.addCustomModules folder: "+folder);
        logger.debug("SparkContext.addCustomModules filenames: "+filenames.toString());
        try {
            org.eclairjs.nashorn.Utils.zipFile(folder, zipfile, filenames.toArray(new String[filenames.size()]));
            sc.addFile(zipfile);
            customModsAdded = true;
        } catch (Exception exc) {
            System.err.println("Cannot add non core modules: " + filenames.toString());
            exc.printStackTrace();
        }
    }

//    ModuleUtils.isModule = function(obj) {
//        //print("ModuleUtils.isModule obj: "+obj.toString());
//        if (typeof obj === "function") {
//            var mod = ModuleUtils.getRequiredFileByExport(obj);
//            return typeof mod !== "undefined";
//        }
//        return obj && obj.modname;
//    };
//
//    ModuleUtils.getModuleFromJavaPackageAndClass = function(packageName, className) {
//        var package = packageName ? packageName.split("org.apache.spark.") : [];
//        className = className || "";
//
//        var modname = (package.length > 1 ? package[1].replace(".", "\/")+"\/" : "") + className;
//        //print("----->getModuleFromJavaPackageAndClass modname: " + modname);
//
//        return ModuleUtils.requires[modname];
//    };
//
//    ModuleUtils.getParent = function(mod) {
//        //print("*****ModuleUtils.getParent for: "+mod.toString());
//        //print("*****ModuleUtils.getParent for parent: "+mod.parent);
//        return  ModuleUtils.getRequiredFileById(mod.parent ? mod.parent.id : "");
//    };
//
//
/*
 * Get any modules that match the given type/attribute.
 *
 * For example {type: "core", value: "true"} to find any core modules loaded from
 * the classpath.
 */
    static List<ScriptObjectMirror> getModulesByType(String type,Object value) {
        //print("getModuleByType: " + type + ":" + value);
        List<ScriptObjectMirror> list = new ArrayList<>();
        ScriptObjectMirror requires = requires();

        //print("ModuleUtils.getRequiredFileById for modid: "+modid);
        for ( Map.Entry<String,Object> entry : requires.entrySet()) {

            if (entry.getValue() instanceof ScriptObjectMirror)
            {
                ScriptObjectMirror som = (ScriptObjectMirror)entry.getValue();
                Object v = som.getMember(type);
                if (type.equals(v))
                    list.add(som);
            }
        }
        return list;
    };

///*
// * On worker node so have to try and manually find and load required required file
// * into the ScriptEngine (e.g. Nashorn).
// */
//
//    ModuleUtils._getModuleExtension = function(id) {
//        return id.slice(id.lastIndexOf("\."), id.length);
//    };
//
//    ModuleUtils._printRequires = function(msg) {
//        var output = "";
//        for (var name in ModuleUtils.requires) {
//            output += name + ': ' + ModuleUtils.requires[name]+'; ';
//        }
//        print("ModuleUtils.printRequires msg: "+(msg || ""));
//        print("ModuleUtils.printRequires output: "+output);
//    };
//

}
