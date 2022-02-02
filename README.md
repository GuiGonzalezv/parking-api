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


### Rotas base
#### Analise
- (GET) /analysis/  - Retorna todas análises disponiveis no banco
```
(JSON RETORNO)

[ 
    {
        "analysisId": 2,
        "fullName": "Teste23232",
        "cpf": "000.111.222-00",
        "analyzedAt": null,
        "documentos": [
            {
                "id": 5,
                "status": null,
                "src": "http://..."
            },
            {
                "id": 6,
                "status": null,
                "src": "http://..."
            },
            {
                "id": 7,
                "status": null,
                "src": "http://..."
            },
            {
                "id": 8,
                "status": null,
                "src": "http://..."
            }
        ]
    }
]
```

- (GET) /analysis/{id} - Retorna uma análise pelo id
```
(JSON RETORNO) 

{
    "analysisId": 1,
    "fullName": "Teste",
    "cpf": "000.111.222-00",
    "analyzedAt": "2021-03-08T04:30:00.136Z",
    "documentos": [
        {
            "id": 1,
            "status": "error",
            "src": "http://..."
        },
        {
            "id": 2,
            "status": "fraud",
            "src": "http://..."
        },
        {
            "id": 3,
            "status": "fraud",
            "src": "http://..."
        },
        {
            "id": 4,
            "status": "valid",
            "src": "http://..."
        }
    ]
}
```
- (POST) /analysis - Insere uma nova análise (Por não compreender as regras de negócio, fiquei com duvida se a aplicação fazia a busca pelo documento, ou se o mesmo era inserido para ser analisado, então optei por deixar como obrigatório a inserção de ao menos um documento)
```
(JSON ENTRADA)

{
  "fullName": "Teste23232",
  "cpf": "000.111.222-00",
  "documentos": [
      {
        "src": "http://..."
      }
    ]
}


(JSON SAÍDA)

{
    "analysisId": 2
}
``` 


- Made by Guilherme Gonzalez Vieira
