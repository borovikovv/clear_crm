const db = require("./../server")

const Token = db.createCollection("token", {
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

 module.exports = Token;