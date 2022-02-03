# Parking API

A simple API simulating a parking system


## :rocket: Tools
The technologies listed below were used in the project
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/)
- [Jest](https://jestjs.io/pt-BR/)

## :information_source: Clone Instructions
### API Configuration (running locally)
```git
$ git clone https://github.com/GuiGonzalezv/parking-api.git

$ yarn install

$ Configure the `.env` file with your database connection specs

$ yarn start
```

### API Configuration (Docker)
```git
$ git clone https://github.com/GuiGonzalezv/parking-api.git

$ docker-compose up
```
## :test_tube: Tests
### Running tests
```git
$ yarn test
```


### Base rotes
#### History
- (GET) /parking/:plate  - Return history by plate
```
(JSON RETURN)

[
	{
		"_id": "61fb3fea0e6356a9ff21f7cf",
		"paid": true,
		"left": true,
		"time": "2 minutes"
	},
    {
		"_id": "61f980737986f91f92ca6284",
		"paid": true,
		"left": true,
		"time": "Car is in the parking lot"
	}
]
```

- (POST) /parking - Receives a plate and return a reservation code
```
(JSON INPUT)
{
	"plate": "ZZZ-0000"
}
```
```
(JSON RETURN) 

{
	"reservation": "61fb3fea0e6356a9ff21f7cf"
}
```

- (PUT) /parking/:id/pay - Receives a reservation code (id) and make the payment
```
(JSON RETURN)

{
	"status": 200,
	"message": "Successfully paid"
}
``` 

- (PUT) /parking/:id/out - Receives a reservation code (id) and remove the car from the parking lot
```
(JSON RETURN)

{
	"status": 200,
	"message": "Car left the parking lot"
}
``` 


- Made by Guilherme Gonzalez Vieira
