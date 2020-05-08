import Router from 'koa-router';
import UserController from '@/api/controller/UserController';

const router = new Router()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/code', UserController.getCode)

router.post('/register', UserController.register)

router.post('/login', UserController.login)

export default router;
