/**
 * @description at test
 * @author qingsds
 */

const server = require('../server')
const {
    COOKIE,
    _COOKIE,
    _USER_NAME,
} = require('../testUserInfo')

let BLOG_ID

test('添加一个 lisi @ qingsds 的微博, 结果应该成功', async () => {
    const content = `单元测试创建的微博 lisi @qingsds - ${_USER_NAME}`
    const result = await server
        .post('/api/blog/create')
        .send({content})
        .set('Cookie', COOKIE)

    expect(result.body.errno).toBe(0)

    BLOG_ID = result.body.data.id
})

test('获取 qingsds @列表(第一页),结果应该有刚刚创建的博客', async () => {
    // 微博列表逆序排列
    const res = await server.get('/api/atMe/loadMore/0').set('Cookie', _COOKIE)
    const { blogList } = res.body.data
    const hasBlog = blogList.some(blog => blog.id === BLOG_ID)

    expect(res.body.errno).toBe(0)
    expect(hasBlog).toBe(true)
})
