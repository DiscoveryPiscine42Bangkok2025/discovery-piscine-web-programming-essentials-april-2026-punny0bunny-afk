#!/bin/bash

# Check if the number of arguments ($#) is 0
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # Loop through the first 3 arguments only
    # $@ represents all arguments, but we can iterate specifically
    count=0
    for arg in "$@"; do
        if [ $count -lt 3 ]; then
            echo "$arg"
            count=$((count + 1))
        fi
    done
fi
