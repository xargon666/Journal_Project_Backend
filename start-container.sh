docker run -it \
    -p 3000:3000 \
    --name journal-backend \
    --mount type=bind,src="$(pwd)",dst=/code \
    -w /code \
    node:12.18.4 \
    bash -c "npm install && npm start"

