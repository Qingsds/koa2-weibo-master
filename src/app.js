const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
const koaStatic = require("koa-static")
const path = require("path")
const { REDIS_CONF } = require("./conf/db")
const { isProd } = require("./utils/env")

// 路由
const indexRouter = require("./routes/view/index")
const userAPIRouter = require("./routes/api/user")
const userViewRouter = require("./routes/view/user")
const utilsAPIRouter = require("./routes/api/utils")
const errorViewRouter = require("./routes/view/error")
const { SESSION_SECRET_KEY } = require("./conf/secret-keys")

// error handler
let onerrorConfig = {}
if (isProd) {
    onerrorConfig = {
        redirect: "/error",
    }
}
onerror(app, onerrorConfig)

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"],
    })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + "/public"))
app.use(koaStatic(path.join(__dirname, "../", "uploadFiles")))

app.use(
    views(__dirname + "/views", {
        extension: "ejs",
    })
)

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(
    session({
        key: "weibo.sid", //cookie name 默认是 `koa.sid`
        prefix: "weibo.sess:", //redis key 默认是 `koa:sess`
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
        }),
    })
)

// routes
app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
// 404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx)
})

module.exports = app
