const jwt = require('jsonwebtoken');
require('dotenv').config();


verifyToken = (req,res,next)=>{
  let token = req.headers["x-access-token"]
  if(!token){
      return res.status(403).send({
          message : "No Token Provided !"
      })
  }
  jwt.verify(token, process.env.SECERET_KEY, (err,decoded)=>{
      if(err){
          return res.status(401).send({
              message : "Unauthorized"
          })
      }
      req.userId = decoded.id;
      next()
  })
}

const authJwt = {
  verifyToken : verifyToken,
}

module.exports = authJwt
