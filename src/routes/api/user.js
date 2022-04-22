/**
 * @description user api 路由
 * @author qingsds
 */

const {
    isExist,
    register,
    login,
    deleteCurrentUser,
    changeUserInfo,
} = require("../../controller/user")
const generateValidator = require("../../middlewares/validator")
const { isTest } = require("../../utils/env")
const userValidate = require("../../validator/User")
const { loginCheck } = require("../../middlewares/loginChecks")

const router = require("koa-router")()
router.prefix("/api/user")

// 用户注册
router.post("/register", generateValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post("/isExist", async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 用户登录
router.post("/login", async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login({ ctx, userName, password })
})

// 删除当前用户
router.post("/delete", loginCheck, async (ctx, next) => {
    if (isTest) {
        const { userName } = ctx.session.userInfo
        ctx.body = await deleteCurrentUser(userName)
    }
})

// 修改用户信息
router.patch(
    "/changeInfo",
    loginCheck,
    generateValidator(userValidate),
    async (ctx, next) => {
        const { nickName, city, picture } = ctx.request.body
        ctx.body = await changeUserInfo(ctx, { nickName, city, picture })
    }
)

module.exports = router
