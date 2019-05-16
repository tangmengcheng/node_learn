const {  login } = require('../controller/user')
const { SuccessModel,  ErrorModel } = require('../model/resModel')

/**
 * cookie 存在的问题：会暴露username ，很危险 ；cookie的存储量小
 * 解决：cookie存userid,server端对应username
 * session 即server端存储用户信息
 */

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password  } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 操作cookie httpOnly 防止客户端手动修改cookie  path=/ 可以让前端路由都可以访问
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname

        return new SuccessModel('登录成功')
      }
      return new ErrorModel('登录失败')
    })
  }
  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel('用户没登录'))
  }
}

module.exports = handleUserRouter