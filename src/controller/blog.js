const getList = (author, keyword) => {
  // 先返回假数据，（格式是正确的）
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      author: 'zhangsan',
      createTime: 1557824399765
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      author: 'lisi',
      createTime: 1557824444660
    }
  ]
}

const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    author: 'zhangsan',
    createTime: 1557824399765
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象, 包含 title comtent 等 
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新的博客的的id
  return true
}

const delBlog = id => {
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}