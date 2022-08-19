import Team from '../database/models/team';

export default class TeamsService {
  static async getAll() {
    const teams = await Team.findAll();
    return teams;
  }
}
