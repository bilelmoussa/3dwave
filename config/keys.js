require('dotenv').config();
let secret = process.env.SECRET || "SECRET";


module.exports = {
    database: "url_to_to_mongodb_db",
    secret: secret,   
}