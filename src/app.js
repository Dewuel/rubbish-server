import Koa from 'koa'
import JWT from 'koa-jwt'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import koaJson from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'
import compress from 'koa-compress'
import onerror from 'koa-onerror'
import config from './config/index'

const app = new Koa();

const isDevMode = process.env.NODE_ENV !== 'production'

const jwt = JWT({ secret: config.JWT_SECRET }).unless({ path: [/^\/public/, /^\/login/, /^\/register/] })

// error handler
onerror(app)

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  helmet(),
  koaJson(),
  jwt,
])
app.use(middleware)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

if (!isDevMode) {
  app.use(compress())
}

// routes
app.use(router)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(5000)
