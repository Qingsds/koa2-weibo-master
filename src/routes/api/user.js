/**
 * @description user api 路由
 * @author qingsds
 */

const { isExist, register } = require("../../controller/user")

const router = require("koa-router")()
router.prefix("/api/user")

// 用户注册
router.post("/register", async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post("/isExist", async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router
