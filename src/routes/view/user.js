/**
 * @description user view 路由
 * @author qingsds
 */

const router = require("koa-router")()
const { loginRedirect } = require("../../middlewares/loginChecks")

/**
 * 获取用户信息
 * @param {Object} ctx 上下文
 * @returns  data
 */
function getUserInfo(ctx) {
    const data = {
        isLogin: false,
    }
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        Object.assign(data, {
            isLogin: true,
            userName: userInfo.userName,
        })
    }
    return data
}

router.get("/login", async (ctx, next) => {
    await ctx.render("login", getUserInfo(ctx))
})

router.get("/register", async (ctx, next) => {
    await ctx.render("register", getUserInfo(ctx))
})

router.get("/setting", loginRedirect, async (ctx, next) => {
    await ctx.render("setting", ctx.session.userInfo)
})

module.exports = router
