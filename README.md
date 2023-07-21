  <div style="font-size:25px;text-align:center">PRODUCT SERVICE PROVIDER BOILERPLATE</div>
  <hr>
  
## Installation

```bash
$ npm install
$ npm install -g npm-check-updates
```

# Node and npm versions

- Node: 20.3.1
- npm: 8.19.4

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Supported HTTP calls
| Method | Endpoint |
| ------- | ------- |
| GET | [url](http://localhost:3000)/info |
| POST | [url](http://localhost:3000)/create |
| POST | [url](http://localhost:3000)/renew |
| POST | [url](http://localhost:3000)/upgrade |
| POST | [url](http://localhost:3000)/downgrade |
| POST | [url](http://localhost:3000)/suspend |
| POST | [url](http://localhost:3000)/unsuspend |
| POST | [url](http://localhost:3000)/delete |
| POST | [url](http://localhost:3000)/upgradeable |
| POST | [url](http://localhost:3000)/downgradeable |
| POST | [url](http://localhost:3000)/validate/action-fiels |
| POST | [url](http://localhost:3000)/validate/addons |

## .env required
 ```
 #General
 SERVICE_PROVIDER_TOKEN=test
 ```

## Authentication
 Provider's token as bearer in headers

 *example*
 ```
 Authorization: Bearer test
 ```

 

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Includes

- Swagger (OpenAPI)
- Passport (Authentication)
- Class Validator (Validation)

## Build docker
```bash
docker build . -t <name-of-your-project>
```

### Run docker
```
docker run \
  --rm \
  -e SERVICE_PROVIDER_TOKEN=test \
  -e API_KEY_AZURE="xxxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -e PORT=3001 \
  -e MONGO_URL="mongodb://<username>:<password>@localhost:27017" \
  azuracast
```
