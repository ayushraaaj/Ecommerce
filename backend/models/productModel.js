const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    description: {
        type: String, 
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [true, 'Price cannot exceed 8 figures']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter product category']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter the product stock'],
        default: 0
    },
    numOfReviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);