import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import TeamsService from '../services/team.service';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamsService.getAll();
    return res.status(statusCodes.OK).json(teams);
  }
}
