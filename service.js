const express = require('express')
const app = express();
app.use(express.json());

const mongoose =require('mongoose');



const url = process.env.MONGO_URI
const PORT = process.env.PORT;
mongoose.connect(url)
console.log('connected')

app.use('/auth',require('./user_routes'));

app.listen();
