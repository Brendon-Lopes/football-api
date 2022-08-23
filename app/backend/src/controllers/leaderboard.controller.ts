import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getAllHome(req: Request, res: Response) {
    const result = await LeaderboardService.getAllHome();
    return res.status(StatusCodes.OK).json(result);
  }
}
