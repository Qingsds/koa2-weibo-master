/**
 * @description at-relation service
 * @author qingsds
 */

const { AtRelation, Blog, User } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建博客at 关系
 * @param {number} userId
 * @param {number} blogId
 */
async function createAtRelation(userId, blogId) {
    const result = await AtRelation.create({
        userId,
        blogId,
    })

    return result.dataValues
}

/**
 * 获取 被 at 的数量
 * @param {number} userId
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false,
        },
    })

    return result.count
}

/**
 * 根据 atUser id 获取博客列表
 * @param {Object} param0 { userId, pageIndex, pageSize = 5 }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 5 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [['id', 'desc']],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: {
                    userId,
                },
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
            },
        ],
    })

    // 格式化数据
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(item => {
        item.user = formatUser(item.user.dataValues)
        return item
    })

    return {
        count: result.count,
        blogList,
    }
}

/**
 * 更新 atRelation
 * @param {Object} param0 要修改的项目
 * @param {Object} param1 条件
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }
    const whereOption = {}
    if (isRead) {
        whereOption.isRead = isRead
    }
    if (userId) {
        whereOption.userId = userId
    }

    const result = await AtRelation.update(updateData, {
        where: whereOption,
    })

    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation,
}
