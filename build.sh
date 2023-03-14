yarn build:all &

wait $!

docker-compose build &

wait $!

# rename images to ready for deployment
docker tag thepro-resource-api asia.gcr.io/the-pro-tutor-by-kppm/thepro-resource-api
docker tag thepro-auth-api asia.gcr.io/the-pro-tutor-by-kppm/thepro-auth-api
