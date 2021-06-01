const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Product must must have a name'
    },
    photo: {
        type: Number,
    },
    price: {
        type: 'Number',
        required: 'Order must have a price'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

// productSchema.pre(/^find/, function(next) {
//     this.populate('products').populate({
//         path: 'product',
//         select: 'name price'
//     });
//     next();
// });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;