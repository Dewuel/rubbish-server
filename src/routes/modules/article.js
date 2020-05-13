import Router from 'koa-router';
import ManageArticleController from '@/api/controller/ManageArticleController';
const router = new Router()

router.prefix('/cms/article')

router.post('/create', ManageArticleController.create)

export default router;
