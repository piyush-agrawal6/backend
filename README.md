
# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run start` to start the server locally

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration and connects it to MongoDB using mongoose.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `middlewares/` - This folder contains the login and registration middlewares.

## API Reference

#### User Registration

```http
  POST /api/register
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
| | | Email , Password , Name | Registration Successful|

#### User Login

```http
  POST /api/login
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
| | | Email , Password  | Login Successful|

#### Create Flight

```http
  POST /api/flights
```

- Body - airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number

- Responce - Flight Created

#### Create Booking

```http
  POST /api/booking
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
| | |user id , flight id  | Booking Successful|

#### Get all flights

```http
  GET /api/flights
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
| | |  | Flights Array|

#### Get single flight

```http
  GET /api/flights/${id}
```

| Parameter | Type     | Body                       |Responce|
| :-------- | :------- | :----------------- | | :-------------------------------- |
| `id`      | `string` | Flight Id  | Flight Array |

#### Get all bookings
```http
  GET /api/dashboard
```

| Parameter | Type     | Body                       |Responce|
| :-------- | :------- | :----------------- | | :-------------------------------- |
|       | |   | Bookings Array |

#### Edit Flight

```http
  PATCH /api/flights/${id}
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
|id | | | Flight Edited|

#### Delete Booking

```http
  DELETE /api/flights/${id}
```

| Parameter | Type     |  Body                |Responce|
| :-------- | :------- | :------------------------- |:----|
|id | | | Flight deleted|
