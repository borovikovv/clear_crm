const db = require("./../server");

db.createCollection("user", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "password", "email", "isActivated", "activationLink" ],
          properties: {
            email: {
                bsonType: "string",
                description: "must be a string and is required",
                required: true,
                unique: true
             },
             password: {
                bsonType: "string",
                description: "must be an string and is required",
                required: true
             },
             isActivated: {
                required: true,
                bsonType: "boolean",
                default: false
             },
             activationLink: {
                bsonType: "string",
                description: "link don't activated, please go to you email and do this."
             }
          }
       }
    }
 });