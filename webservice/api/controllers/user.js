const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const signUp = (req, res, next) => {
    User.find({email: req.body.email}).exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User Created'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            }
        })
};

const login = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if(result){
                        const token = jwt.sign(
                            // Payload
                            {
                                email: user.email,
                                userId: user._id
                            }, 
                            // Secret
                            process.env.JWT_KEY, 
                            // Options
                            {
                                expiresIn: "1h"
                            },
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token
                        })
                    } else {
                        res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

const deleteUser = (req, res, next) => {
    User.findById(req.params.userId).exec()
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                })
            } else {
                User.deleteOne({_id: req.params.userId}).exec()
                .then(result => {
                    res.status(200).json({
                        message: 'User deleted'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
            }
        });
}; 

module.exports = {
    signUp, 
    login,
    deleteUser
}