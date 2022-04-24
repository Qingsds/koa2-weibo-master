/**
 * @description profile api router
 * @author qingsds
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多 api
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    
    // 获取数据
    const result = await getProfileBlogList(userName, pageIndex)

    const blogList = result.data.blogList
    result.data.blogListTpl = getBlogListStr(blogList)
    
    ctx.body = result
})

module.exports = router
