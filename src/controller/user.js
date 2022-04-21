/**
 * @description user controller
 * @author qingsds
 */

const { registerUserNameNotExistedInfo } = require("../model/errorInfo")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { getUserInfo } = require("../services/user")

/**
 * 检查 username 是否存在
 * @param {string} userName
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (!userInfo) {
        return new ErrorModel(registerUserNameNotExistedInfo)
    }
    return new SuccessModel(userInfo)
}

module.exports = {
    isExist,
}
