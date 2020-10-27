const { Users } = require('../../models');
const Login = require('../../services/login');
const logins = new Login(Users);


const login = async (req,res,next) => {
  console.log('login in');
  const { id, password } = req.body;
  try {
    const existing_pwd = await logins.isMember(id);         //기존 비밀번호 가져오기
    await logins.doesItMatch(password,existing_pwd);   //비밀번호 비교
    const accessToken = await logins.tokenIssue(id);        //토큰 발급
    res.status(200).json({      //로그인 성공함
      accessToken
    });
  }
  catch(err) {
    res.status(err.status).send({     //로그인 실패
      message: err.message
    });
  }
}

const password = async (req,res,next) => {
  const { oldPassword,newPassword } = req.body;
  const { id } = req.decoded;
  try {
    const existing_pwd = await logins.isMember(id);           //기존 비밀번호 가져오기
    await logins.doesItMatch(oldPassword,existing_pwd);  //비밀번호 비교
    await logins.createPassword(id,newPassword);    //비밀번호 DB에 저장
    res.status(200).end();  //비번 변경 성공
  }
  catch(err) {
    res.status(err.status).send({
      message: err.message
    });
  }
}

module.exports = {
  login,
  password
};
