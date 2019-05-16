const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
  if(!req.session.username) { // 没有username
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  } 
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData, '这是获取博客列表')
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data, '这是获取博客详情')
    })
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {

    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheck
    }

    const author = req.session.username 
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data, '这是新增博客的接口')
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheck
    }

    const result = updateBlog(id, req.body)
    return result.then(val => {
      if(val) {
        return new SuccessModel('这是更新博客的接口')
      } else {
        return new ErrorModel('博客更新失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult) {
      return loginCheck
    }

    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(val => {
      if(val) {
        return new SuccessModel('这是删除博客的接口')
      } else {
        return new ErrorModel('博客删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter