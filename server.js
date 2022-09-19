require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const path  = require('path')
const app = express();

app.use(express.json());
//app.use(cors());
app.use(cors({credentials: true, origin: ['https://reactappie.herokuapp.com', 'http://localhost:3000']}));
app.use(cookieParser());






// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Request-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

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
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, {
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