require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const path  = require('path')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// jib routes
app.use('/user',require('./routes/userRoute'));
app.use('/api',require('./routes/categoryRoute'));
app.use('/api',require('./routes/upload'));
app.use('/api',require('./routes/productRoute'));
app.use('/api',require('./routes/paymentRoute'));

// // hedhi juste bech tchouf fl browser li enti khadamt l app
// app.get('/', (req, res) => { 
//     res.json('heey there i am here ')
// });

// connect to mongoDb
const URL = process.env.URL
mongoose.connect(URL, {
    useNewUrlParser: true,   //We pass the useNewUrlParser: true, etc. to mongoose.connect() to avoid the DeprecationWarning.
    useUnifiedTopology: true

});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})