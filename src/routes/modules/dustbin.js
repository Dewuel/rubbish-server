import Router from 'koa-router';
import ManageDustbinController from '@/api/controller/ManageDustbinController';
const router = new Router()
router.prefix('/cms/dustbin')

router.post('/create', ManageDustbinController.create)
router.get('/list', ManageDustbinController.findAll)
router.get('/findOne/:id', ManageDustbinController.findById)
router.put('/update/:id', ManageDustbinController.update)
router.delete('/delete/:id', ManageDustbinController.delete)
router.get('/searchEstate', ManageDustbinController.searchByEstate)
router.get('/searchDevice', ManageDustbinController.searchByDevice)

export default router;
