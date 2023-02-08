exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.url = req.url
    res.locals.user = req.session
    next()
}
exports.destroySession = (req, res, next) => {
    if(req.url === '/login/' || req.url === '/cadastro/'){
        req.session.destroy()
        next()
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}