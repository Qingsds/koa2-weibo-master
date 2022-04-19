/**
 * @description 储存配置
 * @author qingsds
 */

const { isProd } = require("../utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "weibo_db",
};

if (isProd) {
  /* 上线配置 */
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };

  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "weibo_db",
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
