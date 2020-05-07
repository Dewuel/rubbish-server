import Router from 'koa-router';
const router = new Router()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/login', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

export default router;
