__**SMS Application API**__

This is a node.js app built using below technologies.

- Express.js: A Fast, opinionated, minimalist web framework for node which was used in routing this application.

- BodyParser: This module was used to collect search data sent from the client side to the routing page.

- Mongoose:  An Object Data Modeling (ODM) library for MongoDB and Node.js

- MongoDB: is an open-source document database and leading NoSQL database.

**Pre requisites**

Install (if not installed)
- nodejs
- mongodb
- mongoDB compass

**Installation**

- Cd into your folder
- Clone this repository.
- Create a .env file using the .env.example as a guide.
- npm install to install all dependencies.
- npm start: to start the app in development mode.
- npm test: to runs all the tests

**Features of the API**

A user can:
- create contact
- get all contacts
- get a single contact
- update a contact
- delete a contact
- create a message
- get messages by a contact
- delete a message

**API Documentation**
```
POST a contact /api/contacts
Request
{
  "name": "Njeri",
  "phone": "254756127350",
}
Response
{
    "_id": "5d63ee469530aa09c9347a87",
    "name": "Njeri",
    "phoneNumber": 254756127350,
    "__v": 0
}

GET all contacts /api/contacts
Response
[
    {
        "_id": "5d633ac045982cc27a49f1cd",
        "name": "Shik",
        "phoneNumber": 254756127350,
        "__v": 0
    },
    {
        "_id": "5d63421d5b9ddbc567ecf645",
        "name": "Njeru",
        "phoneNumber": 71264773698,
        "__v": 0
    },
    {
        "_id": "5d63ee469530aa09c9347a87",
        "name": "Njeri",
        "phoneNumber": 254326127350,
        "__v": 0
    }
]

GET a single contact /api/contacts/:contactId
Response
{
    "_id": "5d63ee469530aa09c9347a87",
    "name": "Njeri",
    "phoneNumber": 254326127350,
    "__v": 0
}

PUT a contact (update) /api/contacts/:contactId
Request
{"name": "Chris ", phone: "254789123450"}
Response
{
    "message": "Successfully updated"
}

DELETE a contact /api/contacts/:contactId
Response
{
    "message": "Successfully deleted"
}

POST a message /api/sms
Request
{ "recipientId": "5d63421d5b9ddbc567ecf645", "message": "Helloo ", "senderId": "5d63ee469530aa09c9347a87"}
Response
{
    "status": "sent",
    "_id": "5d63efb79530aa09c9347a8c",
    "recipient": {
        "_id": "5d63421d5b9ddbc567ecf645",
        "name": "Rama",
        "phoneNumber": 7126477369,
        "__v": 0
    },
    "message": "aghgdajgduqytgvda djgegdwjki",
    "sender": {
        "_id": "5d63ee469530aa09c9347a87",
        "name": "Njeri",
        "phoneNumber": 7126477369,
        "__v": 0
    },
    "__v": 0
}

DELETE a message /api/sms/:messageId
Response
status code 204

GET a single message /api/sms/:messageId
Response
{
    "status": "sent",
    "_id": "5d63efb79530aa09c9347a8c",
    "recipient": {
        "_id": "5d63421d5b9ddbc567ecf645",
        "name": "Rama",
        "phoneNumber": 7126477369,
        "__v": 0
    },
    "message": "aghgdajgduqytgvda djgegdwjki",
    "sender": {
        "_id": "5d63ee469530aa09c9347a87",
        "name": "Njeri",
        "phoneNumber": 7126477369,
        "__v": 0
    },
    "__v": 0
}

GET messages by a contact /api/sms?id=5d63effa9530aa09c9347a92

Response
{
    "Received": [
        {
            "status": "sent",
            "_id": "5d63effa9530aa09c9347a92",
            "recipient": {
                "_id": "5d63ee469530aa09c9347a87",
                "name": "Njeri",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "message": "aghgdajgduqytgvda djgegdwjki",
            "sender": {
                "_id": "5d63421d5b9ddbc567ecf645",
                "name": "Rama",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "__v": 0
        }
    ],
    "Sent": [
        {
            "status": "sent",
            "_id": "5d63efb79530aa09c9347a8c",
            "recipient": {
                "_id": "5d63421d5b9ddbc567ecf645",
                "name": "Rama",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "message": "aghgdajgduqytgvda djgegdwjki",
            "sender": {
                "_id": "5d63ee469530aa09c9347a87",
                "name": "Njeri",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "__v": 0
        },
        {
            "status": "sent",
            "_id": "5d63efde9530aa09c9347a8f",
            "recipient": {
                "_id": "5d63421d5b9ddbc567ecf645",
                "name": "Njeri",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "message": "aghgdajgduqytgvda djgegdwjki",
            "sender": {
                "_id": "5d63ee469530aa09c9347a87",
                "name": "Rama",
                "phoneNumber": 7126477369,
                "__v": 0
            },
            "__v": 0
        }
    ]
}
```
