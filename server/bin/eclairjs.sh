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



#
# Check for spark jar
#
if [ -z "$SPARK_HOME" ]; then
    echo "Need to set SPARK_HOME to the location of the Spark distribution"
    exit 1
fi

#
# Check for eclairJS-nashorn jar
#
if [ -z "$ECLAIRJS_JAR" ]; then
    export ECLAIRJS_JAR=./target/eclairjs-nashorn-0.8-SNAPSHOT-jar-with-dependencies.jar
fi

#
# Check for java 1.8
#
if [[ -n "$JAVA_HOME" ]] && [[ -x "$JAVA_HOME/bin/java" ]];  then
        #echo found java executable in JAVA_HOME
        _java="$JAVA_HOME/bin/java"
elif type -p java > /dev/null; then
    #echo found java executable in PATH
    _java=java

else
    echo "Java 8 required, please Java 1.8.0 or greater."
    exit 1
fi

#
# Check Java version
#

if [[ "$_java" ]]; then
    java_version=$("$_java" -version 2>&1 | awk -F '"' '/version/ {print $2}')
    array=(${java_version//./ })
#    for i in "${!array[@]}"
#    do
#        echo "$i=>${array[i]}"
#    done

    # Convert stringgs to base 10 numbers
    version=$((10#${array[0]}));
    release=$((10#${array[1]}));
    array=(${array[2]//_/ });
    minor=$((10#${array[0]}));
    build=$((10#${array[1]}));

#    echo "version $version release $release minor $minor build $build";

    # Check version numbers for Sun Java
    if (( $version < 1 )) || (( $release < 8 )) || (( $minor < 0 )) || (( $build <  90 )); then
        #
        # Failed sun Java version test, could be IBM version of Java so we will check that now
        #
        vendor=$("$_java" -version 2>&1 | awk -F '"' '/IBM/ {print $0}')
        #echo "vendor $vendor";
        if [[ "$vendor" ]]; then
           build=$(echo $vendor | cut -d' ' -f5 | cut -d',' -f1)
           ibmVersion=$(echo $vendor | cut -d' ' -f7)
#          echo build "$build"
#          echo ibmVersion "$ibmVersion"
#          echo vendor "$vendor"
           array=(${ibmVersion//./ })
#            for i in "${!array[@]}"
#            do
#            echo "$i=>${array[i]}"
#            done
            version=$((10#${array[0]}));
            release=$((10#${array[1]}));
            minor=$((10#${array[2]}));
            array=(${build//./ });
            build_major=$((10#${array[0]}));
            build_minor=$((10#${array[1]}));
#            echo "version $version release $release minor $minor build $build";
            if (( $version < 1 )) || (( $release < 8 )) || (( $minor < 0 )) || (( $build_major <  2 )) || (( $build_minor <  8 )); then
             echo IBM java version 1.8.0 Build 2.8 or greater is required.
                 exit 1
           fi
        else
           echo java version greater than 1.8.0_90 is required.
           exit 1
        fi
    fi
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


if [[ $options != *"-Dlog4j.configuration="* ]]
then
  if [ -z "$options" ]; then
    option=" ";
  fi
  options="$options --driver-java-options -Dlog4j.configuration=file:\"./src/main/resources/conf/log4j.prop\"";
fi

#
# start the REPL
#

exec "${SPARK_HOME}"/bin/spark-submit --class org.eclairjs.nashorn.SparkJS --name "EclairJSShell" $options $ECLAIRJS_JAR  $proargs
