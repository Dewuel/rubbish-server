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
router.post('/avatar', UserController.changeAvatar)
router.post('/changePass', UserController.changePass)
router.post('/updateUserInfo', UserController.changeUserInfo)
router.get('/userInfo', UserController.getUserInfo)
router.get('/recordList', UserController.getRecord)

export default router;
