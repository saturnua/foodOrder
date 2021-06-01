const mongoose = require('mongoose');
const Product = require('./productModel');

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: 'Booking must contain a product'
        },
        quantity: {
            type: Number,
            required: 'Order must have at least 1 product'
        }
    }],
    total: {
        type: 'Number',
        //required: 'Order must have a price'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    },
    tgUserID: {
        type: Number,
        required: 'Order must contain telegram user ID'
    }
});

orderSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'products',
        populate: {
            path: 'product',
            select: 'name price'
        }
    });
    next();
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;