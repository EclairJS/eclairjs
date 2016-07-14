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

(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    var IntAccumulatorParam = require(EclairJS_Globals.NAMESPACE + '/IntAccumulatorParam');
    var FloatAccumulatorParam = require(EclairJS_Globals.NAMESPACE + '/FloatAccumulatorParam');

    var logger = Logger.getLogger("Accumulable_js");

    /**
     * A data type that can be accumulated, ie has an commutative and associative "add" operation,
     * but where the result type, `R`, may be different from the element type being added, `T`.
     *
     * You must define how to add data, and how to merge two of these together.  For some data types,
     * such as a counter, these might be the same operation. In that case, you can use the simpler
     * {@link Accumulator}. They won't always be the same, though -- e.g., imagine you are
     * accumulating a set. You will add items to the set, and you will union two sets together.
     *
     * @classdesc
     * @constructor
     * @memberof module:eclairjs
     * @param {object} initialValue initial value of accumulator
     * @param {module:eclairjs.AccumulableParam} param helper object defining how to add elements
     * @param {string} name human-readable name for use in Spark's web UI
     */
    /*
     * NOTE for now EclairJS will only support floats and int types
     *
     *
     */
    var Accumulable = function () {
        logger.debug("constructor");
        var jvmObject;
        if (arguments.length == 1) {
            jvmObject = arguments[0];
        } else {
            var value = arguments[0];
            this._accumulableParam = arguments[1];
            if (arguments[1] instanceof FloatAccumulatorParam) {
                value = parseFloat(value);
            } else if (arguments[1] instanceof IntAccumulatorParam) {
                value = new java.lang.Integer(parseInt(value)); // we need to create a Integer or we will get a java.lang.Double
            }
            var accumulableParam_uw = Utils.unwrapObject(arguments[1]);
            jvmObject = new org.apache.spark.Accumulable(value, accumulableParam_uw, arguments[2]);
        }

        JavaWrapper.call(this, jvmObject);

    };

    Accumulable.prototype = Object.create(JavaWrapper.prototype);

    Accumulable.prototype.constructor = Accumulable;


    /**
     * Add more data to this accumulator / accumulable
     * @param {object} term  the data to add
     */
    Accumulable.prototype.add = function (term) {
        var term_uw = this.cast(Utils.unwrapObject(term));
        this.getJavaObject().add(term_uw);


    }
    /**
     * casts the value to the correct type for the accumulable
     * @param {number} value
     * @returns {int | float}
     * @private
     */
    Accumulable.prototype.cast = function (value) {
        var ret = value;
        var x = this.getJavaObject().localValue(); // this will give us the correct type to cast to..
        if (x instanceof java.lang.Double) {
            ret = parseFloat(value);
        } else if (x instanceof java.lang.Integer) {
            ret = new java.lang.Integer(value);
        }
        return ret;
    }
    /**
     * Merge two accumulable objects together
     *
     * Normally, a user will not want to use this version, but will instead call `add`.
     * @param {object} term  the other `R` that will get merged with this
     */
    Accumulable.prototype.merge = function (term) {
        var term_uw = this.cast(Utils.unwrapObject(term));
        this.getJavaObject().merge(term_uw);
    }


    /**
     * Access the accumulator's current value; only allowed on master.
     * @returns {object}
     */
    Accumulable.prototype.value = function () {
        var javaObject = this.getJavaObject().value();
        return Utils.javaToJs(javaObject);
    }


    /**
     * Get the current value of this accumulator from within a task.
     *
     * This is NOT the global value of the accumulator.  To get the global value after a
     * completed operation on the dataset, call `value`.
     *
     * The typical use of this method is to directly mutate the local value, eg., to add
     * an element to a Set.
     * @returns {object}
     */
    Accumulable.prototype.localValue = function () {
        var javaObject = this.getJavaObject().localValue();
        return Utils.javaToJs(javaObject);
    }

    /**
     * Set the accumulator's value; only allowed on master
     * @param {object}
     */
    Accumulable.prototype.setValue = function (newValue) {
        var newValue_uw = Utils.unwrapObject(newValue);
        this.getJavaObject().setValue(newValue_uw);
    }


    /**
     * @returns {string}
     */
    Accumulable.prototype.toString = function () {
        return this.getJavaObject().toString();
    }

    module.exports = Accumulable;

})();
