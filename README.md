# koa2-weibo-master

## 页面和路由

- 注册 /register
- 登录 /login
- 首页 /
- 个人主页 /profile/:userName
- at 页 /atMe
- 广场 /square
- 设置 /setting
- 错误页 /error
- 404 /*

## API

- 首页
  - 创建微博 /api/blog/crate
  - 上传图片 /api/utils/upload
  - 加载更多 /api/blog/loadMore/:pageIndex
- 个人主页
  - 加载更多 /api/profile/loadMore/:userName/:pageIndex
  - 关注 /api/profile/follow
  - 取消关注 /api/profile/unFollow
- 广场页 
  - 加载更多 /api/square/loadMore/:pageIndex


## 其他

### koa-jwt 配置

需要的工具

- `koa-jwt`
- `jsonwebtoken` 

```js
app.use(
    jwtKoa({
        secret: "Axs_&1DS!", //密匙
    }).unless({
        path: [/^\/users\/login/], //定义哪些目录忽略 jwt 验证
    })
)

// 路由
const util = require("util")
// 将函数转为 Promise 
const verify = util.promisify(jwt.verify)
// 获取用户信息
router.get("/info", async (ctx, next) => {
    // 这里要拿到客户端设置的 headers
    const token = ctx.headers.authorization
    try {
        // 解析 token
        const payload = await verify(token.split(" ")[1], "Axs_&1DS!")
        ctx.body = {
            errno: 0,
            userInfo: payload,
        }
    } catch (error) {
        console.log(token)
        ctx.body = {
            errno: 0,
            msg: error.message,
        }
    }
})
```
