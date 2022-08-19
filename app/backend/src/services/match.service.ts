import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import ICreateMatchDTO from '../interfaces/ICreateMatchDTO.interface';
import Team from '../database/models/team';
import Match from '../database/models/match';

export default class MatchesService {
  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getAllInProgress() {
    const matches = await Match.findAll({
      where: { inProgress: true },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getAllFinished() {
    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async verifyIfTeamExists(teamId: string) {
    const team = await Team.findByPk(teamId);

    if (!team) throw new CustomError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
  }

  static async create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: ICreateMatchDTO) {
    await Promise.all([this.verifyIfTeamExists(homeTeam), this.verifyIfTeamExists(awayTeam)]);

    const match = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });

    return match;
  }

  static async updateProgressToFalse(id: string) {
    const match = await Match.findByPk(id);

    if (!match) throw new CustomError(StatusCodes.NOT_FOUND, 'Match not found');

    await Match.update({ inProgress: false }, { where: { id } });
  }
}
