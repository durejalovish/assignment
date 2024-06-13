var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DB_CONNECT, '---- db connecr');
mongoose.connect('mongodb+srv://lovishdureja0786:eGXbyChxYzrNYgRF@cluster0.tvfhahx.mongodb.net/', 
    { useNewUrlParser: true,
    useUnifiedTopology: true},
(err, client) => {
    if (err){
        return console.log(err)
    } else{
        console.log('Connected to Database')
    }
    
  })
