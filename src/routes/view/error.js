/**
 * @description 404 error router
 * @author qingsds
 */

const router = require("koa-router")()

// error router
router.get("/error", async (ctx, next) => {
    await ctx.render("error")
})

// 404 router
router.get("*", async (ctx, next) => {
    await ctx.render("404")
})

module.exports = router
