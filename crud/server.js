const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts.js');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middwware
app.use("/post", postRoutes);

const PORT  = 8000;
const DB_URL = 'mongodb+srv://eshaniechathurika:shane@cluster0.b6s6lab.mongodb.net/'

mongoose.connect(DB_URL)
.then(() => {
    console.log("DB connected");
})
.catch((err) => console.log("DB connection error", err));

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
})
