const {
  exec
} = require('../db/mysql.js')
const login = (username, password) => {
  let sql = `select username, realname from users where username = '${username}' and password = '${password}';`

  return exec(sql).then(rows => {
    return rows[0] || {} // 注意：select返回的是数组，需要将第一个返回
  })
}

module.exports = {
  login
}