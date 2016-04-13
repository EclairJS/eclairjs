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

var goodbye = require("examples/simple/goodbye");

function sayHello(x) {
    print('sayHello x: ' + x);
    var num = x || 2;
    for (var i = 0; i < num; i++) {
        print('Hello World');
        goodbye(i);
    }
};

module.exports = sayHello;
