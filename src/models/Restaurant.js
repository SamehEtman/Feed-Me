const mongoose = require('mongoose');

restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add an name"],
        unique: true,
        trim: true,
        maxlength: [50, "name should not exceed 50 letters"]
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
    servings: {
        type: [String],
    }

}, {
    timestamps: true
});


module.exports = mongoose.model('Restaurant', restaurantSchema);