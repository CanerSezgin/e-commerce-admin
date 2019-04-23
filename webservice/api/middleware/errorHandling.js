const notFound = (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    console.log(error)
    next(error);
};

const errorRoutes = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
};

module.exports = {
    notFound,
    errorRoutes
}