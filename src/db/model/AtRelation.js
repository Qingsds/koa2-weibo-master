/**
 * @description at me model
 * @author qingsds
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 id',
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博 id',
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读',
    },
})

module.exports = AtRelation