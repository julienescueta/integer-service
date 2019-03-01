# integer-service

This is an identifier service that allows you to programmatically retrieve an identifier. Identifiers initially start at 0 and increment sequentially as you request a new one. You can optionally view your current identifier, and, modify it to a numeric value of your choice.

## Demo

The application is running live on AWS and can be reached at http://ec2-52-33-69-219.us-west-2.compute.amazonaws.com.

### Usage

#### Creating A New User

To create a user, issue a `POST` request to `/users` with a JSON payload containing `email` and `password`.

The response will contain an `api_key` and the initial `identifier`. *Be sure to save your `api_key`*!

```
curl --header "Content-Type: application/json" \
--request POST \
--data '{"email":"41414141@example.com","password":"abc123"}' \
http://ec2-52-33-69-219.us-west-2.compute.amazonaws.com/users
 
{"api_key":"1168ad16-512e-46df-aaf5-f38ff539ca5f","identifier":"0"}
```

#### Next Identifier

To retrieve the next identifier, issue a `GET` request to `/next` with your `api_key`. The response will contain your new `identifier`.

```
curl --header "Content-Type: application/json" \
--request GET \
http://ec2-52-33-69-219.us-west-2.compute.amazonaws.com/next?api_key=1168ad16-512e-46df-aaf5-f38ff539ca5f

{"identifier":101}
```

#### Current Identifier

To retrieve your current identifier, issue a `GET` request to `/current` with your `api_key`.

```
curl --header "Content-Type: application/json" \
--request GET \
http://ec2-52-33-69-219.us-west-2.compute.amazonaws.com/current?api_key=1168ad16-512e-46df-aaf5-f38ff539ca5f

{"identifier":101}
```

#### Modify Identifier

To modify your current identifier, issue a `PUT` request to `/current` with your `api_key`. You will need to supply a JSON payload containing the updated identifier.

```
curl --header "Content-Type: application/json" \
--request PUT \
--data '{"identifier":99}' \
http://ec2-52-33-69-219.us-west-2.compute.amazonaws.com/current?api_key=1168ad16-512e-46df-aaf5-f38ff539ca5f

{"identifier":99}
```

## Assumptions

- This service is unencrypted and is insecure for Production use. `api_key` is transmitted in plain-text.
- This service was built as an MVP and does not scale well under heavy traffic. There is a single point of failure to the database.
- Email, password and api_key are limited to 255 characters, but extending this should be trivial.
- Identifier is limited by `Number.MAX_SAFE_INTEGER` which is 9007199254740991 in ES6.
- The API does not have versioning implemented, which may break backwards compatibility with clients.

### Notes

- Implement https!
- Add a script to initialize `api` and `test` databases
- Clean-up data access layer so a single class provides all of the data store and retrieval
- Add versioning
- Clean up extraneous Feathers pieces
- Fix db health-check and initializer so you don't need to workaround by forcing api service to restart. E.g.
  1. > docker swarm deploy -c docker-compose.yml -c docker-compose.production.yml idservice
  1. Wait for database to initialize
  1. > docker service update --force idservice_api

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

It was built using Node v10.15.2, npm 6.4.1, Docker 18.09.2 and docker-compose 1.23.2.

### Getting Started

To run the application, you should:

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), [docker](https://docs.docker.com/install) and [docker-compose](https://docs.docker.com/compose/install) installed.

2. Install your dependencies

    ```
    cd path/to/integer-service; npm install
    ```

3. Deploy the application

    ```
    docker-compose up -d
    ```

Note that there is currently a bug with the `api` database initialization in postgres. On your first deployment, you will need to tear down the services with `docker-compose down` and redeploy them again using `docker-compose up -d`. Subsequent deployments should not have this problem.

### Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
