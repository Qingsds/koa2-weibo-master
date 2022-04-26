/**
 * @description weibo 首页 api
 * @author qingsds
 */

const router = require('koa-router')()
const { create, getHomeBlogList } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const blogValidate = require('../../validator/Blog')
const generateValidator = require('../../middlewares/validator')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

router.post(
    '/create',
    loginCheck,
    generateValidator(blogValidate),
    async (ctx, next) => {
        const { content, image } = ctx.request.body
        const { id: userId } = ctx.session.userInfo
        ctx.body = await create({ userId, content, image })
    }
)

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    const { id } = ctx.session.userInfo
    // 获取 url 参数 并转换为 number
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)
    // 返回数据
    const result = await getHomeBlogList(id, pageIndex)
    const blogList = result.data.blogList
    result.data.blogListTpl = getBlogListStr(blogList)

    ctx.body = result
})

module.exports = router
