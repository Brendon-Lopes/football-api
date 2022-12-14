import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

router.get('/', TeamsController.getAll);
router.get('/:id', TeamsController.getById);

export default router;
