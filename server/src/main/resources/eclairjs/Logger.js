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
(function () {

     var JavaLogger = Java.type('org.apache.log4j.Logger');
     var Level = Java.type('org.apache.log4j.Level');

     var lvl_debug=Level.DEBUG;
     var lvl_error=Level.ERROR;
     var lvl_warn=Level.WARN;



    /**
     * This is the central interface in the log4j package. Most logging operations, except configuration, are done through this interface.
     * @class
     * @memberof module:eclairjs
     * @classdesc
     */
    var Logger = function (logger) {
        this.jLog=logger;
    };

    function formatArgs()
    {
        var args=arguments[0]
        var str=args[0];
            if (args.length==1)
               return str;
        var args = Array.prototype.slice.call(args, 1);
        return  str.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
    }

    function joinArgs()
    {
        var args=arguments[0]
        var str=args[0];
        if (args.length==1)
               return str;
        return Array.prototype.slice.call(args, 0).join("");
    }

      function trace()
      {
         this.jLog.trace(joinArgs(arguments));
      }

      function info()
      {
         this.jLog.info(joinArgs(arguments));
      }

      function debugFunction()
      {
         this.jLog.debug(joinArgs(arguments));
      }

      function warn()
      {
         this.jLog.warn(joinArgs(arguments));
      }

      function error()
      {
         this.jLog.error(joinArgs(arguments));
      }

     function noop(){}

    /**
     * Gets a logger for the specified string.
     * @param {string} str
     * @returns {module:eclairjs.Logger}
     */
    Logger.getLogger = function (str) {
        var javaLogger = JavaLogger.getLogger("org.eclairjs.nashorn.resource." + str);

        var logger=new Logger(javaLogger);

        if (javaLogger.isTraceEnabled())
          logger.trace =trace;
        else
          logger.trace=noop;

        if (javaLogger.isInfoEnabled())
          logger.info=info;
        else
          logger.info=noop;

        if (javaLogger.isDebugEnabled())
          logger.debug=debugFunction;
        else
          logger.debug=noop;

        if (javaLogger. isEnabledFor(lvl_warn))
          logger.warn=warn;
        else
          logger.warn=noop;

        if (javaLogger. isEnabledFor(lvl_error))
          logger.error=error;
        else
          logger.error=noop;

        return logger;
    }

    /**
     * Logs a message with the specific Marker at the DEBUG level.
     *
     * @function
     * @name module:eclairjs.Logger#debug
     * @param {string} str text to be added to the logs
     */



    /**
     * Logs a message object with the ERROR level.
     *
     * @function
     * @name module:eclairjs.Logger#error
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the FATAL level.
     *
     * @function
     * @name module:eclairjs.Logger#fatal
     * @param {string} str text to be added to the logs
     */

    /**
     * Gets the logger name.
     *
     * @function
     * @name module:eclairjs.Logger#getName
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the INFO level.
     *
     * @function
     * @name module:eclairjs.Logger#info
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the TRACE level.
     *
     * @function Logger
     * @name module:eclairjs.Logger#trace
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the WARN level.
     *
     * @function
     * @name module:eclairjs.Logger#warn
     * @param {string} str text to be added to the logs
     */

    module.exports = Logger;


})();