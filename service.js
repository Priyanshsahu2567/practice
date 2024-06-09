const express = require('express')
const app = express();
app.use(express.json());

const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-com')


app.use('/auth',require('./user_routes'));

app.listen(3000);