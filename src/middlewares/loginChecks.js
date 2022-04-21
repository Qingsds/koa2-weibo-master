/**
 * @description 登录校验
 * @author qingsds
 */

const { loginCheckFailInfo } = require("../model/errorInfo")
const { ErrorModel } = require("../model/ResModel")

/**
 * api 登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 * @returns
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录校验
 * @param {Object} ctx
 * @param {function} next
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 将当前访问的 url 作为 query 参数,登录之后客户端做跳转
    const url = ctx.url
    ctx.redirect(`/login?url=${encodeURIComponent(url)}`)
}

module.exports = {
    loginCheck,
    loginRedirect,
}
