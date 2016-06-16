package examples;
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

import java.io.Serializable;

/**
 * Labeled instance type, Spark SQL can infer schema from Java Beans.
 */

public class JavaLabeledDocument extends JavaDocument implements Serializable {

    private double label;

    public JavaLabeledDocument(long id, String text, double label) {
        super(id, text);
        this.label = label;
    }

    public double getLabel() {
        return this.label;
    }
}

