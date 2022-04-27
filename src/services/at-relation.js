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

module.exports = createAtRelation