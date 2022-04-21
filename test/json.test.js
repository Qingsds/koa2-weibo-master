/**
 * @description json test
 * @author qingsds
 */

const server = require("./server")

test("json 接口测试", async () => {
    const res = await server.get("/json")
    expect(res.body).toEqual({
        title: "koa2 json",
    })
    expect(res.body.title).toBe("koa2 json")
})

/* post 演示 */
// test('post 接口测试', async () => {
//   const res = await server.post('/login').send({
//     username: 'qingsds',
//     password: '123456'
//   })
// });
