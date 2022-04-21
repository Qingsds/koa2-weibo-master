/**
 * @description user controller
 * @author qingsds
 */

const {
    registerUserNameNotExistInfo,
    registerUserNameIsExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
} = require("../model/errorInfo")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { getUserInfo, createUser, deleteUser } = require("../services/user")
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

/**
 * login
 * @param {Object} ctx 上下文,用于 session
 * @param {string} userName
 * @param {string} password
 */
async function login({ ctx, userName, password }) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    // 处理 session
    if (!ctx.session || !ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName
 */
async function deleteCurrentUser(userName) {
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser,
}
