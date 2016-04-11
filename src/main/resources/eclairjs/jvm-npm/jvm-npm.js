/**
 *  Copyright 2014 Lance Ball
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
// Since we intend to use the Function constructor.
/* jshint evil: true */

module = (typeof module == 'undefined') ? {} :  module;

(function() {
  var System  = java.lang.System,
      Scanner = java.util.Scanner,
      File    = java.io.File,
    logger = org.apache.log4j.Logger.getLogger("org.eclairjs.nashorn.resource.jvm-npm_js");

  NativeRequire = (typeof NativeRequire === 'undefined') ? {} : NativeRequire;
  if (typeof require === 'function' && !NativeRequire.require) {
    NativeRequire.require = require;
  }

  function Module(id, parent, core, modname, subdir, fullpath) {
    //print("new Module id: "+id);
    //print("new Module parent: "+parent);
    this.id = id;
    this.core = core || false;
    this.parent = parent;
    this.children = [];
    this.filename = id;
    this.loaded = false;
    this.body = "";
    this.modname = modname;
    this.fullpath = core && fullpath ? fullpath : id;
    this.subdir = subdir;
    this.inFolder = subdir ? true : false;
    this.zipfile = "";
    this.exportname = "";

    Object.defineProperty( this, 'exports', {
      get: function() {
        return this._exports;
      }.bind(this),
      set: function(val) {
        Require.cache[this.filename] = val;
        this._exports = val;
      }.bind(this),
    } );
    this.exports = {};

    if (parent && parent.children) parent.children.push(this);

    this.require = function(id) {
      id = id || this.id;
      return Require(id, this);
    }.bind(this);
  }

  Module.prototype.setZipfile = function(zipfile) {
    this.zipfile = zipfile || "";
  };

  Module.prototype.setExportName = function(expname) {
    this.exportname = expname || "";
  };

  Module.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  };

  Module.prototype.toJSON = function() {
    var kids = []
    for (var i = 0; i < (this.children && this.children.length ? this.children.length : 0); i++) {
        kids.push(this.children[i].modname);
    }
    return {
        id: this.id, 
        core: this.core, 
        modname: this.modname, 
        inFolder: this.inFolder, 
        subdir: this.subdir,
        zipfile: this.zipfile,
        exportname: this.exportname,
        parentid: this.parent ? this.parent.id : "",
        children: kids
    };
  };

  /*
   * We need to load JSfiles in the ScriptEngine (e.g. Nashorn) to preserve line
   * numbering in the log files for better exception reporting. If we use Module._load
   * the line numbering gets all thrown off because the script is loaded with the 
   * func.apply() instead of via the ScriptEngine.load()
   */
  Module._loadJSFile = function(file, parent, core, main, modname, subdir, fullpath) {
    var mod = new Module(file, parent, core, modname, subdir, fullpath);

    //var __FILENAME__ = mod.filename;
    //var dir = new File(mod.filename).getParent();

    //print("***Loading JS module: "+mod.toString());
    //print("***and fullpath: "+mod.fullpath);
    //print("***and core: "+core);

    // Load the module via it's fullpath and make sure it's exports are properly
    // captured while we have them before any other require is hit.
    load(mod.fullpath);
    mod.exports = module.exports;

    mod.loaded = true;
    mod.main = main;

    // Cache the metadata object in ModuleUtils as only the exports
    // are cached here in require.
    ModuleUtils.addRequiredFile(mod);

    return mod.exports;
  };

  Module._load = function(file, parent, core, main, modname, subdir, fullpath) {
    var module = new Module(file, parent, core, modname, subdir, fullpath);

    var __FILENAME__ = module.filename;

    var body   = readFile(module.filename, module.core);
    var dir    = new File(module.filename).getParent();
    var args   = ['exports', 'module', 'require', '__filename', '__dirname'],
        func   = new Function(args, body);

    //print("***Calling func.apply for: " + module.toString());
    //print("***with body: "+body);
    //print("***and exports: "+module.exports);
    //print("***and filename: "+module.filename);
    //print("***and dir: "+dir);

    func.apply(module,
        [module.exports, module, module.require, module.filename, dir]);

    module.loaded = true;
    module.main = main;
    module.body = body;

    // Cache the metadata object in ModuleUtils as only the exports
    // are cached here in require.
    ModuleUtils.addRequiredFile(module);

    return module.exports;
  };

  Module.runMain = function runMain(main) {
    var file = Require.resolve(main);
    Module._load(file, undefined, false, true);
  };

  function Require(id, parent) {
    var core, native, subdir, fullpath, modname = id, file = Require.resolve(id, parent);

    if (!file) {
      if (typeof NativeRequire.require === 'function') {
        if (Require.debug) {
          System.out.println(['Cannot resolve', id, 'defaulting to native'].join(' '));
        }
        native = NativeRequire.require(id);
        if (native) return native;
      }
      System.err.println("Cannot find module " + id);
      throw new ModuleError("Cannot find module " + id, "MODULE_NOT_FOUND");
    }

    if (file.core) {
      fullpath = file.fullpath;
      file = file.path;
      core = true;
    }
    if (file.subdir) {
      subdir = file.subdir;
      file = file.path;
    }

    //print("Require file: "+file);

    try {
      if (Require.cache[file]) {
        //print("Require returing cached file: ",file);
        return Require.cache[file];
      } else if (file.endsWith('.js')) {
        return Module._loadJSFile(file, parent, core, false, modname, subdir, fullpath);
      } else if (file.endsWith('.json')) {
        return loadJSON(file);
      }
    } catch(ex) {
      if (ex instanceof java.lang.Exception) {
        throw new ModuleError("Cannot load module " + id, "LOAD_ERROR", ex);
      } else {
        System.out.println("Cannot load module " + id + " LOAD_ERROR");
        throw ex;
      }
    }
  }

  Require.resolve = function(id, parent) {
    //print("resolve id: "+id);
    //print("resolve parent: "+ (parent ? parent.id : "DNE"));

    var roots = findRoots(parent);
    for ( var i = 0 ; i < roots.length ; ++i ) {
      var root = roots[i];
      //print("root: "+root);

      var result = resolveCoreModule(id, root) ||
        resolveAsFile(id, root, '.js')   ||
        resolveAsFile(id, root, '.json') ||
        resolveAsDirectory(id, root)     ||
        resolveAsNodeModule(id, root);
      if (result) {
        //print("returning resolve result: "+result);
        if (!result.core && root !== result.slice(0, result.lastIndexOf("\/"))) {
            var subdir = result.slice(root.length+1, result.lastIndexOf("\/"));
            //print("returning resolve result subdir: "+subdir);
            return {
                path: result, 
                subdir: subdir
            };
        }
        return result;
      }
    }
    return false;
  };

  Require.root = java.lang.System.getProperty('user.dir');
  Require.NODE_PATH = undefined;

  function findRoots(parent) {
    var r = [], root = findRoot(parent);
    r.push(root);

    // Try top-level root if not found under parent root.
    r.push(Require.root);

    var paths = r.concat(Require.paths());
    //print("PATHS: "+paths);
    return paths;
  }

  function parsePaths(paths) {
    if ( ! paths ) {
      return [];
    }
    if ( paths === '' ) {
      return [];
    }
    var osName = java.lang.System.getProperty("os.name").toLowerCase();
    var separator;

    if ( osName.indexOf( 'win' ) >= 0 ) {
      separator = ';';
    } else {
      separator = ':';
    }

    return paths.split( separator );
  }

  Require.paths = function() {
    var r = [];
    r.push( java.lang.System.getProperty( "user.home" ) + "/.node_modules" );
    r.push( java.lang.System.getProperty( "user.home" ) + "/.node_libraries" );

    if ( Require.NODE_PATH ) {
      r = r.concat( parsePaths( Require.NODE_PATH ) );
    } else {
      var NODE_PATH = java.lang.System.getenv.NODE_PATH;
      if ( NODE_PATH ) {
        r = r.concat( parsePaths( NODE_PATH ) );
      }
    }
    // r.push( $PREFIX + "/node/library" );
    return r;
  };

  function findRoot(parent) {
    if (!parent || !parent.id) { return Require.root; }
    var pathParts = parent.id.split(/[\/|\\,]+/g);
    pathParts.pop();
    return pathParts.join('/');
  }

  Require.debug = true;
  //Require.debug = false;
  Require.cache = {};
  Require.extensions = {};
  require = Require;

  module.exports = Module;


  function loadJSON(file) {
    var json = JSON.parse(readFile(file));
    Require.cache[file] = json;
    return json;
  }

  function resolveAsNodeModule(id, root) {
    var base = [root, 'node_modules'].join('/');
    return resolveAsFile(id, base) ||
      resolveAsDirectory(id, base) ||
      (root ? resolveAsNodeModule(id, new File(root).getParent()) : false);
  }

  function resolveAsDirectory(id, root) {
    var base = [root, id].join('/'),
        file = new File([base, 'package.json'].join('/'));
    if (file.exists()) {
      try {
        var body = readFile(file.getCanonicalPath()),
            package  = JSON.parse(body);
        if (package.main) {
          return (resolveAsFile(package.main, base) ||
                  resolveAsDirectory(package.main, base));
        }
        // if no package.main exists, look for index.js
        return resolveAsFile('index.js', base);
      } catch(ex) {
        throw new ModuleError("Cannot load JSON file", "PARSE_ERROR", ex);
      }
    }
    return resolveAsFile('index.js', base);
  }

  function resolveAsFile(id, root, ext) {
    var file;
    if ( id.length > 0 && id[0] === '/' ) {
      file = new File(normalizeName(id, ext || '.js'));
      if (!file.exists()) {
        return resolveAsDirectory(id);
      }
    } else {
      file = new File([root, normalizeName(id, ext || '.js')].join('/'));
      //print('file: '+file);
    }
    if (file.exists()) {
      //print("########IS RESOLVED AS FILE: "+file.getName());
      return file.getCanonicalPath();
    }
  }

  function resolveCoreModule(id, root) {
    //print("resolveCoreModule id: "+id);
    //print("resolveCoreModule root: "+root);
    var name = normalizeName(id);
      var resource;
    var debugJSSourceLocation = System.getProperties().getProperty("eclairjs.jssource");
    if (debugJSSourceLocation != null) {
      resource = debugJSSourceLocation + "/" + name;
    } else {
      var classloader = java.lang.Thread.currentThread().getContextClassLoader();
      resource = classloader.getResource(name);
    }

    if (resource) {
        //print("########IS RESOLVED AS CORE: "+resource);
        return { path: name, core: true, fullpath: resource.toString() };
    }
  }

  function normalizeName(fileName, ext) {
    var extension = ext || '.js';
    if (fileName.endsWith(extension)) {
      return fileName;
    }
    return fileName + extension;
  }

  function readFile(filename, core) {
    //print('readFile: '+filename);
    var input;
    try {
      if (core) {
        var classloader = java.lang.Thread.currentThread().getContextClassLoader();
        input = classloader.getResourceAsStream(filename);
      } else {
        input = new File(filename);
      }
      // TODO: I think this is not very efficient
      return new Scanner(input).useDelimiter("\\A").next();
    } catch(e) {
      throw new ModuleError("Cannot read file ["+input+"]: ", "IO_ERROR", e);
    }
  }

  function ModuleError(message, code, cause) {
    this.code = code || "UNDEFINED";
    this.message = message || "Error loading module";
    this.cause = cause;
  }

  // Helper function until ECMAScript 6 is complete
  if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
      if (!suffix) return false;
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  ModuleError.prototype = new Error();
  ModuleError.prototype.constructor = ModuleError;

}());

