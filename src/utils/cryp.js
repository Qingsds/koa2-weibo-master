/**
 * @description 加密函数
 * @author qingsds
 */

const crypto = require("crypto")
const { CRYPTO_SECRET_KEY } = require("../conf/secret-keys")

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
    const hash = crypto.createHash("md5")
    return hash.update(content).digest("hex")
}

function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {
    doCrypto,
}
