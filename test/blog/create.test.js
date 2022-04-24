/**
 * @description create blog test
 * @author qingsds
 */

const server = require("../server")
const { COOKIE } = require("../testUserInfo")
const content = `weibo_create_test_${Date.now()}`
const image = `/weibo_create_test_${Date.now()}.png`

const testData = {
    content,
    image,
}

test("创建一个微博, 结果应该成", async () => {
    const res = await server
        .post("/api/blog/create")
        .send(testData)
        .set("Cookie", COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
})
