const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {}
// 获取 cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// 用户处理 post data
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') { // get请求
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })
        req.on('end', () => {
            if (!postData) { // 不存在内容
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json;charset=utf-8')
    // 处理path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])
    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    });
    // 解析 session
    let seedSetCookie = false // 是否需要设置cookie
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        seedSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // 处理 postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理 blog 路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (seedSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        // 处理 user 路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (seedSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // 未命中路由，返回404
        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        res.write("404 Not Found \n")
        res.end()
    })
}

module.exports = serverHandle