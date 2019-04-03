# Inventory System

An inventory system which could be used by any retailer/hospitality business. Helps to perform actions such as updating stock levels and adding or removing new products etc.

## Technical Information

#### Routes
- `/healthcheck` : Shows the app is up with a basic JSON respose including current date and time.
- `/item` : Accepts a POST request with a JSON body allowing you to create an item through the API and store it in the database.
- `/item/:itemId` : Allows you to retrieve an item from the database with a GET request and an itemId appended to the URL.

#### Prequesites
`Node.js`, `npm`, `MongoDB`, `TypeScript`, `Docker`

#### Development Environment (Docker)
You will need docker setup on your environment to be able to run this through Docker. I suggest coming [here](https://hub.docker.com/search/?type=edition&offering=community) and installing the community edition. Then you can simply do:

- Run `docker build -t inventory-system .`
    - NOTE: The first build will take the longest due to packages being pulled in etc. Subsequent builds should be a lot faster.
- Run `docker-compose up` or `docker-compose up -d` to run the logging in detached mode.
- Visit `http://localhost:3001/healthcheck` to ensure that the app spun up correctly.

#### Development Environment (Locally)
You will need Node.js, npm and MongoDB all up and running on your local environment. In terms of the MongoDB config in the config/default.json, feel free to modify the connection string to what you have setup with your version of MongoDB. Then you can simply do the following:

- Run `npm install`
- Run `npm start`
- Visit `http://localhost:3001/healthcheck` or - depending on your `/etc/hosts` file - `http://127.0.0.1:3001/healthcheck`, to ensure that the app spun up correctly.

### Running Tests
Run the tests to make sure everything is okay. To do this simply run: `npm test`.

To test the API once it is spun up, you can use the following curl command to create an item in the database:

```curl -H "Content-Type: application/json" -X POST http://localhost:3001/item -d '{ "itemName": "Milk", "description": "This is a carton of Milk.", "price": "0.99" }'```

You can then use the `_id` value from the response of that request to perform a fetch of the same item. You can simply go to your browser and visit `http://localhost:3001/item/:itemId` or you can use this curl request:

```curl http://localhost:3001/item/3x4mp13-1t3m-1D``` - replcacing "3x4mp13-1t3m-1D" with your previous requests ID.