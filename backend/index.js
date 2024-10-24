const express = require("express")
const app = express();
require("dotenv").config();
const routes = require("./Routes/routes")
const database = require("./Config/database")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cloudinry = require("./Config/cloudinaryConnect")

cloudinry.connect()
database.connect()
const port = process.env.PORT || 4000;

const options = {
    origin:"*",
    credentials: true,
}
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors(options))
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1",routes)

app.get("/",(req,res)=>{
    res.send(`<h1>Hello from backend</h1>`)
})

app.listen(port,()=>{
    console.log("App is running")
})