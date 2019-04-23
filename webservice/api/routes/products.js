const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {        
        cb(new Error('mimetype is not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ProductController = require('../controllers/products');

router.get('/', ProductController.allProducts);
router.post('/', checkAuth, upload.single('productImage') , ProductController.createProduct);
router.get('/:productId', ProductController.getProduct);
router.patch('/:productId', checkAuth, ProductController.updateProduct);
router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;