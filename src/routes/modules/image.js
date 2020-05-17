import Router from 'koa-router';
import ManageImageController from '@/api/controller/ManageImageController';
const router = new Router();
router.prefix('/cms/swiper')

router.post('/create', ManageImageController.create)
router.get('/findAll', ManageImageController.findAll)
router.delete('/delete/:id', ManageImageController.delete)

export default router;
