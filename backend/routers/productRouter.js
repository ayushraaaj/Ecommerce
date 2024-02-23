const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = Router();

router.route('/product/new').post(createProduct);

router.route('/products').get(isAuthenticatedUser, getAllProducts);

router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;