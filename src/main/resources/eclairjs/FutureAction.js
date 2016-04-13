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



/**
 * A future for the result of an action to support cancellation. This is an extension of the
 * Scala Future interface to support cancellation.
 * @classdesc
 * @constructor
 */


var FutureAction = function(jvmObject) {
   this.logger = Logger.getLogger("FutureAction_js");
   JavaWrapper.call(this, jvmObject);
};

FutureAction.prototype = Object.create(JavaWrapper.prototype);

FutureAction.prototype.constructor = FutureAction;


/**
 * Attempts to cancel execution of this task.
 * @param {boolean}
 * @returns {boolean}
 */
FutureAction.prototype.cancel = function(mayInterruptIfRunning) {
  return  this.getJavaObject().cancel(mayInterruptIfRunning);
};

/**
 * Waits if necessary for the computation to complete, and then retrieves its result.
 * @returns {object}
 */
FutureAction.prototype.get = function() {
  return  this.getJavaObject().get();
};

/**
 * Waits if necessary for at most the given time for the computation to complete, and then retrieves its result, if available.
 *  @param {number} timeout in milliseconds
 * @returns {object}
 */
FutureAction.prototype.getWithTimeout = function( timeout) {
  return  this.getJavaObject().get(timeout,java.util.concurrent.TimeUnit.MILLISECONDS );
};

/**
 * Returns whether the action has already been completed with a value or an exception.
 * @returns {boolean}
 */
FutureAction.prototype.isDone = function() {
  return  this.getJavaObject().isDone();
};


/**
 * Returns whether the action has been cancelled.
 * @returns {boolean}
 */
FutureAction.prototype.isCancelled = function() {
  return  this.getJavaObject().isCancelled();
};


/**
 * @returns {number[]}
 */
FutureAction.prototype.jobIds = function() {
  return  this.getJavaObject().jobIds();
};
