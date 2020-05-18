import Router from 'koa-router';
import ManageQuestionController from '@/api/controller/ManageQuestionController';

const router = new Router()
router.prefix('/cms/question')

router.post('/create', ManageQuestionController.create)
router.get('/list', ManageQuestionController.findAll)
router.get('/findOne', ManageQuestionController.findById)
router.put('/update/:id', ManageQuestionController.update)
router.delete('/delete/:id', ManageQuestionController.delete)
router.get('/searchById', ManageQuestionController.searchById)
// router.get('/questions', ManageQuestionController.getQuestion)

export default router;
