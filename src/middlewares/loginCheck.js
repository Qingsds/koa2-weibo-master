/**
 * @description 登录校验
 * @author qingsds
 */

const { loginCheckFailInfo } = require("../model/errorInfo")
const { ErrorModel } = require("../model/ResModel")

async function loginCheck(ctx, next) {
    if (!ctx.session.userInfo) {
        return new ErrorModel(loginCheckFailInfo)
    }
    await next()
}

module.exports = loginCheck