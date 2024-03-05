const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// Create a product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Update product -- ADMIN
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        product
    });
});

// Delete product -- ADMIN
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// Create new review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        // rating: Number(rating),
        rating,
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString());

    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user.id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let sum = 0;
    product.reviews.forEach(rev => {
        sum += rev.rating;
    });

    product.ratings = sum / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    });
});

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reiews: product.reviews
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let sum = 0;
    reviews.forEach(rev => {
        sum += rev.rating;
    });

    product.ratings = sum / reviews.length
    product.numOfReviews = product.reviews.length;
    product.reviews = reviews;

    //first use normal saving other than findByIdAndUpdate
    await product.save();

    res.status(200).json({
        success: true
    });
});