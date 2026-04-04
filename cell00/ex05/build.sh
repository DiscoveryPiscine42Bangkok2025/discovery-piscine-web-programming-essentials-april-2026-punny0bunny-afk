#!/bin/bash

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

# Iterate through all arguments passed to the script
for arg in "$@"
do
    # Create a directory named "ex" followed by the argument
    mkdir "ex$arg"
done
