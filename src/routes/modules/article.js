import Router from 'koa-router';
import ManageArticleController from '@/api/controller/ManageArticleController';
const router = new Router()

router.prefix('/cms/article')

router.post('/create', ManageArticleController.create)
router.get('/list', ManageArticleController.findAll)
router.put('/update/:id', ManageArticleController.update)
router.delete('/delete/:id', ManageArticleController.delete)
router.get('/searchById', ManageArticleController.searchAllById)
router.get('/searchByTitle', ManageArticleController.searchByTitle)

export default router;
