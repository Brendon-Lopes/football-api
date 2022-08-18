import { Router } from 'express';
import Validate from '../middlewares/loginValidation.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/', Validate.login, UserController.login);
router.get('/validate', UserController.validate);

export default router;
