const mongoose = require('mongoose');



const userSchema= new mongoose.Schema({

name : {
    type: 'string',
    required: true,
    trim: true,// white spaces will be removed from both sides of the string 
},

email :{

  type: String,
  required: true,
  unique: true,
}, 

password : {
    type: String,
    required: true,
}
,

role:{
    type: Number,
    default: 0,
},

cart: {
    type:Array,
    default: []
}
}, {
    timestamps: true,
})



module.exports = mongoose.model('Users',userSchema);