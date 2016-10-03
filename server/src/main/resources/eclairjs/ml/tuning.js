(function () {
    /**
     * ml tuning module.
     * @example
     * var tuning = require('eclairjs/ml/tuning');
     * @module eclairjs/ml/tuning
     */
    module.exports = {
        CrossValidator: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidator'),
        CrossValidatorModel: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidatorModel'),
        ParamGridBuilder: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/ParamGridBuilder'),
        TrainValidationSplit: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/TrainValidationSplit'),
        TrainValidationSplitModel: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/TrainValidationSplitModel')
    }
})();
