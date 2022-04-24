/**
 * @description blog square api router
 * @author qingsds
 */

const { getSquareBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()

router.prefix('/api/square')

router.get('/loadMore/:pageIndex', loginRedirect, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)

    const result = await getSquareBlogList(pageIndex)

    const blogList = result.data.blogList
    result.data.blogListTpl = getBlogListStr(blogList)

    ctx.body = result
})

module.exports = router
