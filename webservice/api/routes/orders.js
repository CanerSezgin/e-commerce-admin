const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.getAll);
router.post('/', checkAuth, OrdersController.createOrder);
router.get('/:orderId', checkAuth, OrdersController.getOrder);
router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

module.exports = router;