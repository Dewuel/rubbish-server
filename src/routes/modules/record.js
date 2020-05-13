import Router from 'koa-router';
import ManageRecordController from '@/api/controller/ManageRecordController';
const router = new Router()

router.prefix('/cms/record')

router.get('/list', ManageRecordController.findAll)
router.put('/update', ManageRecordController.update)
router.delete('/delete', ManageRecordController.delete)
router.get('/getByRecord', ManageRecordController.findAllByRecordNum)
router.get('/getByCategory', ManageRecordController.findAllByCategory)

export default router
