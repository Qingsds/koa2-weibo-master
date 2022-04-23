/**
 * @description weibo 内容校验
 * @author qingsds
 */

const _validate = require("./_validator")

const SCHEMA = {
    properties: {
        content: {
            type: "string",
        },
        image: {
            type: "string",
            maxLength: 255,
        },
    },
}

function blogValidate(data = {}) {
    return _validate(SCHEMA, data)
}

module.exports = blogValidate
