/**
 * @description 微博 @ 关系 controller
 * @author qingsds
 */

const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount } = require('../services/at-relation')

/**
 * 获取 atMe 的数量
 * @param {number} userId
 */
async function getAtMeCount(userId) {
    const atCount = await getAtRelationCount(userId)
    return new SuccessModel({
        atCount,
    })
}

module.exports = {
    getAtMeCount,
}
