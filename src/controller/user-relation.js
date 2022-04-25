/**
 * @description user relation controller
 * @augments qingsds
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollowerId } = require('../services/user-relation')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId
 */
async function getFans(userId) {
    const { fansCount, fansList } = await getUsersByFollowerId(userId)

    return new SuccessModel({
        fansCount,
        fansList,
    })
}

module.exports = {
    getFans,
}
