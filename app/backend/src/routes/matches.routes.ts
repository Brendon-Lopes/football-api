import { Router } from 'express';
import MatchesController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchesController.getAll);

export default router;
