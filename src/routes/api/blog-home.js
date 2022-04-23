/**
 * @description weibo 首页 api
 * @author qingsds
 */

const router = require("koa-router")()
const { create } = require("../../controller/blog-home")
const { loginCheck } = require("../../middlewares/loginChecks")

router.prefix("/api/blog")

router.post("/create", loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

module.exports = router
