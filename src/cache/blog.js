/**
 * @description blog square 缓存层
 * @author qingsds
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')
const REDIS_KEY_PREFIX = 'weibo:square:'

/**
 * 从缓存中获取微博列表
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getBlogListFromCache(pageIndex, pageSize) {
    const key = `${REDIS_KEY_PREFIX}_${pageIndex}_${pageSize}`
    // 获取缓存, 如果有的话直接返回
    const cacheResult = await get(key)

    if (cacheResult == null) {
        // 如果没有缓存,则从数据库中获取,并设置缓存
        const result = await getBlogListByUser({ pageIndex, pageSize })
        set(key, result,60)
        return result
    }
    return cacheResult
}

module.exports = {
    getBlogListFromCache,
}
