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

var EclairJS_Globals = {
    NAMESPACE: 'eclairjs'
};

/**
 *  We need to replace the Nashorn's implementation of parseInt becouse it returns
 *  a java.lang.Double. Why you ask, that is a good question!
 *  Any way this really mess up spark as we need a parseInt to be a java.lang.Integer
 *  so we will replace it globally with an implementation that works for spark
 * @param string
 * @param radix
 * @returns {Number}
 * @private
 */
parseInt = function(string, radix) {

    var val = NaN;
    try{
        if (radix) {
            val = java.lang.Integer.parseInt(string, radix);
        } else {
            val = java.lang.Integer.parseInt(string);
        }
    } catch (e) {
        // bad parseInt value
    }

    return val;
};


function Utils_invoke(func) {
    var fn = func;
    var a = Array.prototype.slice.call(arguments);
    var args = (arguments.length > 1)
        ? a.slice(1).map(function (arg) {
        return Serialize.javaToJs(arg);
    })
        : [];

    var ret = null;
    try {
        ret = Serialize.jsToJava(fn.apply(this, args));
    } catch (err) {
        print("error invoking function");
        print(func);
        print(err);
        throw err;
    }

    return ret;
};

