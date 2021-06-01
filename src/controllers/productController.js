const factory = require('./handlerFactory');
const Product = require('../models/productModel');

exports.setProduct = factory.createOne(Product);
exports.getProduct = factory.getOne(Product);