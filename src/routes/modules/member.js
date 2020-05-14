import Router from 'koa-router';
import ManageUserController from '@/api/controller/ManageMemberController';

const router = new Router();
router.prefix('/cms/user');

router.get('/allMember', ManageUserController.findAllUser)
router.delete('/delete/:id', ManageUserController.deleteUser)
router.get('/getByEmail', ManageUserController.searchByEmail)
router.get('/getById', ManageUserController.searchById)

export default router;
