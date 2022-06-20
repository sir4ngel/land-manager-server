const errorHandler = (err, req, res, next) => {
    return res.json({
        status: "ERROR",
        message: err.message
    });
};

module.exports = {
    errorHandler
};