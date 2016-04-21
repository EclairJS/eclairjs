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

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');
    /**
     * An ordered collection. The user of this has precise control over where
     * in the list each element is inserted. The user can access elements by their integer index (position in the list),
     * and search for elements in the list.
     * @classdesc
     * @param obj
     * @constructor
     * @memberof module:eclairjs
     */
    var List = function (obj) {
        this.logger = Logger.getLogger("List_js");
        var jvmObject = obj;
        if (!obj) {
            this.logger.debug("create empty list");
            jvmObject = new java.util.ArrayList();
        } else if (Array.isArray(obj)) {
            jvmObject = new java.util.ArrayList();
            for (var i = 0; i < obj.length; i++) {
                jvmObject.add(Utils.unwrapObject(obj[i]));
            }
        }
        JavaWrapper.call(this, jvmObject);

    };

    List.prototype = Object.create(JavaWrapper.prototype);

    List.prototype.constructor = List;


    /**
     * Inserts the specified element at the specified position in this list (optional operation).
     * @param {object} obj
     * @param {integer} [position] if not specified object is appended to the end of the list.
     */
    List.prototype.add = function (obj, position) {
        var obj_uw = Utils.unwrapObject(obj);
        var javaObject;
        if (position) {
            javaObject = this.getJavaObject().add(position, obj_uw)
        } else {
            javaObject = this.getJavaObject().add(obj_uw);
        }

        // return new List(javaObject);
    };

    /**
     * Inserts all of the elements in the specified collection into this list at the specified position (optional operation).
     * @param {List | array} obj
     * @param {integer} [position]
     * @returns {module:eclairjs.List}
     */
    List.prototype.addAll = function (obj, position) {
        var obj_uw = Utils.unwrapObject(obj);
        if (Array.isArray(obj_uw)) {
            obj_uw = java.util.Arrays.asList(obj_uw);
        }
        var javaObject;
        if (position) {
            javaObject = this.getJavaObject().addAll(position, obj_uw)
        } else {
            javaObject = this.getJavaObject().addAll(obj_uw);
        }

        return new List(javaObject);
    };

    /**
     * Removes all of the elements from this list (optional operation).
     */
    List.prototype.clear = function () {

        this.getJavaObject().clear();

    };

    /**
     * Returns true if this list contains the specified element.
     * @param obj
     * @returns {boolean}
     */
    List.prototype.contains = function (obj) {

        var obj_uw = Utils.unwrapObject(obj);
        return this.getJavaObject().contains(obj_uw);

    };

    /**
     * Returns true if this list contains all of the elements of the specified list or array.
     * @param {List | array} obj
     * @returns {boolean}
     */
    List.prototype.containsAll = function (obj) {
        var obj_uw = Utils.unwrapObject(obj);
        if (Array.isArray(obj_uw)) {
            obj_uw = java.util.Arrays.asList(obj_uw);
        }

        return this.getJavaObject().containsAll(obj_uw);

    };

    /**
     * Compares the specified list or array with this list for equality.
     * @param {List | array} obj
     * @returns {boolean}
     */
    List.prototype.equals = function (obj) {
        var obj_uw = Utils.unwrapObject(obj);
        if (Array.isArray(obj_uw)) {
            obj_uw = java.util.Arrays.asList(obj_uw);
        }

        return this.getJavaObject().equals(obj_uw);

    };

    /**
     * Returns the element at the specified position in this list.
     * @param {integer} position
     * @returns {object}
     */
    List.prototype.get = function (position) {

        return Utils.javaToJs(this.getJavaObject().get(position));

    };

    /**
     * Returns the hash code value for this list.
     * @returns {integer}
     */
    List.prototype.hashCode = function () {

        return this.getJavaObject().hashCode();

    };

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {object} obj
     * @returns {integer}
     */
    List.prototype.indexOf = function (obj) {
        var obj_uw = Utils.unwrapObject(obj);
        return this.getJavaObject().indexOf(obj_uw);

    };

    /**
     * Returns true if this list contains no elements.
     * @returns {boolean}
     */
    List.prototype.isEmpty = function () {

        return this.getJavaObject().isEmpty();

    };

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param obj
     * @returns {integer}
     */
    List.prototype.lastIndexOf = function (obj) {
        var obj_uw = Utils.unwrapObject(obj);
        return this.getJavaObject().lastIndexOf(obj_uw);

    };

    /**
     * Removes the element at the specified position in this list (optional operation). or
     * Removes the first occurrence of the specified element from this list, if it is present (optional operation).
     * @param {integer | object} positionOrObject
     * @returns {boolean}
     */
    List.prototype.remove = function (positionOrObject) {
        var obj_uw = Utils.unwrapObject(positionOrObject);
        return this.getJavaObject().remove(obj_uw);

    };

    /**
     * Removes from this list all of its elements that are contained in the specified collection (optional operation).
     * @param {List | array} listOrArray
     * @returns {boolean}
     */
    List.prototype.removeAll = function (listOrArray) {
        var obj_uw = Utils.unwrapObject(listOrArray);
        if (Array.isArray(obj_uw)) {
            obj_uw = java.util.Arrays.asList(obj_uw);
        }

        return this.getJavaObject().removeAll(obj_uw);

    };

    /**
     * Retains only the elements in this list that are contained in the specified collection (optional operation).
     * @param {List | array} listOrArray
     * @returns {boolean}
     */
    List.prototype.retainAll = function (listOrArray) {
        var obj_uw = Utils.unwrapObject(listOrArray);
        if (Array.isArray(obj_uw)) {
            obj_uw = java.util.Arrays.asList(obj_uw);
        }

        return this.getJavaObject().retainAll(obj_uw);

    };

    /**
     * Replaces the element at the specified position in this list with the specified element (optional operation).
     * @param {object} element
     * @param {integer} position
     * @returns {object}
     */
    List.prototype.set = function (element, position) {
        var obj_uw = Utils.unwrapObject(element);

        return Utils.javaToJs(this.getJavaObject().set(position, obj_uw));

    };

    /**
     * Returns the number of elements in this list.
     * @returns {integer}
     */
    List.prototype.size = function () {

        return this.getJavaObject().size();

    };

    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
     * @param {integer} fromIndex
     * @param {integer} toIndex
     * @returns {module:eclairjs.List}
     */
    List.prototype.subList = function (fromIndex, toIndex) {

        return new List(this.getJavaObject().subList(fromIndex, toIndex));

    };

    /**
     * Returns an array containing all of the elements in this list in proper sequence (from first to last element).
     * @returns {Array}
     */
    List.prototype.toArray = function () {

        return this.getJavaObject().toArray();

    };

    List.prototype.toJSON = function () {
        return this.getJavaObject().toString();

    };

    module.exports = List;

})();