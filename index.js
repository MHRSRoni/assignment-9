//dependencies
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const helmet = require("helmet")
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./src/routers/bookRouter');

//main app obj
const app = express();

// middlewares 
app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(helmet());


// routes

app.use("/api/v1/", router);

//Server config
const port = process.env.PORT || 3000;


// connect to MongoDB and start server 
mongoose
    .connect(process.env.DATABASE,{family : 4})
    .then(()=>{
        console.log("database connected successfully")
        app.listen(port, () =>{
            console.log(`Server is running on ${port}`);
        })
    })
    .catch((err) => console.log(err));