const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
const { REDIS_CONF } = require("./conf/db")
const { isProd } = require("./utils/env")

const index = require("./routes/index")
const users = require("./routes/users")
const errorViewRouter = require("./routes/view/error")

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
app.use(require("koa-static")(__dirname + "/public"))

app.use(
    views(__dirname + "/views", {
        extension: "ejs",
    })
)

// session 配置
app.keys = ["IXss_1213#"]
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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx)
})

module.exports = app
