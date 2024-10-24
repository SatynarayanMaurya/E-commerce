const mongoose = require("mongoose")
require("dotenv").config()
exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connected successfully"))
    .catch((error)=>{
        console.log("DB connection failed : ",error)
        process.exit(1);
    })
}