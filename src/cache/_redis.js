/**
 * @description 连接 redis 方法
 * @author qingsds
 */

const redis = require("redis")
const { REDIS_CONF } = require("../conf/db")

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.host, REDIS_CONF.port)

redisClient.on("error", err => {
    console.error("redis-error ", err)
})

/**
 * redis set
 * @param {string} key key
 * @param {string} val value
 * @param {number} timeout 过期时间 s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === "object") {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key key
 * @returns Promise
 */
async function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }

            if (val === null) {
                resolve(null)
                return
            }

            try {
                const result = JSON.parse(val)
                resolve(result)
            } catch {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get,
}
