(function () {
    /**
     * ml tuning module.
     * @example
     * var tuning = require('eclairjs/ml/tuning');
     * @module eclairjs/ml/tuning
     */
    module.exports = {
      // CrossValidatorModel: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidatorModel'),
       // TrainValidationSplitModel: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/TrainValidationSplitModel'),
       // CrossValidator: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidator'),
        ParamGridBuilder: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/ParamGridBuilder'),
       // CrossValidator: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidator'),
       // CrossValidatorModel: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/CrossValidatorModel'),
        TrainValidationSplit: require(EclairJS_Globals.NAMESPACE + '/ml/tuning/TrainValidationSplit')
    }
})();