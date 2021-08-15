const mongoose = require('mongoose');
const validator = require('validator');
const ErrorResponse = require('../utils/ErrorResponse');
const geocoder = require('../utils/geocode')
const fs = require('fs')
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
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Restaurant must be assigned to a publisher"]
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
restaurantSchema.index({
    "locatoin": "2d"
})

restaurantSchema.virtual('servings', {
    ref: 'Serving',
    localField: '_id',
    foreignField: 'restaurant',
    justOne: false
})

// find within radius

restaurantSchema.statics.findByRadius = async function (latitude, longitude, radius) {
    return await this.find({
        location: {
            $near: {
                $maxDistance: radius * 1000,
                $geometry: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                }
            }
        }
    })

}

// fill location
restaurantSchema.pre('save', async function (next) {
    let location = await geocoder.geocode(this.address);
    location = location[0]
    this.location = {
        type: 'Point',
        coordinates: [location.latitude, location.longitude],
        formattedAddress: location.formattedAddress,
        street: location.streetName,
        city: location.city,
        state: location.stateCode,
        zipcode: location.zipcode,
        country: location.countryCode,
    }
    this.address = undefined;
    next();

})

// cascade delete servings 
restaurantSchema.pre('remove', async function (next) {
    await this.model('Serving').deleteMany({
        restaurant: this._id
    });
    console.log(`Deleting servings related to restaurant ${this._id}`)
    next();
})


module.exports = mongoose.model('Restaurant', restaurantSchema);