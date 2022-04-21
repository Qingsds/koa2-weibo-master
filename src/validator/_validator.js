/**
 * @description json schema 校验
 * @author qingsds
 */

const Ajv = require("ajv")
const ajv = new Ajv()

/**
 * json schema 校验函数
 * @param {Object} schema 校验规则
 * @param {Object} data 数据对象
 */
function _validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = _validate