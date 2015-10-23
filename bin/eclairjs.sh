if [ -z "$SPARK_JAR" ]; then
    echo "Need to set SPARK_JAR"
    exit 1
fi  
#EXPORT SPARK_JAR = /Users/billreed/spark-assembly-1.4.1-hadoop2.6.0.jar
java -cp ./target/eclair-nashorn-0.1.jar:$SPARK_JAR com.ibm.eclair.SparkJS $1