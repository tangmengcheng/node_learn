const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  const blogData = req.body


  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const listData = getList(author, keyword)
    return new SuccessModel(listData, '这是获取博客列表')
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id)

    return new SuccessModel(data, '这是获取博客详情')
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(blogData)

    return new SuccessModel(data, '这是新增博客的接口')
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, blogData)

    if(result) {
      return new SuccessModel('这是更新博客的接口')
    } else {
      return new ErrorModel('博客更新失败')
    }
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id)
    if(result) {
      return new SuccessModel('这是删除博客的接口')
    } else {
      return new ErrorModel('博客删除失败')
    }
  }
}

module.exports = handleBlogRouter