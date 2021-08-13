const mongoose = require('mongoose');

const servingSchema = new mongoose.Schema({
    name: {
        type: String,
        requierd: [true, 'Please add a name '],
        unique: [true, 'A serving with this name already exits'],
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
    }
});

module.exports = mongoose.model('Serving' , servingSchema);