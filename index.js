const express = require('express')
const mongoose = require('mongoose')
const app = express()
const contactRoute = require('./routes/contact.route')
const userRoute = require('./routes/user.route')
const actualityRoute = require('./routes/actuality.route')

const path = require("path");

// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const cors = require('cors');
app.use(cors());

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.send('hello world')
})

// routes
app.use('/api/contact', contactRoute)
app.use('/api/user', userRoute)
app.use('/api/actuality', actualityRoute)



// mongodb://localhost:27017/apiFlamengo

// mongodb+srv://makabebassuka:LNg6zZZAWEWKYPic@nodeblog.fwcvo.mongodb.net/?retryWrites=true&w=majority&appName=nodeBlog
mongoose.connect('mongodb+srv://makabebassuka:LNg6zZZAWEWKYPic@nodeblog.fwcvo.mongodb.net/?retryWrites=true&w=majority&appName=nodeBlog')
    .then(() => {
        console.log('database is connected')
        app.listen(3001, () => {
            console.log('connexion au port 3000')
        })
    })
    .catch((error) => {
        console.log('failed connexion')
        console.error('Failed to connect to the database:', error);
    })
