/**
 * @description blog view 路由
 * @author qingsds
 */
const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')

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
    //  获取 session 中的用户信息
    const myUserInfo = ctx.session.userInfo
    const isMe = myUserInfo.userName === curUserName
    // 判断当前的用户信息
    let curUserInfo
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        const existResult = await isExist(curUserName)
        if (existResult.errno === 0) {
            curUserInfo = existResult.data
        }
    }
    // blogData
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, count, pageSize, pageIndex } = result.data

    // fans data
    const fansResult = await getFans(curUserInfo.id)
    const { fansCount, fansList } = fansResult.data

    // 判断我有没有关注该用户, 遍历该用户的 fans 判断是否有 我 的名字
    const amIFollowed = fansList.some(fans => {
       return fans.userName === myUserInfo.userName
    })

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count,
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                userList: fansList,
            },
            amIFollowed,
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
