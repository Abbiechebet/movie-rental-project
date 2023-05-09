import express  from "express";
import dotenv  from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import {globalErrorHandler} from "./src/utils/errorHandler.js"

// Importing the User Routes
import {router as userRouter} from "./src/router/user.route.js"
import {router as genreRouter} from "./src/router/movie.route.js"

const app = express()

dotenv.config()

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))

const port = Number(process.env.PORT) || 3000;

// Middlewares
app.use(morgan('tiny'))
app.use(express.json())

// Routes 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/movies', genreRouter)

app.use(globalErrorHandler)

// Setting up the express server
app.listen(port, ()=>{
  console.log(`Server runnning on port: ${port}`)
})



/*
  { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
*/