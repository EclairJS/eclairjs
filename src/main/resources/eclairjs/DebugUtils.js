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
 * @param {boolean} [showSrc] - show the function source
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
 * @param {showFunctions} [showSrc] - show the functions
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
/**
 * Prints the time difference between date1 and date2
 * @param {Date} date1
 * @param {Date} date2
 */
DebugUtils.timeDifference = function(date1,date2) {
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    print('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');
}


