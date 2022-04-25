/**
 * @description user relation service
 * @author qingsds
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 根据被关注人 id 查找粉丝列表
 * @param {number} followerId 被关注人 id
 */
async function getUsersByFollowerId(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['userName', 'nickName', 'picture', 'id'],
        order: [['id', 'desc']],
        include: {
            model: UserRelation,
            where: {
                followerId,
            },
        },
    })

    // 处理数据
    let fansList = result.rows.map(row => row.dataValues)
    fansList = fansList.map(formatUser)

    return {
        fansCount: result.count,
        fansList,
    }
}

/**
 * 添加用户关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 关注人 id
 */
async function addFollowers(userId, followerId) {
    const result = UserRelation.create({
        userId,
        followerId,
    })
    
    return result.dataValues
}

/**
 * 删除用户关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 关注人 id
 * @returns boolean
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId,
        },
    })
    
    return result > 0
}

module.exports = {
    getUsersByFollowerId,
    addFollowers,
    deleteFollower,
}
