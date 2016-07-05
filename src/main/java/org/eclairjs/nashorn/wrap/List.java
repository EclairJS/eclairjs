package org.eclairjs.nashorn.wrap;


import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.objects.NativeArray;
import org.apache.log4j.Logger;
import org.eclairjs.nashorn.Utils;

import java.util.ArrayList;


public class List extends WrappedClass {

    static Logger logger = Logger.getLogger(List.class);

    static WrappedFunction  F_add = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter add");
            java.util.List list = ((List)thiz).list;
            Object obj=Utils.jsToJava(args[0]);
            if (args.length>1) {
                list.add(Utils.toInt(args[1]), obj);
            } else {
                list.add(obj);
            }
            return null;
        }
    };

    static WrappedFunction  F_addAll = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter addAll");
            java.util.List list = ((List)thiz).list;

            java.util.List addList=fromJS(args[0]);
            if (args.length>1) {
                list.addAll(Utils.toInt(args[1]), addList);
            } else {
                list.addAll(addList);
            }
            return new List(list);
        }
    };

    static WrappedFunction  F_clear = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter clear");
            java.util.List list = ((List)thiz).list;
            list.clear();
            return null;
        }
    };

    static WrappedFunction  F_contains = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter contains");
            java.util.List list = ((List)thiz).list;
            Object obj=Utils.jsToJava(args[0]);
            return list.contains(obj);
        }
    };


    static WrappedFunction  F_containsAll = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter containsAll");
            java.util.List list = ((List)thiz).list;
            java.util.List containsList=fromJS(args[0]);
            return list.containsAll(containsList);
        }
    };

    static WrappedFunction  F_equals = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter equals");
            java.util.List list = ((List)thiz).list;
            if (args[0] instanceof List)
                return ((List)args[0]).list.equals(list);
            java.util.List otherList=fromJS(args[0]);

            return list.equals(otherList);
        }
    };

    static WrappedFunction  F_get = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter get");
            java.util.List list = ((List)thiz).list;
            return Utils.javaToJs(list.get(Utils.toInt(args[0])));
        }
    };

    static WrappedFunction  F_hashCode = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter hashCode");
            java.util.List list = ((List)thiz).list;
            return list.hashCode();
        }
    };

    static WrappedFunction  F_indexOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter indexOf");
            java.util.List list = ((List)thiz).list;
            Object obj=Utils.jsToJava(args[0]);
            return list.indexOf(obj);
        }
    };

    static WrappedFunction  F_isEmpty = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter isEmpty");
            java.util.List list = ((List)thiz).list;
            return list.isEmpty();
        }
    };

    static WrappedFunction  F_lastIndexOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter lastIndexOf");
            java.util.List list = ((List)thiz).list;
            Object obj=Utils.jsToJava(args[0]);
            return list.lastIndexOf(obj);
        }
    };


    static WrappedFunction  F_remove = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter remove");
            java.util.List list = ((List)thiz).list;
            if (args[0] instanceof Integer || args[0] instanceof Double || args[0] instanceof Long)
              return list.remove(Utils.toInt(args[0]));
            Object obj=Utils.jsToJava(args[0]);
            return list.remove(obj);
        }
    };

    static WrappedFunction  F_removeAll = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter removeAll");
            java.util.List list = ((List)thiz).list;
            java.util.List removeList=fromJS(args[0]);
            return list.removeAll(removeList);
        }
    };

    static WrappedFunction  F_retainAll = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter retainAll");
            java.util.List list = ((List)thiz).list;
            java.util.List retainList=fromJS(args[0]);
            return list.retainAll(retainList);
        }
    };

    static WrappedFunction  F_set = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter set");
            java.util.List list = ((List)thiz).list;
            Object obj=Utils.jsToJava(args[0]);
            Object o = list.set(Utils.toInt(args[1]),obj);
            return Utils.javaToJs(0);
        }
    };

    static WrappedFunction  F_size = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter size");
            java.util.List list = ((List)thiz).list;
            return list.size();
        }
    };

    static WrappedFunction  F_subList = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter subList");
            java.util.List list = ((List)thiz).list;
            return new List(list.subList(Utils.toInt(args[0]), Utils.toInt(args[1])));
        }
    };

    static WrappedFunction  F_toArray = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args)
        {
            logger.debug("enter toArray");
            java.util.List list = ((List)thiz).list;
            return Utils.javaToJs(list);
        }
    };
    java.util.List list;

    public List(Object jsArray) {
        this.list=fromJS(jsArray);
    }

    public List()  {
        this.list=new ArrayList();
    }

    private List(java.util.List list)  {
        this.list=list;
    }

    static public String getModuleName() {
        return "List";
    }

    static java.util.List fromJS(Object jsArray)
    {
        java.util.List list=new ArrayList();
        if (jsArray instanceof jdk.nashorn.internal.objects.NativeArray) {
            Object array[] = ((NativeArray) jsArray).asObjectArray();
            for (int i = 0; i < array.length; i++) {
                list.add(Utils.jsToJava(array[i]));
            }
        } else if (jsArray instanceof ScriptObjectMirror) {
            ScriptObjectMirror m = (ScriptObjectMirror) jsArray;
            if (m.isArray()) {
                for (Object item : m.values()) {
                    list.add(Utils.jsToJava(item));
                }

            }
        } else if (jsArray instanceof List)
            list = ((List)jsArray).list;
        else
            list.add(Utils.jsToJava(jsArray));

        return  list;
    }

    public Object getJavaObject() {
        return list;
    }

    public String getClassName() {return "List";}
    public  boolean checkInstance(Object other){ return other instanceof List;}

    @Override
    public String toJSON() {
        return toString() ;
    }

    @Override
    public String toString() {
        return list.toString() ;
    }


    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "add": return F_add;
            case "addAll": return F_addAll;
            case "clear": return F_clear;
            case "contains": return F_contains;
            case "containsAll": return F_containsAll;
            case "equals": return F_equals;
            case "hashCode": return F_hashCode;
            case "indexOf": return F_indexOf;
            case "isEmpty": return F_isEmpty;
            case "lastIndexOf": return F_lastIndexOf;
            case "remove": return F_remove;
            case "removeAll": return F_removeAll;
            case "retainAll": return F_retainAll;
            case "set": return F_set;
            case "size": return F_size;
            case "subList": return F_subList;
            case "toArray": return F_toArray;
        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "add":
            case "addAll":
            case "clear":
            case "contains":
            case "containsAll":
            case "equals":
            case "hashCode":
            case "indexOf":
            case "isEmpty":
            case "lastIndexOf":
            case "remove":
            case "removeAll":
            case "retainAll":
            case "set":
            case "size":
            case "subList":
            case "toArray":
                return true;
        }
        return super.hasMember(name);
    }

}