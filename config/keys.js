require('dotenv').config();
let secret = process.env.SECRET || "SECRET";


module.exports = {
    database: "url_to_mongodb",
    secret: secret,   
}