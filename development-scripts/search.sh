#!/bin/bash

FIND_TERM=$1

if [[ -z $FIND_TERM ]]; then
  echo "ERROR: Please give find term."
  exit
fi

grep -r "$FIND_TERM" src
