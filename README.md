<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

- Create a .env file, copy the environment variables from the env.example file and prefill with your creds

##

```bash
$ yarn install
```

- will install project dependencies

## Running the app

```bash
# development
$ yarn run start

- will seed users, products and commission data

# watch mode
$ yarn run start:dev

= start server dev mode

# production mode
$ yarn run start:prod
```

## Test

```bash

# e2e tests
$ yarn run test:e2e

- this creates a separate db instance for testing e2e

# test coverage
$ yarn run test:cov
```

## Run docker container

```bash

# run docker in detach mode
$ docker-compose up -d

```


## Deploy with Helm

```bash

# Package and deploy
helm install agent-sales ./deployment

# Or upgrade after changes
helm upgrade agent-sales ./deployment

# View resources
kubectl get all

```

## API DOCUMENTATION

## Auth

### Sign up new agent (POST req)

URL: localhost:3000/auth/signup-agent \
Req Body:

```
{
    "name": "agent one",
    "email": "agent1@gmail.com",
    "password": "password1"
}
```

Req Response:

```
{
    "name": "agent one",
    "email": "agent1@gmail.com",
    "role": "agent",
    "_id": "665822790286602d38faf5b3",
    "createdAt": "2024-05-30T06:53:45.543Z",
    "updatedAt": "2024-05-30T06:53:45.543Z",
    "__v": 0
}
```

### Sign in user (POST req)

URL: localhost:3000/auth/signin \
Req Body:

```
{
    "email": "agent1@gmail.com",
    "password": "password1"
}
```

Req Response:

```
{
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU4MjI3OTAyODY2MDJkMzhmYWY1YjMiLCJlbWFpbCI6ImFnZW50MUBnbWFpbC5jb20iLCJpYXQiOjE3MTcwNTI2OTQsImV4cCI6MTcxNzA1NTY5NH0.9GjU6X2ixJIqxEP4O6No1K6WpCmS9LezYiFjSsoKCPA"
}
```

## Users

NB: (Authorized for user with admin role)

- All requests should contain Bearer Token

### Create new user (POST req)

URL: localhost:3000/users \
Req Body:

```
{
    "name": "agent two",
    "email": "agent2@gmail.com",
    "password": "password1",
    "role": "agent"
}
```

Req Response:

```
{
    "name": "agent two",
    "email": "agent2@gmail.com",
    "role": "agent",
    "_id": "66582a6f15e3862a61999aba",
    "createdAt": "2024-05-30T07:27:43.821Z",
    "updatedAt": "2024-05-30T07:27:43.821Z",
    "__v": 0
}
```

### List users (GET req)

URL: localhost:3000/users \
Req Response:

```
[
    {
        "_id": "665822790286602d38faf5b3",
        "name": "agent one",
        "email": "agent1@gmail.com",
        "role": "agent",
        "createdAt": "2024-05-30T06:53:45.543Z",
        "updatedAt": "2024-05-30T06:53:45.543Z",
        "__v": 0
    },
    {
        "_id": "66582a6f15e3862a61999aba",
        "name": "agent two",
        "email": "agent2@gmail.com",
        "role": "agent",
        "createdAt": "2024-05-30T07:27:43.821Z",
        "updatedAt": "2024-05-30T07:27:43.821Z",
        "__v": 0
    }
]
```

### List one user (GET req)

URL: localhost:3000/users/:id \
Ex. localhost:3000/users/665822790286602d38faf5b3 \
Req Response:

```
{
      "_id": "665822790286602d38faf5b3",
      "name": "agent one",
      "email": "agent1@gmail.com",
      "role": "agent",
      "createdAt": "2024-05-30T06:53:45.543Z",
      "updatedAt": "2024-05-30T06:53:45.543Z",
      "__v": 0
}
```

### Update one user (PATCH req)

URL: localhost:3000/users/:id \
Ex. localhost:3000/users/665822790286602d38faf5b3 \
Req Body:

```
{
    "name": "agent one remastered",
}
```

Req Response:

```
{
      "_id": "665822790286602d38faf5b3",
      "name": "agent one remastered",
      "email": "agent1@gmail.com",
      "role": "agent",
      "createdAt": "2024-05-30T06:53:45.543Z",
      "updatedAt": "2024-05-30T07:47:11.039Z",,
      "__v": 0
}
```

### Delete a user (DELETE req)

URL: localhost:3000/users/:id \
Ex. localhost:3000/users/665822790286602d38faf5b3 \
Req Response:

```
{
      "_id": "665822790286602d38faf5b3",
      "name": "agent one",
      "email": "agent1@gmail.com",
      "role": "agent",
      "createdAt": "2024-05-30T07:48:17.597Z",
      "updatedAt": "2024-05-30T07:48:17.597Z",
      "__v": 0
}
```

## Products

### Create a product (POST req)

URL: localhost:3000/products \
Req Body:

```
{
    "name": "Generic gamepad",
    "type": "entertainment",
    "price": "5000"
}
```

Req Response:

```
{
    "name": "Generic gamepad",
    "type": "entertainment",
    "price": "5000",
    "_id": "6658322a25ec2251f7e2f1ff",
    "createdAt": "2024-05-30T08:00:42.775Z",
    "updatedAt": "2024-05-30T08:00:42.775Z",
    "__v": 0
}
```

### List products (GET req)

URL: localhost:3000/products \
Req Response:

```
[
    {
        "_id": "6658093704982536723b731d",
        "name": "Brake pad",
        "type": "Automotive",
        "price": "5000",
        "createdAt": "2024-05-30T05:05:59.543Z",
        "updatedAt": "2024-05-30T05:05:59.543Z",
        "__v": 0
    },
    {
        "_id": "6658322a25ec2251f7e2f1ff",
        "name": "Generic gamepad",
        "type": "entertainment",
        "price": "5000",
        "createdAt": "2024-05-30T08:00:42.775Z",
        "updatedAt": "2024-05-30T08:00:42.775Z",
        "__v": 0
    }
]
```

### List one product (GET req)

URL: localhost:3000/products/:id \
Ex. localhost:3000/products/6658322a25ec2251f7e2f1ff \
Req Response:

```
{
        "_id": "6658322a25ec2251f7e2f1ff",
        "name": "Generic gamepad",
        "type": "entertainment",
        "price": "5000",
        "createdAt": "2024-05-30T08:00:42.775Z",
        "updatedAt": "2024-05-30T08:00:42.775Z",
        "__v": 0
    }
```

### Update one product (PATCH req)

URL: localhost:3000/products/:id \
Ex. localhost:3000/products/6658322a25ec2251f7e2f1ff \
Req Body:

```
{
    "name": "PS5 Generic gamepad",
    "price: 7000
}
```

Req Response:

```
{
    "_id": "6658322a25ec2251f7e2f1ff",
    "name": "PS5 Generic gamepad",
    "type": "entertainment",
    "price": "7000",
    "createdAt": "2024-05-30T08:00:42.775Z",
    "updatedAt": "2024-05-30T08:10:52.803Z",
    "__v": 0
}
```

### Delete a product (DELETE req)

URL: localhost:3000/products/:id \
Ex. localhost:3000/products/6658322a25ec2251f7e2f1ff \
Req Response:

```
{
    "_id": "6658322a25ec2251f7e2f1ff",
    "name": "PS5 Generic gamepad",
    "type": "entertainment",
    "price": "7000",
    "createdAt": "2024-05-30T08:00:42.775Z",
    "updatedAt": "2024-05-30T08:10:52.803Z",
    "__v": 0
}
```

## Sales

### Record a new sale (POST req)

URL: localhost:3000/sales \
Req Body:

```
{
	"product": "6658093704982536723b731c",
	"quantity": 1
}
```

Req Response:

```
{
    "product": "6658093704982536723b731c",
    "agent": "6658093704982536723b7316",
    "account": "6658391e25ec2251f7e2f216",
    "quantity": 1,
    "totalAmount": 2000,
    "commission": 60,
    "date": "2024-05-30T08:30:22.756Z",
    "_id": "6658391e25ec2251f7e2f218",
    "createdAt": "2024-05-30T08:30:22.757Z",
    "updatedAt": "2024-05-30T08:30:22.757Z",
    "__v": 0
}
```

### List logged in agent individual sales over a period of time (GET req)

URL: localhost:3000/sales/individual?startDate=""&endDate="" \
Ex. localhost:3000/sales/individual?startDate=2024-05-27&endDate=2024-05-31 \
Req Response:

```
[
    {
        "_id": "6658391e25ec2251f7e2f218",
        "product": {
            "_id": "6658093704982536723b731c",
            "name": "Google Fire Stick",
            "type": "Electronic",
            "price": "2000",
            "createdAt": "2024-05-30T05:05:59.543Z",
            "updatedAt": "2024-05-30T05:05:59.543Z",
            "__v": 0
        },
        "agent": "6658093704982536723b7316",
        "account": "6658391e25ec2251f7e2f216",
        "quantity": 1,
        "totalAmount": 2000,
        "commission": 60,
        "date": "2024-05-30T08:30:22.756Z",
        "createdAt": "2024-05-30T08:30:22.757Z",
        "updatedAt": "2024-05-30T08:30:22.757Z",
        "__v": 0
    },
    {
        "_id": "66583c56419200100dc8e2d4",
        "product": {
            "_id": "6658093704982536723b731e",
            "name": "Girl with a Pearl Earring",
            "type": "Art",
            "price": "10000",
            "createdAt": "2024-05-30T05:05:59.544Z",
            "updatedAt": "2024-05-30T05:05:59.544Z",
            "__v": 0
        },
        "agent": "6658093704982536723b7316",
        "account": "66583c56419200100dc8e2d2",
        "quantity": 2,
        "totalAmount": 20000,
        "commission": 600,
        "date": "2024-05-30T08:44:06.816Z",
        "createdAt": "2024-05-30T08:44:06.817Z",
        "updatedAt": "2024-05-30T08:44:06.817Z",
        "__v": 0
    }
]
```

### List all sales made by agents(GET req)

- Done by admin role users
  URL: localhost:3000/sales/?startDate=""&endDate="" \
  Ex. localhost:3000/sales?startDate=2024-05-27&endDate=2024-05-31 \
  Req Response:

```
[
    {
        "_id": "6658391e25ec2251f7e2f218",
        "product": {
            "_id": "6658093704982536723b731c",
            "name": "Google Fire Stick",
            "type": "Electronic",
            "price": "2000",
            "createdAt": "2024-05-30T05:05:59.543Z",
            "updatedAt": "2024-05-30T05:05:59.543Z",
            "__v": 0
        },
        "agent": {
            "_id": "6658093704982536723b7316",
            "name": "marvin espira",
            "email": "espira@example.com",
            "password": "$2a$10$k2C0kqZ0e9grjFVBDhnFZerNSNvt7g.jfCHFtu4v8Adll5PZJ.aPG",
            "role": "agent",
            "createdAt": "2024-05-30T05:05:59.523Z",
            "updatedAt": "2024-05-30T05:05:59.523Z",
            "__v": 0
        },
        "account": {
            "_id": "6658391e25ec2251f7e2f216",
            "agent": "6658093704982536723b7316",
            "total_commission_paid": 0,
            "total_commission_pending": 60,
            "total_sales": 2000,
            "date": "2024-05-30T08:30:22.750Z",
            "createdAt": "2024-05-30T08:30:22.753Z",
            "updatedAt": "2024-05-30T08:30:22.753Z",
            "__v": 0
        },
        "quantity": 1,
        "totalAmount": 2000,
        "commission": 60,
        "date": "2024-05-30T08:30:22.756Z",
        "createdAt": "2024-05-30T08:30:22.757Z",
        "updatedAt": "2024-05-30T08:30:22.757Z",
        "__v": 0
    },
    {
        "_id": "66583c56419200100dc8e2d4",
        "product": {
            "_id": "6658093704982536723b731e",
            "name": "Girl with a Pearl Earring",
            "type": "Art",
            "price": "10000",
            "createdAt": "2024-05-30T05:05:59.544Z",
            "updatedAt": "2024-05-30T05:05:59.544Z",
            "__v": 0
        },
        "agent": {
            "_id": "6658093704982536723b7316",
            "name": "marvin espira",
            "email": "espira@example.com",
            "password": "$2a$10$k2C0kqZ0e9grjFVBDhnFZerNSNvt7g.jfCHFtu4v8Adll5PZJ.aPG",
            "role": "agent",
            "createdAt": "2024-05-30T05:05:59.523Z",
            "updatedAt": "2024-05-30T05:05:59.523Z",
            "__v": 0
        },
        "account": {
            "_id": "66583c56419200100dc8e2d2",
            "agent": "6658093704982536723b7316",
            "total_commission_paid": 0,
            "total_commission_pending": 660,
            "total_sales": 22000,
            "date": "2024-05-30T08:44:06.802Z",
            "createdAt": "2024-05-30T08:44:06.809Z",
            "updatedAt": "2024-05-30T08:44:06.809Z",
            "__v": 0
        },
        "quantity": 2,
        "totalAmount": 20000,
        "commission": 600,
        "date": "2024-05-30T08:44:06.816Z",
        "createdAt": "2024-05-30T08:44:06.817Z",
        "updatedAt": "2024-05-30T08:44:06.817Z",
        "__v": 0
    }
]
```

## Statements/Reports

### List a loggedin agent sales reports (GET req)

URL: localhost:3000/sales/statements/?startDate=""&endDate=""&sendToMail=false \
Ex.localhost:3000/sales/statements/?startDate=2024-05-A27&endDate=2024-05-31&sendToMail=false \
Req Response:

```
{
    "userName": "marvin espira",
    "userEmail": "espira@example.com",
    "startDate": "2024-05-27T00:00:00.000Z",
    "endDate": "2024-05-31T00:00:00.000Z",
    "totalSaleValue": 22000,
    "totalCommission": 660,
    "soldProducts": [
        {
            "product_name": "Google Fire Stick",
            "price": "2000",
            "quantity": 1,
            "total_value": 2000,
            "commission": 60,
            "date_sold": "2024-05-30T08:30:22.756Z"
        },
        {
            "product_name": "Girl with a Pearl Earring",
            "price": "10000",
            "quantity": 2,
            "total_value": 20000,
            "commission": 600,
            "date_sold": "2024-05-30T08:44:06.816Z"
        }
    ]
}
```

### List a loggedin agent sales reports and send to mail (GET req)

URL: localhost:3000/sales/statements/?startDate=""&endDate=""&sendToMail=true \
Ex.localhost:3000/sales/statements/?startDate=2024-05-A27&endDate=2024-05-31&sendToMail=true \
Req Response:

```
{
    "userName": "marvin espira",
    "userEmail": "espira@example.com",
    "startDate": "2024-05-27T00:00:00.000Z",
    "endDate": "2024-05-31T00:00:00.000Z",
    "totalSaleValue": 22000,
    "totalCommission": 660,
    "soldProducts": [
        {
            "product_name": "Google Fire Stick",
            "price": "2000",
            "quantity": 1,
            "total_value": 2000,
            "commission": 60,
            "date_sold": "2024-05-30T08:30:22.756Z"
        },
        {
            "product_name": "Girl with a Pearl Earring",
            "price": "10000",
            "quantity": 2,
            "total_value": 20000,
            "commission": 600,
            "date_sold": "2024-05-30T08:44:06.816Z"
        }
    ]
}
```
