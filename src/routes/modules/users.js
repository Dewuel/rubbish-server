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
router.get('/hotArticles', UserController.getNewArticles)
router.get('/swiper', UserController.getSwiper)
router.get('/dustbin', UserController.getDustbin)
router.get('/category', UserController.getCategory)
router.get('/questions', UserController.getQuestion)
router.post('/createRecord', UserController.createRecord)
router.get('/searchGarbage', UserController.searchGarbage)
router.post('/addIntegral', UserController.addIntegral)
router.get('/hotNews', UserController.getHotNews)
router.get('/articleDetail/:id', UserController.getArticleDetail)
router.get('/findArticle', UserController.searchArticles)

export default router;
