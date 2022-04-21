/**
 * @description 环境变量
 * @author qingsds
 */

const ENV = process.env.NODE_ENV
module.exports = {
    notProd: ENV !== "production",
    isProd: ENV === "production",
    notDev: ENV !== "dev",
    isDev: ENV === "dev",
    notTest: ENV !== "test",
    isTest: ENV === "test",
}
