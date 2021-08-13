const mongoose = require('mongoose');
const validator = require('validator');
const ErrorResponse = require('../utils/ErrorResponse');


restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "name should not exceed 50 letters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new ErrorResponse(`Enter a valid Email`, 400);
        }
    },
    slug: String,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    address: {
        type: String,
        require: [true, "please add an adress"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must not exceed 10']
    },


}, {
    timestamps: true
});

restaurantSchema.virtual('servings' , {
    ref : 'Serving',
    localField : '_id',
    foreignField : 'restaurant'
})

module.exports = mongoose.model('Restaurant', restaurantSchema);