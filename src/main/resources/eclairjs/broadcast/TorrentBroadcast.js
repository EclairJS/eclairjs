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

    var Broadcast = require(EclairJS_Globals.NAMESPACE + '/broadcast/Broadcast');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var logger = Logger.getLogger("broadcast_TorrentBroadcast_js");


    /**
     * @classdesc
     * A broadcast variable. Broadcast variables allow the programmer to keep a read-only variable
     * cached on each machine rather than shipping a copy of it with tasks. They can be used, for
     * example, to give every node a copy of a large input dataset in an efficient manner. Spark also
     * attempts to distribute broadcast variables using efficient broadcast algorithms to reduce
     * communication cost.
     *
     *
     * @class
     * @memberof module:eclairjs/broadcast
     * @extends module:eclairjs/broadcast.Broadcast
     */

    var TorrentBroadcast = function (jvmObject) {
        Broadcast.call(this, jvmObject);

    };

    TorrentBroadcast.prototype = Object.create(Broadcast.prototype);

    TorrentBroadcast.prototype.constructor = TorrentBroadcast;


    module.exports = TorrentBroadcast;
})();