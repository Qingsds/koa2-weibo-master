/**
 * @description user services
 * @author qingsds
 */

const { User } = require('../db/model/index')
const { addFollowers } = require('./user-relation')
const { formatUser } = require('./_format')

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
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
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
    // 自己关注自己
    const data = result.dataValues
    const id = data.id
    await addFollowers(id, id)

    return data
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

/**
 * 更新用户信息
 * @param {Object} param0 需要修改的信息
 * @param {Object} param1 查找项
 */
async function updateUser(
    { newNickName, newPassword, newCity, newPicture },
    { userName, password }
) {
    // 拼接更新数据
    const updateData = {}
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newCity) {
        updateData.city = newCity
    }
    if (newPicture) {
        updateData.picture = newPicture
    }

    // 拼接查询选项
    const whereOption = {
        userName,
    }
    if (password) {
        whereOption.password = password
    }

    // 查询
    const result = await User.update(updateData, {
        where: whereOption,
    })
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser,
}
