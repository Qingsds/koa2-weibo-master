/**
 * @description square-blog test
 * @author qingsds
 */

 const server = require('../server')
 const { COOKIE, USER_NAME } = require('../testUserInfo')
 
 test('测试广场页加载, 结果应该成功', async () => {
     const api = `/api/square/loadMore/0`
     const res = await server.get(api).set('Cookie', COOKIE)
 
     expect(res.body.errno).toBe(0)
     expect(res.body.data).toHaveProperty('isEmpty')
     expect(res.body.data).toHaveProperty('blogList')
     expect(res.body.data).toHaveProperty('count')
     expect(res.body.data).toHaveProperty('pageIndex')
     expect(res.body.data).toHaveProperty('pageSize')
 })
 