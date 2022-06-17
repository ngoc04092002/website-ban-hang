const { Orders } = require('../models');

var createOrders = async (req, res, next) => {
    console.log(req.body);
    try {
        const order = await Orders.create({ ...req.body });
        res.json(order);
    } catch (e) {
        next(e);
    }
};

var deleteOrders = async (req, res, next) => {
    try {
        const idItem = req.body;
        await Orders.destroy({
            where: {
                id: [...idItem.ids],
            },
        });

        return res.status(200).json({ success: true });
    } catch (e) {
        next(e);
    }
};

var getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.findAll({
            where: {
                user: req.params.user,
            },
        });
        res.json(orders);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    createOrders,
    deleteOrders,
    getOrders,
};
