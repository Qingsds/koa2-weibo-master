/**
 * @description blog profile controller
 * @author qingsds
 */
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../services/blog')

/**
 * 获取博客列表
 * @param {string} username 当前的用户名
 * @param {number} pageIndex 当前页
 */
async function getProfileBlogList(username, pageIndex = 0) {
    const result = await getBlogListByUser({
        username,
        pageIndex,
        pageSize: PAGE_SIZE,
    })
    const count = result.count
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        count,
        pageSize: PAGE_SIZE,
        pageIndex,
    })
}

module.exports = {
    getProfileBlogList,
}
