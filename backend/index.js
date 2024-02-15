//add express.js frameworks
import express from "express";
import { PORT } from "./config.js";

const app = express();

//pass port into listen function
app.listen(PORT, () => {
    console.log('App is listening to port: ${PORT}');
});