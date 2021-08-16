const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 5,
        required: [true, `please add a title for the review`]
    },
    text: {
        type: String,
        required: [true, 'please add a review']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        requied: [true, 'please add a rating to the restaurant']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

reviewSchema.index({user:1 , restaurant : 1} , {unique : 1});

// calculate the average rating of a restaurant
reviewSchema.statics.getAverageRating = async function (RestaurantId) {
    const obj = await this.aggregate([{
            $match: {
                restaurant: RestaurantId
            }
        }, {
            $group: {
                _id: '$restaurant',
                averageRating: {
                    $avg: '$rating'
                }
            }
        }

    ])

    try {
        await this.model('Restaurant').findByIdAndUpdate(RestaurantId, {
            averageRating: obj[0].averageRating
        });

    } catch (err) {
        return next(
            new ErrorResponse(`Error with calculating the average rating`, 500)
        )
    }
}

reviewSchema.post('save', async function () {
    await this.constructor.getAverageRating(this.restaurant);
})

reviewSchema.post('remove', async function () {
    await this.constructor.getAverageRating(this.restaurant);
})

module.exports = mongoose.model('Review', reviewSchema);