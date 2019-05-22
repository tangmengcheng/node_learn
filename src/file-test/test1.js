const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) =>{
  if(err) {
    console.error(err)
    return
  }
  console.log(data.toString())
})

// 写入文件
const content = '这是新写的的内容\n'
const opt = {
  flag: 'a' // 追加写入， 覆盖用w
}

fs.writeFile(fileName, content, opt, (err) => {
  if(err) {
    console.log(err)
    return
  }
  console.log('写入成功')
})

// 判断文件是否存在
fs.exists(fileName, (exists) => {
  exists ? '文件存在' : '文件不存在'
})