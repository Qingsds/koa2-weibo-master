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
    changeInfoFailInfo,
    changePasswordFailInfo,
} = require("../model/errorInfo")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const {
    getUserInfo,
    createUser,
    deleteUser,
    update,
    updateUser,
} = require("../services/user")
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

/**
 *
 * @param {Object} ctx 上下文 用来修改 session
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 图片 rul
 */
async function changeUserInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture,
        },
        { userName }
    )
    // 修改成功之后, 修改 session
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture,
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改用户密码
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 */
async function changeUserPassword(userName, password, newPassword) {
    const result = await updateUser(
        { newPassword: doCrypto(newPassword) },
        {
            userName,
            password: doCrypto(password),
        }
    )

    if (!result) {
        return new ErrorModel(changePasswordFailInfo)
    }
    return new SuccessModel()
}

/**
 * 退出登录
 * @param {Object} ctx 上下文
 */
async function logout(ctx) {
    // 删除userInfo
    Reflect.deleteProperty(ctx.session, "userInfo")
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    logout,
    deleteCurrentUser,
    changeUserInfo,
    changeUserPassword,
}
