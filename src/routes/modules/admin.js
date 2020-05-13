import Router from 'koa-router';
import AdminController from '@/api/controller/ManageAdminController';

const router = new Router();
router.prefix('/cms/admin');

router.post('/login', AdminController.login)
router.post('/reg', AdminController.addAdmin)
router.delete('/delete/:id', AdminController.deleteAdmin)
router.post('/add', AdminController.addAdmin)
router.post('/changePass', AdminController.changePassword)
router.get('/list', AdminController.adminList)
router.get('/getOne/:id', AdminController.adminFindOne)
router.put('/update/:username', AdminController.updateAdmin)
router.get('/getUserInfo', AdminController.getUserInfo)
router.post('/upload', AdminController.uploadAvatar)
router.get('/searchByUsername', AdminController.searchByUsername)
router.get('/searchById', AdminController.searchById)

export default router;
