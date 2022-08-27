# React.js | MySQL Course Backend

<br/>

## Usage

### Install Package

```bash
npm install
```

### Run Server

```bash
npm run server
```

<br/>

## Project Structure

```bash
_root
├── config
│   └── database.js
├── controllers
│   └── user-controllers.js
├── models
│   └── user-model.js
├── routes
│   └── user-routes.js
├── .env
├── server.js
├── package.json
├── request.rest
└── README.md
```

<br/>

## Setup

```bash
npm i express dotenv express-async-errors colors
```

> .env

```env
NODE_ENV="development"
PORT="5000"

DB_HOST=""
DB_NAME=""
DB_USERNAME=""
DB_PASSWORD=""
DB_DIALECT=""
```

> package.json

```json
"scripts": {
  "start": "node server",
  "server": "nodemon server"
}
```

<br/>

## Server Setup

> server.js

```js
require("colors");
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is listening on port: ${PORT}`));
```

<br/>

## Database Setup

- Sequelize v6
  > Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server, Amazon Redshift and Snowflake’s Data Cloud. It features solid transaction support, relations, eager and lazy loading, read replication and more.
  > <br/> https://sequelize.org/docs/v6/

```bash
npm i sequelize
```

### Connecting To Database

- to connect to the database, we must create a Sequelize instance.
  > https://sequelize.org/docs/v6/getting-started/
- also install driver for our database

```bash
npm i mysql2
```

- import { Sequelize } from "sequelize"
- use Sequelize with passing parameters separately (sqlite)
- const db = new Sequelize({ \_\_PARAMETERS\_\_ })

> database.js

```js
const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
});

module.exports = db;
```

<br/>

## User Model

### Sequilize Model Basics

> https://sequelize.org/docs/v6/core-concepts/model-basics/

- create models folder on root
- add user-model.js in it

> user-model.js

```js
const { Sequelize } = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
```

### Generate Table in Database Automatically

- create anonymous asynchronous function and put it after module.exports
- this function is to create a table if it doesn't exist in the database automatically

```js
(async function () {
  await db
    .sync()
    .then(() => console.log("Table created...".blue.underline))
    .catch((err) => console.log(err));
})();
```

<br/>

## User Controllers

### Sequilize Model Querying - Basics

> https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

> user-controllers.js

```js
const User = require("../models/user-model");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

exports.getUserByID = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "user deleted" });
};
```

<br/>

## User Routes

- create routes folder on root
- add user-routes.js in it

> user-routes.js

```js
const express = require("express");
const router = express.Router();

const { getAllUsers, getUserByID, createUser, updateUser, deleteUser } = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserByID).put(updateUser).delete(deleteUser);

module.exports = router;
```

### Implementing User Routes

- go to server.js
- import UserRoutes from "./routes/user-routes"
- pass UserRoutes with app.use()
- 1st argument is url path ("/users")
  > output url: http://localhost:5000/users
- 2nd argument is user routes

> server.js

```js
const UserRoutes = require("./routes/user-routes");
app.use("/users", UserRoutes);
```

<br/>

## Test Response With REST Client

- REST Client Extension
  > REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.
  > <br/> https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- create request.rest on the root folder

```bash
_root
└── request.rest
```

### Get All Users

> request.rest

- Send Request

```bash
### Get All Users
GET http://localhost:5000/users
```

- Response

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
# ...

[] # empty array because there is nothing in our database
```

- Response

```bash
# if there is value in database

[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "gender": "male",
    # ...
  }
]
```

### Get Single User

- Send Request

```bash
### Get Single User by ID
GET http://localhost:5000/users/1
```

- Response

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
# ...

null # null because there is nothing in our database
```

- Response

```bash
# if user id found in database

{
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "gender": "Male",
    # ...
}
```

### Create New User

- Send Request

```bash
### Create New User
POST http://localhost:5000/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@mail.com",
    "gender": "Male"
}
```

- Response

```bash
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
# ...

{
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "gender": "Male",
    # ...
}
```

### Update User

- Send Request

```bash
### Update User
PUT http://localhost:5000/users/1
Content-Type: application/json

{
    "name": "John Doe Update"
}
```

- Response

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
# ...

[
    1
]
```

### Delete User

- Send Request

```bash
### Delete User
DELETE http://localhost:5000/users/1
```

- Response

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
# ...

{
    "message": "user deleted"
}
```
