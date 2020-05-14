import Router from 'koa-router';
import ManageIntegralController from '@/api/controller/ManageIntegralController';
const router = new Router();
router.prefix('/cms/integral')

router.post('/create', ManageIntegralController.create)
router.get('/list', ManageIntegralController.findAll)
router.get('/findOne/:id', ManageIntegralController.findById)
router.put('/update/:id', ManageIntegralController.updateIntegral)
router.delete('/delete/:id', ManageIntegralController.deleteIntegral)
router.get('/searchById', ManageIntegralController.searchById)
router.get('/searchByCategory', ManageIntegralController.searchByCategory)

export default router;
