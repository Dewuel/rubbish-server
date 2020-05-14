import Router from 'koa-router';
import ManageGarbageController from '@/api/controller/ManageGarbageController';

const router = new Router()
router.prefix('/cms/garbage')

router.post('/create', ManageGarbageController.create)
router.get('/list', ManageGarbageController.findAll)
router.put('/update/:id', ManageGarbageController.update)
router.delete('/delete/:id', ManageGarbageController.delete)
router.get('/searchById', ManageGarbageController.searchById)
router.get('/searchByCategory', ManageGarbageController.searchByCategory)

export default router;
