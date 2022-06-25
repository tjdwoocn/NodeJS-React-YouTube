const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require("./config/key")
const {auth} = require("./middleware/auth");
const {User} = require("./models/User")

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

app.use(cookieParser());
// app.use(cors())

// mongodb 접속 정보 가져오기
// Mongo DB Connection
const mongoose = require('mongoose');
const { request } = require('express');
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(err))
    
app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));

 

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`)
  });