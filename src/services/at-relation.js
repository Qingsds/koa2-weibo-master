/**
 * @description at-relation service
 * @author qingsds
 */

const { AtRelation } = require('../db/model')

/**
 * 创建博客at 关系
 * @param {number} userId
 * @param {number} blogId
 */
async function createAtRelation(userId, blogId) {
    const result = await AtRelation.create({
        userId,
        blogId,
    })

    return result.dataValues
}

/**
 * 获取 被 at 的数量
 * @param {number} userId
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false,
        },
    })

    return result.count
}

module.exports = {
    createAtRelation,
    getAtRelationCount
}
