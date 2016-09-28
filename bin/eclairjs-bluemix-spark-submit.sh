#!/usr/bin/env bash

#
# Copyright 2016 IBM Corp.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

#
# This script is a convince script for submitting Spark Jobs to the BlueMix Spark service. https://console.ng.bluemix.net/catalog/services/apache-spark/
# In order to submit jobs you must have a BlueMix account, and a Spark Service instance configured for your account.
# You will need to vcap.json with the service credentials as describe in step 3 https://console.ng.bluemix.net/docs/services/AnalyticsforApacheSpark/index-gentopic3.html#using_spark-submit
# This script used the BlueMix spark-sbumit.sh script that can be download from https://spark-service-attr-yp.ng.bluemix.net/spark_service_attr/spark-submit.sh
# Note the location where the script is download to and set the BLUEMIX_SPARK_SUMIT_SH environment variable to its location.
#

printUsage()
{
   printf "\nUsage:"
   printf "\n     eclairjs-bluemix-spark-submit.sh --vcap <vcap-file> [options] <app jar | python file> [app arguments]"
   printf "\n     eclairjs-bluemix-spark-submit.sh --master [cluster-master-url] --conf 'PROP=VALUE' [options] <app jar | python file> [app arguments]"
   printf "\n     eclairjs-bluemix-spark-submit.sh --vcap <vcap-file> --kill [submission ID] "
   printf "\n     eclairjs-bluemix-spark-submit.sh --vcap <vcap-file> --status [submission ID] "
   printf "\n     eclairjs-bluemix-spark-submit.sh --kill [submission ID] --master [cluster-master-url] --conf 'PROP=VALUE' "
   printf "\n     eclairjs-bluemix-spark-submit.sh --status [submission ID] --master [cluster-master-url] --conf 'PROP=VALUE' "
   printf "\n     eclairjs-bluemix-spark-submit.sh --help  "
   printf "\n     eclairjs-bluemix-spark-submit.sh --version  "
   printf "\n\n     vcap-file:                  json format file that contains spark service credentials, "
   printf "\n                                 including cluster_master_url, tenant_id, instance_id, and tenant_secret"
   printf "\n     cluster_master_url:         The value of 'cluster_master_url' on the service credentials page"
   printf "\n\n options:"
   printf "\n     --help                      Print out usage information."
   printf "\n     --version                   Print out the version of spark-submit.sh"
   printf "\n     --master MASTER_URL         MASTER_URL is the value of 'cluster-master-url' from spark service instance credentials"
   printf "\n     --deploy-mode DEPLOY_MODE   DEPLOY_MODE must be 'cluster'"
 #  printf "\n     --class CLASS_NAME          Your application's main class (for Java / Scala apps)."
   printf "\n     --name NAME                 A name of your application."
   printf "\n     --jars JARS                 Comma-separated list of local jars to include on the driver and executor classpaths."
   printf "\n     --files FILES               Comma-separated list of files to be placed in the working directory of each executor."
   printf "\n     --conf PROP=VALUE           Arbitrary Spark configuration property. The values of tenant_id, instance_id and tenant_secret can be passed"
   printf "\n     --py-files PY_FILES         Comma-separated list of .zip, .egg, or .py files to place on the PYTHONPATH for Python apps."
   printf "\n\n     --kill SUBMISSION_ID        If given, kills the driver specified."
   printf "\n     --status SUBMISSION_ID      If given, requests the status of the driver specified."
   printf "\n"
   exit 0
}


#
# Check for eclairJS-nashorn jar
#
if [ -z "$ECLAIRJS_JAR" ]; then
	export ECLAIRJS_JAR=./target/eclairjs-nashorn-0.8-SNAPSHOT-jar-with-dependencies.jar
fi

#
# Check for BlueMix spark-submit.sh
#
if [ -z "$BLUEMIX_SPARK_SUMIT_SH" ]; then
    echo "Set environment variable 'BLUEMIX_SPARK_SUMIT_SH' to the location of the BlueMix spark-submit.sh script.";
    echo "The script can be downloaded from  https://spark-service-attr-yp.ng.bluemix.net/spark_service_attr/spark-submit.sh";
    exit 1;
fi

if [[ $# == 0 ]]
then
   printUsage
   exit 1
fi


# Use > 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use > 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to > 0 the /etc/hosts part is not recognized ( may be a bug )
options=" ";
proargs=" ";
while [[ $# > 0 ]]
do
key="$1"

case $key in
	-*)
    options="$options $1 $2";
    shift # past argument
    ;;
    *)
    proargs+=" $1"
    ;;
esac
shift # past argument or value
done


#
# Submit job to BlueMix Spark service/
#
#./spark-submit.sh --vcap ./vcap.json --deploy-mode cluster --files /Users/billreed/eclairjs_dev/eclairjs-nashorn/examples/test.js --class org.eclairjs.nashorn.SparkJS --master https://spark.bluemix.net ./target/eclairjs-nashorn-0.8-SNAPSHOT-jar-with-dependencies.jar file://test.js

exec "${BLUEMIX_SPARK_SUMIT_SH}" --class org.eclairjs.nashorn.SparkJS $options $ECLAIRJS_JAR  $proargs

