import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import MatchesService from '../services/match.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress !== null && inProgress === 'false') {
      const matches = await MatchesService.getAllFinished();
      return res.status(statusCodes.OK).json(matches);
    }

    if (inProgress) {
      const matches = await MatchesService.getAllInProgress();
      return res.status(statusCodes.OK).json(matches);
    }

    const matches = await MatchesService.getAll();
    return res.status(statusCodes.OK).json(matches);
  }
}
