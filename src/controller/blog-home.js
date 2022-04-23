/**
 * @description blog controller
 * @author qingsds
 */

const { createBlogFailInfo } = require("../model/errorInfo")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { createBlog } = require("../services/blog-home")
const { filterXSS } = require("xss")

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

module.exports = { create }
