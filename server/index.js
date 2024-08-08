require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/Router');



const app = express()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;


app.use(express.static("upload"))
app.use("/", router)




mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err))