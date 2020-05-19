import Router from 'koa-router';
import ManageArticleController from '@/api/controller/ManageArticleController';
const router = new Router()

router.prefix('/cms/article')

router.post('/create', ManageArticleController.create)
router.get('/list', ManageArticleController.findAll)
router.post('/update/:id', ManageArticleController.update)
router.delete('/delete/:id', ManageArticleController.delete)
router.get('/searchById', ManageArticleController.searchAllById)
router.get('/searchByTitle', ManageArticleController.searchByTitle)
router.get('/findOne/:id', ManageArticleController.findById)
router.get('/stick/:id', ManageArticleController.stickArticle)
router.get('/disStick/:id', ManageArticleController.disStickArticle)

export default router;
