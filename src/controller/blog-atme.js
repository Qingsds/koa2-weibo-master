/**
 * @description 微博 @ 关系 controller
 * @author qingsds
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation,
} = require('../services/at-relation')

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

/**
 * 获取 at 我的博客列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const { blogList, count } = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  })

  return new SuccessModel({
    count,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    isEmpty: blogList.length === 0,
  })
}

/**
 * 标记为已读
 * @param {number} userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation(
      {
        newIsRead: true,
      },
      {
        userId,
        isRead: false,
      }
    )
  } catch (error) {
    console.error(error.message, error.stack)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead,
}
