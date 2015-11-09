#!/usr/bin/env bash

#
# Copyright 2015 IBM Corp.
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

usage() {
	echo Usage: $0 [options] [file]
    echo
	echo "options:"
	echo "   --help                      usage message"
	echo "   --master MASTER_URL         spark://host:port, mesos://host:port, yarn, or local."
	echo "   --name NAME                 A name of your application."
	
}

#
# Check for spark jar
#
if [ -z "$SPARK_JAR" ]; then
    echo "Need to set SPARK_JAR to the location of the Spark assembly jar"
    exit 1
fi

#
# Check for eclairJS-nashorn jar
#
if [ -z "$ECLAIRJS_JAR" ]; then
	export ECLAIRJS_JAR=./target/eclairjs-nashorn-0.1.jar
fi

# 
# Check for java 1.8
#
if type -p java > /dev/null; then
	#echo found java executable in PATH
	_java=java
elif [[ -n "$JAVA_HOME" ]] && [[ -x "$JAVA_HOME/bin/java" ]];  then
		#echo found java executable in JAVA_HOME     
		_java="$JAVA_HOME/bin/java"
else
	echo "Java 8 required, please Java 1.8.0_60 or greater."
	exit 1
fi

if [[ "$_java" ]]; then
	version=$("$_java" -version 2>&1 | awk -F '"' '/version/ {print $2}')
	#echo version "$version"
	if [[ "$version" < "1.8.0_60" ]]; then
	    echo java version greater than 1.8.0_59 is required.
	    exit 1
	fi
fi


# Use > 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use > 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to > 0 the /etc/hosts part is not recognized ( may be a bug )
while [[ $# > 0 ]]
do
key="$1"

case $key in
	-h|--help)
    DISPLAY_HELP="true"
	shift # past argument
	;;
    -n|--name)
    export APP_NAME="$2"
    shift # past argument
    ;;
    -m|--master)
    export MASTER="$2"
    shift #past argument
    ;;
    *)
    SCRIPT_FILE=$1
    ;;
esac
shift # past argument or value
done

if [[ -n $DISPLAY_HELP ]]; then
	usage
	exit 1
fi

#
# start the REPL
#
$_java -cp $ECLAIRJS_JAR:$SPARK_JAR org.eclairjs.nashorn.SparkJS $SCRIPT_FILE
