(function () {
    /**
     * broadcast module.
     * @example
     * var broadcast = require('eclairjs/broadcast');
     * @module eclairjs/broadcast
     */
    module.exports = {
        Broadcast: require(EclairJS_Globals.NAMESPACE + '/broadcast/Broadcast'),
        TorrentBroadcast: require(EclairJS_Globals.NAMESPACE + '/broadcast/TorrentBroadcast')
        /*
        Factories are implementation of BroadcastFactory that is invoked by SparkContext.broadcast.
        So they will not be implemented in JavaScript
         */
        // HttpBroadcastFactory: require(EclairJS_Globals.NAMESPACE + '/broadcast/HttpBroadcastFactory'),
        // TorrentBroadcastFactory: require(EclairJS_Globals.NAMESPACE + '/broadcast/TorrentBroadcastFactory')
    }
})();