import { Request, Response } from 'express';
import statusCodes, { StatusCodes } from 'http-status-codes';
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

  static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const match = await MatchesService.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
    });

    return res.status(statusCodes.CREATED).json(match);
  }

  static async updateProgressToFalse(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.updateProgressToFalse(id);

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesService.update(id, { homeTeamGoals, awayTeamGoals });

    return res.status(StatusCodes.OK).json({ message: 'Successfully updated' });
  }
}
