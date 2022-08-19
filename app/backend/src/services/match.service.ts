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
}
