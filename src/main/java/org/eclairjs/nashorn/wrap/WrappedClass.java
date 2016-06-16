package org.eclairjs.nashorn.wrap;

import jdk.nashorn.api.scripting.AbstractJSObject;

public   abstract class WrappedClass  extends AbstractJSObject {

    public abstract Object getJavaObject();
    public abstract String toString();
    public abstract String toJSON();
    public abstract String valueOf();


}
