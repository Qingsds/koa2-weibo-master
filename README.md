# koa2-weibo-master

## koa-jwt 配置

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
