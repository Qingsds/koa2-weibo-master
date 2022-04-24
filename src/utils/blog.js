/**
 * @description blog utils
 * @author qingsds
 */

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const TARGET_FILE_PATH = path.join(
    __dirname,
    '..',
    'views',
    'widgets',
    'blog-list.ejs'
)
const BLOG_LIST_TEMPLATE = fs.readFileSync(TARGET_FILE_PATH).toString()

/**
 * 根据 blogList 渲染 博客列表页面
 * @param {Array} blogList 博客列表
 * @param {boolean} canReply 是否能被回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TEMPLATE, { blogList, canReply })
}

module.exports = {
    getBlogListStr,
}
