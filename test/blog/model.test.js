/**
 * @description blog model test
 * @author qingsds
 */

const Blog = require("../../src/db/model/Blog")

test("blog 模型各个属性测试用例", () => {
    const blog = Blog.build({
        userId: 1,
        content: "blog model test",
        image: "test.png",
    })

    expect(blog.userId).toBe(1)
    expect(blog.content).toBe("blog model test")
    expect(blog.image).toBe("test.png")
})
