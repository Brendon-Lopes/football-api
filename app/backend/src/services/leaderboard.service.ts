import formatLeaderboardData, { ILeaderboardData } from '../helpers/leaderboard.helper';
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
}
