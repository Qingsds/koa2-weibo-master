/**
 * @description profile api router
 * @author qingsds
 */

const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow, unFollow } = require('../../controller/user-relation')
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

// 关注功能 api
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body

    ctx.body = await follow(myUserId, curUserId)
})

// 取消关注的 api
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body

    ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router
