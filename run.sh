#!/bin/bash

up() {
    docker-compose -f docker-compose.yml up --build
}

down() {
    docker-compose -f docker-compose.yml down
}

MODE=$1

if [ "${MODE}" == "up" ]
then
  up
elif [ "${MODE}" == "down" ]
then
  down
else
  echo "ERROR: The \"up\" or \"down\" command must be in the parameter."
  exit 1
fi