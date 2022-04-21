/**
 * @description user api login test
 * @author qingsds
 */

const server = require("../server")

const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1,
}

// 储存 cookie
let cookie = ""

test("注册一个用户的测试用例 结果应该成功", async () => {
    const res = await server.post("/api/user/register").send(testUser)
    expect(res.body.errno).toBe(0)
})

test("重复注册 结果应该是失败", async () => {
    const res = await server.post("/api/user/register").send(testUser)
    expect(res.body.errno).not.toBe(0)
})

test("查询用户名是否存在 应该成功", async () => {
    const res = await server.post("/api/user/isExist").send({ userName })
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test("json schema 检测 ,一些非法的数据格式, 结果应该失败", async () => {
    const res = await server.post("/api/user/register").send({
        userName: "123",
        password: "123",
        gender: "hello world",
    })
    expect(res.body.errno).not.toBe(0)
})

test("登录测试, 结果应该成功", async () => {
    const res = await server.post("/api/user/login").send({
        userName,
        password,
    })
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    cookie = res.headers["set-cookie"]
})

test("删除用户,应该成功", async () => {
    const res = await server.post("/api/user/delete").set("Cookie", cookie)
    expect(res.body.errno).toBe(0)
})

test("查询用户名是否存在 应该不存在", async () => {
    const res = await server.post("/api/user/isExist").send({ userName })
    expect(res.body.errno).not.toBe(0)
})
