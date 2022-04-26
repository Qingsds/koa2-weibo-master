/**
 * @description 数据格式化
 * @author qingsds
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
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
        return list.map(_formatDBTime)
    }
    // 单个情况处理
    let res = _formatDBTime(list)
    return res
}

module.exports = {
    formatUser,
    formatBlog
}
