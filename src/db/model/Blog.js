/**
 * @description 微博数据模型
 * @author qingsds
 */

const seq = require("../seq")
const { INTEGER, TEXT, STRING } = require("../types")

const Blog = seq.define("blog", {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: "此条微博的用户 id",
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: "微博内容",
    },
    image: {
        type: STRING,
        comment: "上传的图片",
    },
})

module.exports = Blog
