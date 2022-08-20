import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken.middleware';
import MatchesController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchesController.getAll);
router.post('/', ValidateToken.validate, MatchesController.create);
router.patch('/:id', MatchesController.update);
router.patch('/:id/finish', MatchesController.updateProgressToFalse);

export default router;
