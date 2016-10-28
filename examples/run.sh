#!/bin/bash

f=$@

EXAMPLE_ROOT=`pwd`

if [ "$1" == "--docker" ]; then
    EXAMPLE_ROOT=/tmp
    f=${@:2}
fi

export EXAMPLE_ROOT

node --harmony $f
