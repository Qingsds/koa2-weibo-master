/**
 * @description 数据格式化
 * @author qingsds
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } = require('../utils/dataTime')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 * @returns obj
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化时间
 * @param {Object} obj
 * @returns obj
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化文本(更改 at 为链接 🔗)
 * @param {Object} obj 数据对象
 */
function _formatContent(obj) {
    obj.formatContent = obj.content
    obj.formatContent = obj.formatContent.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或单个对象
 */
function formatUser(list) {
    if (list == null) {
        return
    }
    if (Array.isArray(list)) {
        return list.map(_formatUserPicture)
    }
    // 单个对象
    return _formatUserPicture(list)
}

/**
 * 格式化博客
 * @param {Array|Object} list 博客列表
 * @returns list
 */
function formatBlog(list) {
    if (list == null) return list
    // 批量处理
    if (Array.isArray(list)) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    // 单个情况处理
    let res = _formatDBTime(list)
    res = _formatContent(res)
    return res
}

module.exports = {
    formatUser,
    formatBlog,
}
