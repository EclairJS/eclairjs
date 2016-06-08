package org.eclairjs.nashorn.wrap;

import jdk.nashorn.api.scripting.AbstractJSObject;

public abstract class WrappedFunction  extends AbstractJSObject {

    @Override
    public boolean isFunction() {
        return true;
    }

}
