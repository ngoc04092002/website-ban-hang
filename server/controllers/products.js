const Products = require('../models/Products');
const jwt = require('jsonwebtoken');

var getAllProducts = async (req, res, next) => {
    try {
        let q = req.query.q;
        let value = RegExp(q, 'ismg');
        let products = await Products.find({ desc: value });
        return res.status(200).json({ products });
    } catch (e) {
        next(e);
    }
};
var getCurrentPageProducts = async (req, res, next) => {
    try {
        const currentPage = +req.query.page;
        const products = await Products.find({})
            .skip((currentPage - 1) * 10)
            .limit(10);

        return res.status(200).json({ products });
    } catch (e) {
        next(e);
    }
};

var getClothes = async (req, res, next) => {
    try {
        const pathname = req.params.clothes.toLowerCase();
        const currentPage = +req.query.page || 1;
        const type = req.query.type === 'newest' ? 1 : -1;
        const _sort = req.query._sort === 'asc' ? 1 : -1;

        let nameItem;
        switch (pathname) {
            case 'shoes':
                nameItem = 'giầy';
                break;
            case 'pants':
                nameItem = 'quần';
                break;
            case 'hats':
                nameItem = 'mũ';
                break;
            case 'shirts':
                nameItem = 'áo';
                break;
            default:
                nameItem = 'quần';
                break;
        }
        let search = RegExp(nameItem, 'img');
        let products;
        if (pathname === 'shoes') {
            products = await Products.find({ $or: [{ desc: /giày/gims }, { desc: /giầy/gims }] })
                .skip((currentPage - 1) * 10)
                .limit(10)
                .sort({ price: _sort, createdAt: type });
        } else {
            products = await Products.find({ desc: search })
                .skip((currentPage - 1) * 10)
                .limit(10)
                .sort({ price: _sort, createdAt: type });
        }

        return res.status(200).json({ products });
    } catch (e) {
        next(e);
    }
};

var getProduct = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id);
        return res.status(200).json({ product });
    } catch (e) {
        next(e);
    }
};

var createProduct = async (req, res, next) => {
    try {
        const userId = jwt.verify(req.params.userID, process.env.SECRET);
        const newProduct = new Products({
            ...req.body,
            userProduct: userId,
        });
        await newProduct.save();
        return res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

var searchProduct = async (req, res, next) => {
    try {
        let q = req.query.q;
        let value = RegExp(q, 'imsg');
        let products = await Products.find({ desc: value }).limit(5);
        return res.status(200).json({ products });
    } catch (e) {
        next(e);
    }
};

//personal
var getAllPersonalProducts = async (req, res, next) => {
    try {
        const userId = jwt.verify(req.params.userId, process.env.SECRET);
        const product = await Products.find({ userProduct: userId });
        return res.status(200).json({ product });
    } catch (e) {
        next(e);
    }
};

var deletePersonalProduct = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        await Products.findByIdAndDelete(itemId);
        return res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

var searchPersonalProducts = async (req, res, next) => {
    try {
        const userId = jwt.verify(req.params.userId, process.env.SECRET);
        let q = req.query.q;
        let products;
        if (!q) {
            let _sort = req.query._sort === 'asc' ? 1 : -1;
            let type = RegExp(req.query.type, 'ismg') || '';
            if (req.query.type === 'All') {
                products = await Products.find({ userProduct: userId }).sort({ createdAt: _sort });
                return res.status(200).json({ products });
            }
            products = await Products.find({ desc: type, userProduct: userId }).sort({ createdAt: _sort });
        } else {
            let value = RegExp(q, 'ismg');
            products = await Products.find({ desc: value, userProduct: userId });
        }

        return res.status(200).json({ products });
    } catch (e) {
        next(e);
    }
};

var updatePersonalProducts = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const values = req.body;
        await Products.findByIdAndUpdate(itemId, values);
        return res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    getAllProducts,
    getCurrentPageProducts,
    getClothes,
    getProduct,
    createProduct,
    searchProduct,
    getAllPersonalProducts,
    deletePersonalProduct,
    searchPersonalProducts,
    updatePersonalProducts,
};
