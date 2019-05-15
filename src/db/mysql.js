const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db.js')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 语句
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}


// 断开连接 (保持连接状态)
// con.end()

module.exports = {
    exec
}