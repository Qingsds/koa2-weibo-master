/**
 * @description user controller
 * @author qingsds
 */

const {
    registerUserNameNotExistInfo,
    registerUserNameIsExistInfo,
    registerFailInfo,
} = require("../model/errorInfo")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { getUserInfo, createUser } = require("../services/user")
const { doCrypto } = require("../utils/cryp")

/**
 * 检查 username 是否存在
 * @param {string} userName
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (!userInfo) {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
    return new SuccessModel(userInfo)
}

/**
 * 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 1.男 2.女 3.保密
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameIsExistInfo)
    }
    // 创建用户
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
        })
        return new SuccessModel()
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register,
}
