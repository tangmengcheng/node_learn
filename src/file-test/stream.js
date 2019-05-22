const fs = require('fs')
const path = require('path')

let fileName1 = path.resolve(__dirname, 'data.txt')
let fileName2 = path.resolve(__dirname, 'bac.txt')

let readStream = fs.createReadStream(fileName1)
let writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)

readStream.on('data', chunk => {
  console.log(chunk.toString())
})

readStream.on('end', () => {
  console.log('拷贝完成')
})