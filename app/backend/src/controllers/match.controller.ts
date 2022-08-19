import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import MatchesService from '../services/match.service';

export default class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const matches = await MatchesService.getAll();
    return res.status(statusCodes.OK).json(matches);
  }
}
