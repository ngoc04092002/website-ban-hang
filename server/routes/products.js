const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    createProduct,
    getCurrentPageProducts,
    getClothes,
    searchProduct,
    getAllPersonalProducts,
    deletePersonalProduct,
    searchPersonalProducts,
    updatePersonalProducts
} = require('../controllers/products');

router.get('/_currentPage', getCurrentPageProducts);
router.get('/_search', searchProduct);
router.get('/clothes/:clothes', getClothes);
router.get('/all', getAllProducts);

router.get('/products-personal/:userId', getAllPersonalProducts);
router.delete('/destroy/:id', deletePersonalProduct);
router.get('/search-personal/:userId', searchPersonalProducts);
router.put('/update-personal/:id', updatePersonalProducts);

router.get('/:id', getProduct);
router.post('/:userID', createProduct);

module.exports = router;
