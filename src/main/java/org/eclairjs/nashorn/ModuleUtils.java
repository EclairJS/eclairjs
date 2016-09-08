package org.eclairjs.nashorn;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.log4j.Logger;
import org.json.simple.JSONObject;

import javax.script.ScriptEngine;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.HashMap;

public class ModuleUtils {

    static HashMap<String,Object> modules=new HashMap<>();
    static Logger logger = Logger.getLogger(ModuleUtils.class);
    static String defaultZipFile = "modules.zip";

    public static boolean isModule(JSONObject json)
    {
        return json.containsKey("modname");

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
        //logger.debug("ModuleUtils._tryToLoadFile: "+mod.toString());
        //ModuleUtils._printRequires();

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
                // If there are any custom classes for lambdas they will be in 1 big zipfile
                // that are shipped to worker nodes.  First off make sure if it exists, it is
                // unzipped.
                String abspath = org.apache.spark.SparkFiles.get(ModuleUtils.defaultZipFile);
                logger.debug("abspath: "+abspath);
                try {
                    org.eclairjs.nashorn.Utils.unzipFile(abspath, ".");
                } catch(java.io.FileNotFoundException fnf) {
                    // This is fine - just means no custom modules were added
                    logger.debug(fnf.getMessage());
                } catch (Exception exc) {
                    logger.debug(exc.getMessage());
                }

                // If this is worker node then required module needs to pass thru jvm-npm so it's
                // exports are made "live"/available to lambdas thus we have to simulate "require".
                String reqAddOn ="";
                if (mod.containsKey("exportname")) {
                    String exportname = (String) mod.get("exportname");
                    if (exportname.length() > 0 ) {
                        reqAddOn = "." + (String) mod.get("exportname");
                    }
                }
                //logger.debug("About to try and eval/require: "+"require('" + mod.get("exportname") + "')"+reqAddOn+";");
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


    /*
//
//    ModuleUtils.defaultZipFile = "modules.zip";
//
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
//    ModuleUtils.getRequiredFile = function(module) {
//        if (typeof module === "function") {
//            return ModuleUtils.getRequiredFileByExport(module);
//        }
//
//        var name = typeof module === 'string' ? module : ((module && module.modname) ? module.modname : "");
//        //print("get requiredFile name: "+name);
//        //ModuleUtils._printRequires("From getRequiredFile");
//
//        var requiredMod = ModuleUtils.requires[name];
//        if (!requiredMod) {
//            //print("ModuleUtils.getRequiredFile file not found - going to try and load");
//            // this could be a worker node - try and load it
//            requiredMod = ModuleUtils._tryToLoadFile(module);
//        }
//        return requiredMod;
//    };
//
//    ModuleUtils.getRequiredFileById = function(modid) {
//        //print("ModuleUtils.getRequiredFileById for modid: "+modid);
//        for (var name in ModuleUtils.requires) {
//            //print("ModuleUtils.getRequiredFileById testing name: "+name);
//            if (ModuleUtils.requires[name].id === modid) {
//                return ModuleUtils.requires[name];
//            }
//        };
//    };
//
//    function getModIdFromExport(func) {
//        // This is a little bit of a hack - require is defined in jvm-npm but
//        // caches any exports for any already required modules. We don't want to add
//        // exports to the Module's metadata that is stored in ModuleUtils.requires so
//        // it doesn't get Serialized as part of bound lambda argument.
//        var cache = require.cache;
//        if (cache) {
//            for (var modid in cache) {
//                if ((typeof cache[modid] === "function") && (cache[modid].toString() === func.toString())) {
//                    return {modid: modid};
//                } else if (typeof cache[modid] === "object"){
//                    for (var exp in cache[modid]) {
//                        //print("cache[modid][exp]: "+cache[modid][exp]);
//                        if (typeof cache[modid][exp] === "function" && cache[modid][exp].toString() === func.toString()) {
//                            return {modid: modid, expname: exp};
//                        }
//                    }
//                }
//            }
//        }
//    }
//
//    ModuleUtils.getRequiredFileByExport = function(func) {
//        //print("ModuleUtils.getRequiredFileByExport func: "+func.toString());
//        var obj = getModIdFromExport(func) || {},
//                modid = obj.modid || "",
//                expname = obj.expname;
//        //ModuleUtils._printRequires();
//        //print("ModuleUtils.getRequiredFileByExport modid: "+modid);
//        var mod = ModuleUtils.getRequiredFileById(modid);
//        if (mod) {
//            mod.setExportName(expname);
//            return mod;
//        }
//    };
//
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
///*
// * Get any modules that match the given type/attribute.
// *
// * For example {type: "core", value: "true"} to find any core modules loaded from
// * the classpath.
// */
//    ModuleUtils.getModulesByType = function(typeobj) {
//        typeobj = typeobj || {};
//        var type = typeobj.type;
//        var value = typeobj.value;
//        //print("getModuleByType: " + type + ":" + value);
//        var mods = [];
//        for (var name in ModuleUtils.requires) {
//            //print("ModuleUtils.requires["+name+"]["+type+"]: "+ModuleUtils.requires[name][type]);
//            if (ModuleUtils.requires[name][type] === value) {
//                mods.push(ModuleUtils.requires[name]);
//            }
//        }
//        return mods;
//    };
//
///*
// * On worker node so have to try and manually find and load required required file
// * into the ScriptEngine (e.g. Nashorn).
// */
//
//    ModuleUtils._getModuleExtension = function(id) {
//        return id.slice(id.lastIndexOf("\."), id.length);
//    };
//
    private static void _printRequires() {
        System.out.println("ModuleUtils._printRequires:");
        ModuleUtils.modules.forEach((k,v) -> System.out.println("name: " + k + "mod: " + v));
    };

}
