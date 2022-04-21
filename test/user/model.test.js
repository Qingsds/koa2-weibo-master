/**
 * @description user model test
 * @author qingsds
 */

const { User } = require("../../src/db/model/index")

test("User 模型的各个属性测试用例", () => {
    // 构建内存中 user 实例,不会同步到数据库
    const user = User.build({
        userName: "firstPerson",
        password: "123",
        nickName: "第一公民",
        gender: 1,
        picture: "/test.png",
        city: "hangzhou",
    })

    // 验证属性
    expect(user.userName).toBe("firstPerson")
    expect(user.password).toBe("123")
    expect(user.nickName).toBe("第一公民")
    expect(user.gender).toBe(1)
    expect(user.picture).toBe("/test.png")
    expect(user.city).toBe("hangzhou")
})
