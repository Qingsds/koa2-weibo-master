/**
 * @description blog square controller
 * @author qingsds
 */

const { getBlogListFromCache } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 获取 square 微博列表
 * @param {number} pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    // 从缓存层获取微博列表
    const result = await getBlogListFromCache(pageIndex, PAGE_SIZE)
    // 处理数据
    const count = result.count
    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        count,
        pageIndex,
        pageSize: PAGE_SIZE,
    })
}

module.exports = {
    getSquareBlogList,
}
