(function () {
    /**
     * ml attribute module.
     * @example
     * var attribute = require('eclairjs/ml/attribute');
     * @module eclairjs/ml/attribute
     */
    module.exports = {
       NumericAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/NumericAttribute'),
        Attribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/Attribute'),
       // NominalAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/NominalAttribute'),
        AttributeGroup: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/AttributeGroup')
       // NominalAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/NominalAttribute'),
       // AttributeType: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/AttributeType'),
       // BinaryAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/BinaryAttribute'),
       // AttributeType: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/AttributeType'),
       // AttributeGroup: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/AttributeGroup'),
       // BinaryAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/BinaryAttribute'),
       // NumericAttribute: require(EclairJS_Globals.NAMESPACE + '/ml/attribute/NumericAttribute')
    }
})();