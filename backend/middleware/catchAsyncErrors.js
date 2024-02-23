// This is a closure and also handling 'async' errors the outer function catchAsyncErrors(func) and the inner function func(req, res, next)

const catchAsyncErrors = func => (req, res, next) => {
    Promise.resolve(func(req, res, next))
    .catch(next);
}

module.exports = catchAsyncErrors;