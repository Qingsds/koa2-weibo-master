const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  throw new Error()
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if (!session.viewNumber) {
    session.viewNumber = 0
  }
  session.viewNumber++
  ctx.body = {
    title: 'koa2 json',
    // viewNumber: session.viewNumber
  }
})

module.exports = router