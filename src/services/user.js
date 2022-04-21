/**
 * @description user services
 * @author qingsds
 */

const { User } = require("../db/model/index")
const { formatUser } = require("./_format")

/**
 * 获取用户信息
 * @param {string} userName username
 * @param {string} password password
 */
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOption = {
        userName,
    }
    if (password) {
        Object.assign(whereOption, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ["id", "userName", "nickName", "picture", "city"],
        where: whereOption,
    })
    if (result === null) {
        return result
    }
    // 格式化
    const formatResult = formatUser(result.dataValues)
    return formatResult
}

/**
 * 创建用户信息
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 性别 1 男 2 女 3 保密
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender,
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 
 * @returns  number
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName,
        },
    })
    // result 返回删除的行数
    return result > 0
}

module.exports = { getUserInfo, createUser,deleteUser }
