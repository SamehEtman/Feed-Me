const mongoose = require('mongoose');

const servingSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: [true, 'Please add a name '],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    components: {
        type: [String]
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        requierd: true
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

module.exports = mongoose.model('Serving' , servingSchema);