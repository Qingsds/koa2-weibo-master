/**
 * @description sequelize 同步数据库
 * @author qingsds
 */

const seq = require("./seq")

require("./model/index")

/* 连接测试 */
seq.authenticate()
    .then(() => {
        console.log("ok")
    })
    .catch(() => {
        console.log("err")
    })

/* 
执行同步
force: true => 每次同步删除之间的表
*/
seq.sync({ force: true }).then(() => {
    console.log("async ok")
    process.exit()
})
