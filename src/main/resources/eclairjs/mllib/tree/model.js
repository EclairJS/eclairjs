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
(function () {
    /**
     * model module.
     * @example
     * var model = require('eclairjs/mllib/tree/model');
     * var at = new sql.Column("name");
     * @module eclairjs/mllib/tree/model
     */
    module.exports = {
        DecisionTreeModel: require(EclairJS_Globals.NAMESPACE + '/mllib/tree/model/DecisionTreeModel'),
        GradientBoostedTreesModel: require(EclairJS_Globals.NAMESPACE + '/mllib/tree/model/GradientBoostedTreesModel'),
        RandomForestModel: require(EclairJS_Globals.NAMESPACE + '/mllib/tree/model/RandomForestModel'),

    }
})();

