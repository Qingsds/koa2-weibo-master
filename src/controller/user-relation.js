/**
 * @description user relation controller
 * @augments qingsds
 */

const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  getUsersByFollowerId,
  deleteFollower,
  getFollowersByUserId,
} = require('../services/user-relation')
const { addFollowers } = require('../services/user-relation')

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

/**
 * 根据 userid 获取关注列表
 * @param {number} userId
 */
async function getFollowers(userId) {
  const { followerCount, followers } = await getFollowersByUserId(userId)

  return new SuccessModel({
    followerCount,
    followers,
  })
}

/**
 * 关注
 * @param {number} myUserId 当前用户的 id
 * @param {number} curUserId  要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollowers(myUserId, curUserId)
    return new SuccessModel()
  } catch (err) {
    console.error(err.message, err.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} myUserId 用户 id
 * @param {number} curUserId 被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (!result) {
    return new ErrorModel(deleteFollowerFailInfo)
  }
  return new SuccessModel()
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollowers,
}
