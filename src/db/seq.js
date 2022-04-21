/**
 * @description sequelize 实例
 * @author qingsds
 */

const Sequelize = require("sequelize")
const { MYSQL_CONF } = require("../conf/db")

const { host, user, password, database } = MYSQL_CONF
const { isProd, isTest } = require("../utils/env")
const config = {
    host,
    dialect: "mysql",
}

if (isTest) {
    config.logging = () => {}
}

/* 线上环境的配置连接池 */
if (isProd) {
    config.pool = {
        max: 5, //连接池最大的数量
        min: 0,
        idle: 10000, //10s没有被使用就会释放
    }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq
