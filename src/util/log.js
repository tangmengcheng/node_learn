const path = require('path')
const fs = require('fs')

function createWriteStream(fileName) { 
  let fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  let writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
 }

 function writeLog(writeStream, log) { 
   writeStream.write(log+'\n') 
  }

 const accessWriteStream = createWriteStream('access.log')

 function access(log) { 
  writeLog(accessWriteStream, log)
}

  module.exports = {
    access
  }