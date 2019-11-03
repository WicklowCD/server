import {Router} from 'express';

import UsersController from '../controllers/UserController';
import checkJWT from '../middleware/CheckJWT';

const router = Router();

router.get('/', [checkJWT], UsersController.listAllUsers);
router.post('/', [checkJWT], UsersController.createUser);
router.get('/:userId', [checkJWT], UsersController.getUser);
router.put('/:userId', [checkJWT], UsersController.updateUser);
router.post('/:userId/activate', [checkJWT], UsersController.activateUser);

export default router;
