package org.eclairjs.nashorn.wrap.mllib.recommendation;

import org.eclairjs.nashorn.wrap.WrappedClass;
import org.eclairjs.nashorn.wrap.WrappedFunction;


public class Rating extends WrappedClass {

    static public String getModuleName() {
        return "mllib.recommendation.Rating";
    }

    org.apache.spark.mllib.recommendation.Rating rating;

    public Rating(org.apache.spark.mllib.recommendation.Rating rating) {
        this.rating=rating;
    }

    public Rating(int user, int product, double rating)  {
        this.rating=new org.apache.spark.mllib.recommendation.Rating(user,product,rating);
    }

    public String getClassName() {return "Rating";}

    public  boolean checkInstance(Object other){ return other instanceof Rating;}

    public Object getJavaObject() {return rating;}

    @Override
    public String toJSON() {
        return "{\"user\":" + rating.user()+ ",\"product\":" + rating.product() + ",\"rating\":" + rating.rating() + "}" ;
    }

    @Override
    public String toString() {
        return "(" + rating.user() + "," + rating.product() + "," + rating.rating() + ")" ;
    }

    @Override
    public String valueOf() {
        return toString();
    }

    public int user() {
        return rating.user();
    }

    public int product() {
        return rating.product();
    }

    public double rating() {
        return rating.rating();
    }


    static WrappedFunction  F_user = new WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Rating)thiz).user();
        }
    };

    WrappedFunction F_product  = new  WrappedFunction () {
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Rating)thiz).product();
        }
    };

    WrappedFunction F_rating  = new  WrappedFunction (){
        @Override
        public Object call(Object thiz, Object... args) {
            return ((Rating)thiz).rating();
        }
    };

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "user": return F_user;
            case "product": return F_product;
            case "rating": return F_rating;
        }
        return super.getMember(name);
    }
    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "user":
            case "product":
            case "rating":
                return true;
        }
        return super.hasMember(name);
    }

}
