const factory = require('./handlerFactory');
const Order = require('../models/orderModel');

exports.setOrder = factory.createOne(Order);
exports.getMyOffers = async (userID) => {
    return await Order.find({tgUserID: userID});
}

