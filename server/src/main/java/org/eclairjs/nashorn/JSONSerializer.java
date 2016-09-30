package org.eclairjs.nashorn;
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

/*
   To send a JavaScript object to a spark worker we need to convert it to a Java object that implements java.io.Serializable.
   JSONSerializer is that object, this object has a string properties that is the JSON representation of the JavaScript object
   to be sent to the workers. Once it arrives at the workers it must be converted back to a JavaScript object (Serialize.JSONSerializer)
   for use in the LAMBDA function.
 */
public class JSONSerializer implements java.io.Serializable {
    private String json;

    public JSONSerializer(String json) {
        this.json = json;
    }

    public JSONSerializer(Object json) {
        this.json = "json";
    }

    public JSONSerializer() {
        this.json = null;
    }
    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    @Override
    public String toString() {
        return this.getJson();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JSONSerializer json = (JSONSerializer) o;
        return json.getJson().equals(this.getJson());
    }

}
