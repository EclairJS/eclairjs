package org.eclairjs.nashorn.wrap.mllib.recommendation;

import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;


public class Rating extends WrappedClass {

    org.apache.spark.mllib.recommendation.Rating rating;

    public Rating(org.apache.spark.mllib.recommendation.Rating rating) {
        this.rating=rating;
    }

    public Rating(int user, int product, double rating)  {
        this.rating=new org.apache.spark.mllib.recommendation.Rating(user,product,rating);
    }

    public Object getJavaObject() {return rating;}

    @Override
    public String toJSON() {
        return "{\"user\":" + rating.user()+ ",\"product\":" + rating.product() + "\"rating\":" + rating.rating() + "}" ;
    }

    @Override
    public String toString() {
        return "(" + rating.user() + "," + rating.product() + "," + rating.rating() + ")" ;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public String getClassName() {return "Rating";}

    WrappedFunction  F_toJSON = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toJSON();
        }
    };

    WrappedFunction  F_toString = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return toString();
        }
    };

    WrappedFunction  F_valueOf = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return valueOf();
        }
    };

    WrappedFunction  F_user = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return rating.user();
        }
    };

    WrappedFunction F_product  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return rating.product();
        }
    };

    WrappedFunction F_rating  = new  WrappedFunction (){
        @Override
        public Object call(Object thiz, Object... args) {
            return rating.rating();
        }
    };

    WrappedFunction F_getJavaObject = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return getJavaObject();
        }
    };

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "user": return F_user;
            case "product": return F_product;
            case "rating": return F_rating;
            case "valueOf": return F_valueOf;
            case "toJSON": return F_toJSON;
            case "toString": return toString();
            case "getJavaObject": return F_getJavaObject;
        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "user":
            case "product":
            case "rating":
            case "valueOf":
            case "toJSON":
            case "toString":
            case "getJavaObject":
                return true;
        }
        return super.hasMember(name);
    }

}
