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


    /**
     * This is the central interface in the log4j package. Most logging operations, except configuration, are done through this interface.
     * @class
     * @memberof module:eclairjs
     * @classdesc
     */
    var Logger = function () {
    };


    /**
     * Gets a logger for the specified string.
     * @param {string} str
     * @returns {module:eclairjs.Logger}
     */
    Logger.getLogger = function (str) {
        var logger = org.apache.log4j.Logger.getLogger("org.eclairjs.nashorn.resource." + str);
        return logger;
    }

    /**
     * Logs a message with the specific Marker at the DEBUG level.
     *
     * @function
     * @name Logger#debug
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message object with the ERROR level.
     *
     * @function
     * @name Logger#error
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the FATAL level.
     *
     * @function
     * @name Logger#fatal
     * @param {string} str text to be added to the logs
     */

    /**
     * Gets the logger name.
     *
     * @function
     * @name Logger#getName
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the INFO level.
     *
     * @function
     * @name Logger#info
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the TRACE level.
     *
     * @function
     * @name Logger#trace
     * @param {string} str text to be added to the logs
     */

    /**
     * Logs a message with the specific Marker at the WARN level.
     *
     * @function
     * @name Logger#warn
     * @param {string} str text to be added to the logs
     */

    module.exports = Logger;


})();