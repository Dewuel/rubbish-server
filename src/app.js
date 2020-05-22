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
import ErrorHandle from '@/utils/ErrorHandle';

const app = new Koa();

const isDevMode = process.env.NODE_ENV !== 'production'

const jwt = JWT({ secret: config.JWT_SECRET }).unless({
  path: [/^\/static\/*/, /^\/users\/login/, /^\/users\/register/, /^\/users\/getcode/, /^\/users\/code/,
    /^\/cms\/admin\/login/]
})

// error handler
onerror(app)

const middleware = compose([
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 10 * 1024 * 1024
    }
  }),
  statics(path.join(process.cwd(), 'public')),
  cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  }),
  helmet(),
  koaJson(),
  jwt,
  ErrorHandle
])
app.use(middleware)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url}  ${ctx.status} - ${ms}ms`)
})

if (!isDevMode) {
  app.use(compress())
}

// routes
app.use(router())
// app.use(async (ctx, next) => {
//   const token = ctx.request.headers['authorization']
//   const payload = getJWTPayload(token)
//   if (payload.role_num === 'ROLE_COMMON' || payload.role_num === 'ROLE_SUPER') {
//     await next()
//   }
// })
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(5000)
