up() {
    if [ ! -d "mariadb/data" ]
    then
      mkdir mariadb/data      
      chown -R 1000:1000 mariadb/data
    fi
    
    docker-compose --env-file .env-dev -f docker/docker-compose.dev.yml up --build
}

down() {
    docker-compose --env-file .env-dev -f docker/docker-compose.dev.yml down
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