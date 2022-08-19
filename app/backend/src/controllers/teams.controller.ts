import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import TeamsService from '../services/team.service';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamsService.getAll();
    return res.status(statusCodes.OK).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(Number(id));
    return res.status(statusCodes.OK).json(team);
  }
}
