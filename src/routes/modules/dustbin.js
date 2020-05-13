import Router from 'koa-router';
import ManageDustbinController from '@/api/controller/ManageDustbinController';
const router = new Router()
router.prefix('/cms/dustbin')
router.post('/create', ManageDustbinController.create)
router.get('/list', ManageDustbinController.findAll)
router.put('/update', ManageDustbinController.update)
router.delete('/delete', ManageDustbinController.delete)
router.get('/searchEstate', ManageDustbinController.searchByEstate)
router.get('/searchDevice', ManageDustbinController.searchByEstate)

export default router;
