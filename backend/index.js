//add express.js frameworks
import express, { request, response } from "express";
import { PORT, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app = express();

//get results from server
app.get('/', (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To Book Store');
});

// Save a new book
app.post('/books', async (request, response) => {
    //for success and failure
    try {
      //validation for input
        if (
            !request.body.title ||
            !request.body.author ||
            request.body.publishYear
        ) {
            //if response 400 return message for client
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        //new book variable
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        //book upgrade
        const book = await Book.create(newBook);
        //return status 201 and book to client
        return response.status(201).send(book);

      } catch (error) {//receive error
        console.log(error.message);//error to server console
        response.status(500).send({ message: error.message });//return response
    }
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