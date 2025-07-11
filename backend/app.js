const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')

const connectToDb = require('./db/connection');
const userRoutes = require('./routes/userRoute')
const captainRoutes = require('./routes/captainRoute')


connectToDb();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)


module.exports = app;
