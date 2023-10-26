cd Microservices/twitter-feed-service
npm start &

# Start the Twitter frontend
cd ../../Microfrontends/twitter-feed-frontend
npm start &

# Start the container
cd ../container
npm start