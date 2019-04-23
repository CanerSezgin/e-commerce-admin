const Product = require('../models/products');
const mongoose = require('mongoose');

const allProducts = (req, res, next) => {   
    Product.find().select('name price _id productImage').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/products/${doc._id}`
                        }

                    }
                })
            }
            if(docs.length > 0){
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
};

const createProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${result._id}`
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
};

const getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('name price _id productImage').exec()
        .then(doc => {
            console.log({doc});
            if(doc){
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products`
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log('! Fetching Error');
            res.status(500).json({error: err})
        }); 
};

const updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    
    Product.updateOne({_id: id}, {$set: updateOps}).exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

const deleteProduct = (req, res, next) => {
    const id = req.params.productId
    Product.deleteOne({_id: id}).exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                request: {
                    type: 'POST',
                    url: `http://localhost:3000/products`,
                    body: {name: 'String', price: 'Number'}
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

};

module.exports = {
    allProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}