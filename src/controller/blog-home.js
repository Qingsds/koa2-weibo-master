/**
 * @description blog controller
 * @author qingsds
 */

const { createBlogFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getBlogListByFollowers } = require('../services/blog')
const { filterXSS } = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 *
 * @param {number} userId
 * @param {string} content
 * @param {string} image
 */
async function create({ userId, content, image }) {
    // 解析 blog 里的 @ 信息
    const atUserList = []
    // 从 content 中拿到 @ 信息
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, userName, nickName) => {
            atUserList.push(userName)
            return matchStr
        }
    )
    // 根据 userName 拿到 userId
    let userList = await Promise.all(atUserList.map(item => getUserInfo(item)))
    userList = userList.map(user => user.id)
    try {
        const data = await createBlog({
            userId,
            content: filterXSS(content),
            image,
        })
        await Promise.all(
            userList.map(userId => createAtRelation(userId, data.id))
        )
        return new SuccessModel(data)
    } catch (error) {
        console.error(error.message, error.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取主页博客列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const { blogList, count } = await getBlogListByFollowers({
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

module.exports = {
    create,
    getHomeBlogList,
}
