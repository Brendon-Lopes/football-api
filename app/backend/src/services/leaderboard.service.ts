import formatLeaderboardAwayData, { ILeaderboardAwayData } from '../helpers/leaderboardAway.helper';
import formatLeaderboardData, { ILeaderboardData } from '../helpers/leaderboardHome.helper';
import Match from '../database/models/match';
import Team from '../database/models/team';

export default class LeaderboardService {
  static async getAllHome() {
    const result = await Team.findAll({
      attributes: ['teamName'],
      include: [
        {
          model: Match,
          as: 'teamHome',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false },
        },
      ],
    });

    const formatedResult = formatLeaderboardData(result as unknown as ILeaderboardData[]);

    return formatedResult;
  }

  static async getAllAway() {
    const result = await Team.findAll({
      attributes: ['teamName'],
      include: [
        {
          model: Match,
          as: 'teamAway',
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
          where: { inProgress: false },
        },
      ],
    });

    const formatedResult = formatLeaderboardAwayData(result as unknown as ILeaderboardAwayData[]);

    return formatedResult;
  }
}
