/**
 * @description 用户数据校验中间件
 * @author qingsds
 */

const { jsonSchemaFailInfo } = require("../model/errorInfo")
const { ErrorModel } = require("../model/ResModel")

/**
 * json schema 中间件生成函数
 * @param {function} ValidateFn 验证函数
 * @returns
 */
function generateValidator(ValidateFn) {
    async function validator(ctx, next) {
        // 校验
        const data = ctx.request.body
        const error = ValidateFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFailInfo)
            return
        }
        await next()
    }
    return validator
}

module.exports = generateValidator
