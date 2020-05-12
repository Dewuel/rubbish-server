import Router from 'koa-router';
import ManageIntegralController from '@/api/controller/ManageIntegralController';
const router = new Router();
router.prefix('/cms/integral')

router.post('/create', ManageIntegralController.create)

export default router;
