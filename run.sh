if [ ! -d node_modules ]; then
    npm install
    echo "done"
fi

docker-compose -f docker/docker-compose.yml up --build
