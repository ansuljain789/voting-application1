const express = require('express')
const app = express();

const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



//import the route files
const userRoutes = require('./routes/userRoute');
const candidateRoutes = require('./routes/candidateRoutes');


//use the routes
app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})