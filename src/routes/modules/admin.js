import Router from 'koa-router';
import AdminController from '@/api/controller/AdminController';

const router = new Router();
router.prefix('/cms/admin');

router.post('/login', AdminController.login)
router.post('/reg', AdminController.addAdmin)

export default router;
