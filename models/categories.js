const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

    name: {
        type: 'string',
        required : true,
        trim: true,
        unique: true // white spaces will be removed from both sides of the
    }




}, {timestamps: true})

module.exports = mongoose.model("Categories",categorySchema)