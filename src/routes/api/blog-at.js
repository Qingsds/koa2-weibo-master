/**
 * @description blog at api
 * @author qingsds
 */

const { getAtMeBlogList } = require('../../controller/blog-atme')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginRedirect, async (ctx, next) => {
    // 获取参数
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    // 获取用户 id
    const { id: userId } = ctx.session.userInfo
    // 控制层
    const result = await getAtMeBlogList(userId, pageIndex)
    const { blogList } = result.data

    result.data.blogListTpl = getBlogListStr(blogList)
    ctx.body = result
})

module.exports = router
