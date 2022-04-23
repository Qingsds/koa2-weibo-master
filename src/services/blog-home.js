/**
 * @description blog home service
 * @author qingsds
 */

const { Blog } = require("../db/model")

/**
 *
 * @param {Object} param0 { userId, content, image }
 * @returns
 */
async function createBlog({ userId, content, image }) {
    const blog = await Blog.create({
        userId,
        content,
        image,
    })

    return blog.dataValue
}

module.exports = { createBlog }
