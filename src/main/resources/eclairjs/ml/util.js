(function () {
    /**
     * ml util module.
     * @example
     * var util = require('eclairjs/ml/util');
     * @module eclairjs/ml/util
     */
    module.exports = {
        MLWritable: require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWritable'),
        MLWriter: require(EclairJS_Globals.NAMESPACE + '/ml/util/MLWriter'),
        MLReader: require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReader'),
        // MLReadable: require(EclairJS_Globals.NAMESPACE + '/ml/util/MLReadable')
        DefaultParamsWritable: require(EclairJS_Globals.NAMESPACE + '/ml/util/DefaultParamsWritable'),
    }
})();
