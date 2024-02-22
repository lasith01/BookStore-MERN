//add express.js frameworks
import express from "express";
import { PORT, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";

const app = express();

//get results from server
app.get('/', (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To Book Store');
});



//mongoose
mongoose
    .connect(mongoDbUrl)
    .then(() => {
        console.log('App connected to database');
    //pass port into listen function
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
});