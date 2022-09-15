const jwt = require ("jsonwebtoken")

exports.authRequired = (req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization) {
        return res.status(402).json({ error: "Please login" })
    }

  const token = authorization.split(" ")[1]
  if (!token) {
    return res.status(402).json({ error: "Please login"})
  }
  
  const user = jwt.verify(token, "ac0f79626a62b3db47ccdb1aede0e2b1e94d2dc38686de0d5e352c7561548aad" );
   
  req.user = user;

    next()
}