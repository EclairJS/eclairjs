#!/bin/bash

cat /dream.txt | while read x ; do sleep 1 ; echo $x ; done | /opt/kafka_2.10-0.8.2.2/bin/kafka-console-producer.sh --topic=tlog --broker-list=`broker-list.sh`
