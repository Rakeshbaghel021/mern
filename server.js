require("dotenv").config();
const express = require('express');
const mongoose= require('mongoose')
const cors = require("cors");
const userRoutes =  require("./routes/users")

const app = express();
app.use(express.json());
app.use(cors());

//connection
const URI = process.env.MONGO_URL;
mongoose.connect(URI,
{ useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb atlas");
});

// if some error in connection

mongoose.connection.on("error", (err) => {
  console.log("error in connecting", err);
});

// routes 

app.use("/users",userRoutes)

// port
const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log( `server is running at ${PORT}`)
})