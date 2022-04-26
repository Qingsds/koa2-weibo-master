/**
 * @description blog home service
 * @author qingsds
 */

const { Blog, User, UserRelation } = require('../db/model')
const { formatUser, formatBlog } = require('../services/_format')

/**
 * 创建博客
 * @param {Object} param0 { userId, content, image }
 * @returns
 */
async function createBlog({ userId, content, image }) {
    const blog = await Blog.create({
        userId,
        content,
        image,
    })

    return blog.dataValues
}

/**
 * 根据用户名查询 blogList
 * @param {Object} param0 {username,pageIndex = 0,pageSize = 10}
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 5 }) {
    const userWhereOption = {}
    if (userName) {
        userWhereOption.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [['id', 'desc']],
        include: {
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
            where: userWhereOption,
        },
    })

    /* result.count 总数, result.rows 返回结果数组 */
    const count = result.count
    let blogList = result.rows.map(value => value.dataValues)

    blogList = blogList.map(blog => {
        const user = blog.user.dataValues
        blog.user = formatUser(user)
        return blog
    })

    return {
        count,
        blogList,
    }
}

/**
 * 根据关注人获取博客列表
 * @param {Object} param0 { userId, pageIndex, pageSize }
 */
async function getBlogListByFollowers({ userId, pageIndex = 0, pageSize = 5 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [['id', 'desc']],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                // 根据 userId 找到所有关注人的
                where: {
                    userId,
                },
            },
        ],
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = blogList.map(item => {
        const user = item.user.dataValues
        item.user = formatUser(user)
        return item
    })
    blogList = formatBlog(blogList)
    return {
        count: result.count,
        blogList,
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getBlogListByFollowers,
}
