const authErrorHandler = (err, req, res, next) => {
    // console.log(err.message, '-', err.code)

    let errors = {email: " "}
    if (err.code.includes(23505)) {
        errors.email = "email is registered already"
    }
    // console.log(errors)
    return errors
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}

// Middleware function to handle invalid JSON errors
function handleInvalidJson(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: 'Invalid JSON' });
  }
  next(err);
}
function handleUnauthorized(err, req, res, next) {
    if (err.status === 401) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next(err);
}
function handleNotFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}
module.exports = {
    authErrorHandler,
    errorHandler,
    handleUnauthorized
};