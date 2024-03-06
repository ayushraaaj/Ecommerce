const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Create a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user: req.user.id,
        paymentInfo,
        paidAt: Date.now(),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    res.status(201).json({
        success: true,
        order
    });
});

// Get single order -- Admin
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found'), 404);
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get my orders
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update order status -- Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('Order is not found', 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this product', 400));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.orderStatus;
    if (req.body.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order
    });
});

async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order){
        return next(new ErrorHandler('Order is not found', 404));
    }

    res.status(200).json({
        success: true
    });
});