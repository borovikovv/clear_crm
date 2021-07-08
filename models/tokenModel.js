const db = require("./../server")
const User = require("./userModel");

db.createCollection("token", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "user", "refreshToken" ],
          properties: {
            user: {
                bsonType: "string"
             },
             refreshToken: {
                bsonType: "string",
                required: true
             }
          }
       }
    }
 });