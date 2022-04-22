/**
 * @description 数据模型入口
 * @author qingsds
 */

const User = require("./User")
const Blog = require("./Blog")

/* 设置外键 */

// 一个用户有很多博客, 查询博客可以顺带查到关联的 user.id; 外键 userId = user.id
Blog.belongsTo(User, {
    foreignKey: "userId",
})

module.exports = {
    User,
    Blog,
}
