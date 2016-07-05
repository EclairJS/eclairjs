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
     * An ordered collection. The user of this has precise control over where
     * in the list each element is inserted. The user can access elements by their integer index (position in the list),
     * and search for elements in the list.
     * @classdesc
     * @param {object} [obj]
     * @constructor List
     * @memberof module:eclairjs
     */
    var List = Java.type('org.eclairjs.nashorn.wrap.List');


    /**
     * Inserts the specified element at the specified position in this list (optional operation).
     * @function
     * @name module:eclairjs.List#add
     * @param {object} obj
     * @param {integer} [position] if not specified object is appended to the end of the list.
     */

    /**
     * Inserts all of the elements in the specified collection into this list at the specified position (optional operation).
     * @function
     * @name module:eclairjs.List#addAll
     * @param {module:eclairjs.List | array} obj
     * @param {integer} [position]
     * @returns {module:eclairjs.List}
     */

    /**
     * Removes all of the elements from this list (optional operation).
     * @function
     * @name module:eclairjs.List#clear
     */

    /**
     * Returns true if this list contains the specified element.
     * @function
     * @name module:eclairjs.List#contains
     * @param obj
     * @returns {boolean}
     */

    /**
     * Returns true if this list contains all of the elements of the specified list or array.
     * @function
     * @name module:eclairjs.List#containsAll
     * @param {module:eclairjs.List | array} obj
     * @returns {boolean}
     */

    /**
     * Compares the specified list or array with this list for equality.
     * @function
     * @name module:eclairjs.List#equals
     * @param {module:eclairjs.List | array} obj
     * @returns {boolean}
     */

    /**
     * Returns the element at the specified position in this list.
     * @function
     * @name module:eclairjs.List#get
     * @param {integer} position
     * @returns {object}
     */

    /**
     * Returns the hash code value for this list.
     * @function
     * @name module:eclairjs.List#hashCode
     * @returns {integer}
     */

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @function
     * @name module:eclairjs.List#indexOf
     * @param {object} obj
     * @returns {integer}
     */

    /**
     * Returns true if this list contains no elements.
     * @function
     * @name module:eclairjs.List#isEmpty
     * @returns {boolean}
     */

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @function
     * @name module:eclairjs.List#lastIndexOf
     * @param obj
     * @returns {integer}
     */

    /**
     * Removes the element at the specified position in this list (optional operation). or
     * Removes the first occurrence of the specified element from this list, if it is present (optional operation).
     * @function
     * @name module:eclairjs.List#remove
     * @param {integer | object} positionOrObject
     * @returns {boolean}
     */

    /**
     * Removes from this list all of its elements that are contained in the specified collection (optional operation).
     * @function
     * @name module:eclairjs.List#removeAll
     * @param {module:eclairjs.List | array} listOrArray
     * @returns {boolean}
     */

    /**
     * Retains only the elements in this list that are contained in the specified collection (optional operation).
     * @function
     * @name module:eclairjs.List#retainAll
     * @param {module:eclairjs.List | array} listOrArray
     * @returns {boolean}
     */

    /**
     * Replaces the element at the specified position in this list with the specified element (optional operation).
     * @function
     * @name module:eclairjs.List#set
     * @param {object} element
     * @param {integer} position
     * @returns {object}
     */

    /**
     * Returns the number of elements in this list.
     * @function
     * @name module:eclairjs.List#size
     * @returns {integer}
     */

    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
     * @function
     * @name module:eclairjs.List#subList
     * @param {integer} fromIndex
     * @param {integer} toIndex
     * @returns {module:eclairjs.List}
     */

    /**
     * @function
     * @name module:eclairjs.List#toArray
     * Returns an array containing all of the elements in this list in proper sequence (from first to last element).
     * @returns {Array}
     */

    module.exports = List;

})();