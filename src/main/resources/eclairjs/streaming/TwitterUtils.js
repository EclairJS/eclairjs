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

//
// static methods
//

TwitterUtils={};
var JavaTwitterUtils=Java.type('org.apache.spark.streaming.twitter.TwitterUtils');
var JavaStreamingContext =Java.type('org.apache.spark.streaming.api.java.JavaStreamingContext');
var TwitterAuthorization =Java.type('twitter4j.auth.Authorization');

/**
 * Create a input stream that returns tweets received from Twitter.
 * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
 * @param {JavaStreamingContext} jssc         JavaStreamingContext object
 * @param {TwitterAuthorization} twitterAuth  Twitter  Authorization
 * @param {string[]} filters      Set of filter strings to get only those tweets that match them
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream = function(jssc,twitterAuth,filters) {
  var jssc_uw = Utils.unwrapObject(jssc);
  var twitterAuth_uw = Utils.unwrapObject(twitterAuth);
  if (!twitterAuth_uw)
    twitterAuth_uw=null;
  if (!filters)
    filters=null;
  var javaObject =  JavaTwitterUtils["createStream(JavaStreamingContext,twitter4j.auth.Authorization,String[])"]
  (jssc_uw,twitterAuth_uw,filters);
  return new DStream(javaObject,jssc);
};


/**
 * Create a input stream that returns tweets received from Twitter.
 * @param {StreamingContext} ssc          StreamingContext object
 * @param {Authorization} twitterAuth  Twitter4J authentication, or None to use Twitter4J's default OAuth
 *        authorization; this uses the system properties twitter4j.oauth.consumerKey,
 *        twitter4j.oauth.consumerSecret, twitter4j.oauth.accessToken and
 *        twitter4j.oauth.accessTokenSecret
 * @param {string[]} filters  Set of filter strings to get only those tweets that match them
 * @param {StorageLevel} storageLevel  Storage level to use for storing the received objects
 * @returns {ReceiverInputDStream}
 */
TwitterUtils.createStream0 = function(ssc,twitterAuth,filters,storageLevel) {
throw "not implemented by ElairJS";
//   var ssc_uw = Utils.unwrapObject(ssc);
//   var twitterAuth_uw = Utils.unwrapObject(twitterAuth);
//   var storageLevel_uw = Utils.unwrapObject(storageLevel);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(ssc_uw,twitterAuth_uw,filters,storageLevel_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Create a input stream that returns tweets received from Twitter using Twitter4J's default
 * OAuth authentication; this requires the system properties twitter4j.oauth.consumerKey,
 * twitter4j.oauth.consumerSecret, twitter4j.oauth.accessToken and
 * twitter4j.oauth.accessTokenSecret.
 * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
 * @param {JavaStreamingContext} jssc    JavaStreamingContext object
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream1 = function(jssc) {
throw "not implemented by ElairJS";
//   var jssc_uw = Utils.unwrapObject(jssc);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(jssc_uw);
//   return new JavaReceiverInputDStream(javaObject);
};


/**
 * Create a input stream that returns tweets received from Twitter using Twitter4J's default
 * OAuth authentication; this requires the system properties twitter4j.oauth.consumerKey,
 * twitter4j.oauth.consumerSecret, twitter4j.oauth.accessToken and
 * twitter4j.oauth.accessTokenSecret.
 * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
 * @param {JavaStreamingContext} jssc     JavaStreamingContext object
 * @param {string[]} filters  Set of filter strings to get only those tweets that match them
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream2 = function(jssc,filters) {
throw "not implemented by ElairJS";
//   var jssc_uw = Utils.unwrapObject(jssc);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(jssc_uw,filters);
//   return new JavaReceiverInputDStream(javaObject);
};


/**
 * Create a input stream that returns tweets received from Twitter using Twitter4J's default
 * OAuth authentication; this requires the system properties twitter4j.oauth.consumerKey,
 * twitter4j.oauth.consumerSecret, twitter4j.oauth.accessToken and
 * twitter4j.oauth.accessTokenSecret.
 * @param {JavaStreamingContext} jssc          JavaStreamingContext object
 * @param {string[]} filters       Set of filter strings to get only those tweets that match them
 * @param {StorageLevel} storageLevel  Storage level to use for storing the received objects
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream3 = function(jssc,filters,storageLevel) {
throw "not implemented by ElairJS";
//   var jssc_uw = Utils.unwrapObject(jssc);
//   var storageLevel_uw = Utils.unwrapObject(storageLevel);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(jssc_uw,filters,storageLevel_uw);
//   return new JavaReceiverInputDStream(javaObject);
};


/**
 * Create a input stream that returns tweets received from Twitter.
 * Storage level of the data will be the default StorageLevel.MEMORY_AND_DISK_SER_2.
 * @param {JavaStreamingContext} jssc         JavaStreamingContext object
 * @param {Authorization} twitterAuth  Twitter4J Authorization
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream4 = function(jssc,twitterAuth) {
throw "not implemented by ElairJS";
//   var jssc_uw = Utils.unwrapObject(jssc);
//   var twitterAuth_uw = Utils.unwrapObject(twitterAuth);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(jssc_uw,twitterAuth_uw);
//   return new JavaReceiverInputDStream(javaObject);
};



/**
 * Create a input stream that returns tweets received from Twitter.
 * @param {JavaStreamingContext} jssc          JavaStreamingContext object
 * @param {Authorization} twitterAuth   Twitter4J Authorization object
 * @param {string[]} filters       Set of filter strings to get only those tweets that match them
 * @param {StorageLevel} storageLevel  Storage level to use for storing the received objects
 * @returns {JavaReceiverInputDStream}
 */
TwitterUtils.createStream6 = function(jssc,twitterAuth,filters,storageLevel) {
throw "not implemented by ElairJS";
//   var jssc_uw = Utils.unwrapObject(jssc);
//   var twitterAuth_uw = Utils.unwrapObject(twitterAuth);
//   var storageLevel_uw = Utils.unwrapObject(storageLevel);
//   var javaObject =  org.apache.spark.streaming.twitter.TwitterUtils.createStream(jssc_uw,twitterAuth_uw,filters,storageLevel_uw);
//   return new JavaReceiverInputDStream(javaObject);
};





/**
 * @constructor
 * @classdesc Twitter Authorization.
 * @param {string} oauthConsumerKey
 * @param {string} oauthConsumerSecret
 * @param {string} oauthAccessToken
 * @param {string} oauthAccessTokenSecret
 */
var TwitterAuthorization = function(oauthConsumerKey,oauthConsumerSecret,oauthAccessToken,oauthAccessTokenSecret) {
    var AuthorizationFactory=Java.type("twitter4j.auth.AuthorizationFactory");
    var ConfigurationBuilder=Java.type("twitter4j.conf.ConfigurationBuilder");
    var conf=new ConfigurationBuilder().setOAuthConsumerKey(oauthConsumerKey).setOAuthConsumerSecret(oauthConsumerSecret).
      setOAuthAccessToken(oauthAccessToken).setOAuthAccessTokenSecret(oauthAccessTokenSecret).build();
    var auth=AuthorizationFactory.getInstance(conf);
    JavaWrapper.call(this, auth);

};

TwitterAuthorization.prototype = Object.create(JavaWrapper.prototype);

TwitterAuthorization.prototype.constructor = TwitterAuthorization;
