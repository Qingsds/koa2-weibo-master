/**
 * @description test demo
 * @author qingsds
 */

function sum(a, b) {
    return a + b
}

test("sum demo", () => {
    const result = sum(10, 1)
    expect(result).toBe(11)
})
