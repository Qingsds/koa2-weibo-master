/**
 * @description 对时间进行格式化
 * @author qingsds
 */

const { format } = require('date-fns')

/**
 * 格式化时间 输出: 04.26 15:26
 * @param {string} str 时间字符串
 * @returns string
 */
const timeFormat = str => {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat,
}
