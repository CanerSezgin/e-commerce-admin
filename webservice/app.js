const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

/* Import Routes */
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

/* Import Middlewares */
const cors = require('./api/middleware/cors');
const errorHandling = require('./api/middleware/errorHandling');

mongoose.connect(`mongodb+srv://node-shop:${process.env.MONGO_ATLAS_PW}@node-rest-shop-0o2qe.mongodb.net/test?retryWrites=true`, {
    useNewUrlParser: true
})
.then(() => console.log('DB Connection is Successful'))
.catch(err => console.log(`DB Connection Error: \n${err.name}: ${err.errmsg || err}`));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use(cors);

// Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

/* 404 Error */
app.use(errorHandling.notFound)

/* Error Route */
app.use(errorHandling.errorRoutes)

module.exports = app;