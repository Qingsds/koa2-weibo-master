/**
 * @description blog view 路由
 * @author qingsds
 */
const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {})
})

// 跳转个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 获取 url 中的 query 参数
    let { userName: curUserName } = ctx.params

    // blogData
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, count, pageSize, pageIndex } = result.data
    // fansData
    const userInfo = ctx.session.userInfo
    const { id, userName } = ctx.session.userInfo
    const isMe = userName === curUserName
    const fansResult = await getFans(id)
    const { fansCount, fansList } = fansResult.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
        },
        userData: {
            userInfo,
            isMe,
            fansData: {
                count: fansCount,
                userList: fansList,
            },
        },
    })
})

router.get('/square', loginRedirect, async (ctx, next) => {
    const result = await getSquareBlogList()
    const { isEmpty, blogList, count, pageSize, pageIndex } = result.data

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
        },
    })
})

module.exports = router
