//error handlers rough draft for rest api
module.exports.asyncHandler = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
}

//error handlers wrapper for local testing, wrap at function declaration
//or just use try/catch block
module.exports.errorHandler = fn => (...args) => {
    try {
        fn(...args)
    } catch (error) {
        console.log(error.message)
    }
}
