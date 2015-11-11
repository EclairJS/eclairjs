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

var GroupedData = function(jvmGroupedData) {
    this.jvmGroupedData = jvmGroupedData;
}

GroupedData.prototype.count = function() {
    var jdf = this.jvmGroupedData.count();
    var df = new DataFrame(jdf);

    return df;
};

GroupedData.prototype.avg = function(cols) {
    return new DataFrame(this.jvmGroupedData.avg(cols));
};

GroupedData.prototype.mean = function(cols) {
    return new DataFrame(this.jvmGroupedData.mean(cols));
};

GroupedData.prototype.sum = function(cols) {
    return new DataFrame(this.jvmGroupedData.sum(cols));
};

GroupedData.prototype.min = function(cols) {
    return new DataFrame(this.jvmGroupedData.min(cols));
};

GroupedData.prototype.max = function(cols) {
    return new DataFrame(this.jvmGroupedData.max(cols));
};