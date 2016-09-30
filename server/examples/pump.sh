#!/bin/bash

docker run --rm -v `pwd`:/data -v /var/run/docker.sock:/var/run/docker.sock -e HOST_IP=$1 -e ZK=$1:2181 -i -t wurstmeister/kafka:0.8.2.2 /data/run.sh
