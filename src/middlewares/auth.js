const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const error = require('../errors');
const { Users } = require('../models')
const loginService  = new (require('../services/login'))(Users);

const authVerify = async (req,res,next) => {
  const bearerHeader = req.headers['authorization'];

  try {
    if(!bearerHeader) { throw error.badRequest; }// 토큰 없음
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    await jwt.verify(token,JWT_SECRET,async (err,decoded) => {
      if(err) throw error.forbidden;
      req.decoded = decoded;
      await loginService.isMember(decoded.id);
      console.log('good authVerify');
      next();
    })
  } catch(err) {
    res.status(err.status).send({
      message: err.message
    });  // 로그인 실패
  }
}

const isAdmin = (req,res,next) => {
  console.log("in is Admin");
  if(req.decoded.id !== 'Admin') {
    res.status(403).json({ message: 'no permission'}); // 메세지 지우기
  }
  else next();

}

module.exports = {
  authVerify,
  isAdmin,
};
