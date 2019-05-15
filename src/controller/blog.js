const { exec } = require('../db/mysql.js')
const getList = (author, keyword) => {
  // 先返回假数据，（格式是正确的）
  let sql = `
    select * from blogs where 1=1 
  `
  if(author) {
    sql += `and author = '${author}' `
  }
  if(keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`
  return exec(sql)
}

const getDetail = id => {
  let sql = `select * from blogs where id = '${id}'`
  return exec(sql).then(rows => {
    return rows[0] // 返回数组的第一个
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象, 包含 title comtent 等 
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  let sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createTime});`
  return exec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
  
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新的博客的的id
  let sql = `update blogs set title = '${blogData.title}', content = '${blogData.content}' where id = ${id};`
  return exec(sql).then(updateData => {
    console.log(updateData)
    if(updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // return true
}

const delBlog = (id, author) => {
  let sql = `delete from blogs where id = ${id} and author = '${author}';`
  return exec(sql).then(delData => {
    if(delData.affectedRows > 0){
      return true
    }
    return false
  })
  // return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}