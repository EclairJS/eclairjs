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
/** 
 * @constructor
 * @classdesc 
 */
var SQLContextQueryExecution = function(jvmObj) {
	JavaWrapper.call(this, jvmObj);

	  // Initialize our Row-specific properties
	this.logger = Logger.getLogger("sql.SQLContextQueryExecution_js");
};

SQLContextQueryExecution.prototype = Object.create(JavaWrapper.prototype); 

SQLContextQueryExecution.prototype.constructor = SQLContextQueryExecution;
/**
 * @returns {string}
 */
SQLContextQueryExecution.prototype.simpleString = function() {
	return this.getJavaObject().simpleString();
};
/**
 * @returns {string}
 */
SQLContextQueryExecution.prototype.toString = function() {
	return this.getJavaObject().toString();
}