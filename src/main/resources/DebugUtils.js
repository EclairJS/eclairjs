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

var DebugUtils = {};


/**
 *
 * Print a list of functions for the specified object
 * or {@link reduceByKey} will provide much better performance.
 * @param {object} obj - The object to dump
 * @param {boolean} showSrc - (optional) show the function source
 */
DebugUtils.dumpFunctions = function (obj, showSrc)
{
  for (var p in obj)
    if (typeof obj[p] == 'function')
     {
      if (showSrc)
        print(obj[p]);
      else
        print(p);

     }
};

/**
 *
 * Print all the members of the specified object
 * @param {object} obj - The object to dump
 * @param {showFunctions} showSrc - (optional) show the functions
 */
DebugUtils.dumpObject = function (obj,showFunctions)
{
  for (var p in obj)
  {
    if (typeof obj[p] == 'function') {
      if (showFunctions)
        print( p + " ["+typeof obj[p]+"] ");
    }
    else
      print( p + " ["+typeof obj[p]+"] = "+obj[p]);

  }
};


