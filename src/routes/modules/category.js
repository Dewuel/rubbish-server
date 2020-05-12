import Router from 'koa-router';
import ManageCategoryController from '@/api/controller/ManageCategoryController';

const router = new Router();
router.prefix('/cms/category');

router.post('/create', ManageCategoryController.createCategory)
router.put('/update/:id', ManageCategoryController.updateCategory)
router.get('/list', ManageCategoryController.findAllCategory)
router.delete('/delete/:id', ManageCategoryController.deleteCategory)
router.get('/searchByName', ManageCategoryController.searchCategoryByName)
router.get('/searchByType', ManageCategoryController.searchCategoryByType)
router.get('/getById/:id', ManageCategoryController.findCategoryById)

export default router;
