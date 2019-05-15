const {exec} = require('../db/mysql.js')
const loginCheck = (username, password) =>{
  let sql = `select username, realname from users where username = '${username}' and password = '${password}';`

  return exec(sql).then(rows => {
    return rows[0] || {} // 注意：select返回的是数组，需要将第一个返回
  })
  // 先使用假数据
  // if(username === 'zhangsan' && password === '123') {
  //   return true
  // }
}

module.exports = {
  loginCheck
}