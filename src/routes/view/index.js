const { loginRedirect } = require("../../middlewares/loginChecks")

const router = require("koa-router")()

router.get("/", loginRedirect, async (ctx, next) => {
    await ctx.render("index", {})
})

module.exports = router