//no specified rout meaning all server requests will pass through this code! (if you send a req to a non-existing route)
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

//this code will be fired off only when error object exists in the app

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

export { notFound, errorHandler }
