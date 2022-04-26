/**
 * @description blog controller
 * @author qingsds
 */

const { createBlogFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getBlogListByFollowers } = require('../services/blog')
const { filterXSS } = require('xss')
const { PAGE_SIZE } = require('../conf/constant')

/**
 *
 * @param {number} userId
 * @param {string} content
 * @param {string} image
 */
async function create({ userId, content, image }) {
    try {
        const data = await createBlog({
            userId,
            content: filterXSS(content),
            image,
        })
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
