# Mongoose-Express-CRUD-Mastery

## clone the code and install this=>

1. express
2. mongose
3. typescript
4. cors
5. dotenv to access environment virable

```js
npm init -y
npm install express
npm install mongodb
npm i dotenv
npm install mongoose --save
npm install typescript --save-dev
npm i cors
tsc -init
npm i --save-dev @types/express
npm i --save-dev @types/cors
```

```bash
//then to to the tsconfig.json
//find the rootdir and write: "rootDir": "./src",
//find the outdir and write: "outDir": "./dist",
//then open a file src and make a file app.ts in this file
//go to the package.json and write "build": "tsc" in scripts.
```

```js
//then do this for create dist file for js
npm run build
//then run js code
node ./dist/app.js
```

```js
//then go to the mongoDB atlas and create a database in Connecting with MongoDB Driver and copy this 3. Add your connection string into your application code then save it in .env file

PORT = 5000
DATABASE_URL = write your database url here
```

```js
npm run build
```

```js
// first npm run build, then do node ./dist/server.js, its so boring, so we will write a snipted to do this easily

//now isntall ts-node-dev => for making development faster
npm i ts-node-dev
npm i ts-node-dev --save-dev

//auto response and making transparent
ts-node-dev --respawn --transpile-only src/server.ts
```

```js
//in package.json
"scripts": {
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
```

```js
// .env file for developemnt
NODE_ENV= development
PORT=5000
DATABASE_URL=
```

**Objective:** Develop a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Joi/Zod.

### Set up the Project

- Create a new Node.js Express project.
- Set up a MongoDB database using Mongoose for storing user and order data.

### Define Data Models

- Create Mongoose models for User data based on the provided data structure. (You can follow sample-data.json file for ideas)
- Define appropriate data types, validations.

### Data Types List

- `userId` (number): A unique identifier for the user.
- `username` (string): Denotes the user's unique username, ensuring uniqueness across the system.
- `password` (string): Represents the user's password. The password is securely stored in hashed form, utilizing the bcrypt algorithm for hashing.
- `fullName` (object): An object containing the first and last name of the user.
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.
- `age` (number): The age of the user.
- `email` (string): The email address of the user.
- `isActive` (boolean): A flag indicating whether the user is active or not.
- `hobbies` (array of strings): An array containing the hobbies of the user.
- `address` (object): An object containing the street, city, and country of the user's address.
  - `street` (string): The street of the user's address.
  - `city` (string): The city of the user's address.
  - `country` (string): The country of the user's address.
- `orders` (array of objects): An array containing the orders of the user.
  - `productName` (string): The name of the product in the order.
  - `price` (number): The price of the product in the order.
  - `quantity` (number): The quantity of the product in the order.

## Main Section (50 Marks):

### User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body:

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

- Response: Newly created user object. **Make sure that the password field is not included in the response data.**

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of user objects. Each object should only contain `username`, `fullName`, `age`, `email`, `address` . Apply suitable field filtering to exclusively retrieve the necessary information.

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "age": "number",
      "email": "string",
      "address": {
        "street": "string",
        "city": "string",
        "country": "string"
      }
    }
    // more objects...
  ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response: User object and make sure that the password field is not included in the response data. If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not. (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

- Response: Updated user object and make sure that the password field is not included in the response data. If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not. (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response: Success message or, If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not. (Use the [format for error messages](#sample-error-response) that is given below.).

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

## Bonus Section (10 marks):

### Order Management:

1. Add New Product in Order

If the 'orders' property already exists for a user, append a new product to it. Otherwise, create an 'orders' array within the user object and then add the order data.

- Endpoint: **PUT /api/users/:userId/orders**

- Request Body: If you can't find information about the user, show a clear message. Use either `instanceof` or `static` method to display this error message. (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response: List of order objects for the specified user or, If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not. (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response: Total price of all orders for the specified user or, If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```

### Sample Error Response

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

## Validation with Joi/Zod

- Use Joi/zod to validate incoming data for user and order creation and updating operations.
- Ensure that the data adheres to the structure defined in the models.
- Handle validation errors gracefully and provide meaningful error messages in the API responses.
