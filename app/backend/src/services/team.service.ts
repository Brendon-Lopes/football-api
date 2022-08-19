import statusCodes from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import Team from '../database/models/team';

export default class TeamsService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }

  static async getById(id: number) {
    const team = await Team.findOne({ where: { id } });

    if (team === null) {
      throw new CustomError(statusCodes.NOT_FOUND, 'Team not found');
    }

    return team;
  }
}
