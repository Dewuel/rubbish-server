import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';

const models = require('../../models')

class UserService {
  async save(data) {
    const { email, password } = data
    const name = Math.random().toString(32).substr(-4, 4)
    if (!email || !password) return ResultVo.fail(10000, errCode['10000'])
    return await models.user.create({ email, password, name });
  }

  async findById(id) {
    return models.user.findByPk(id);
  }

  async findByEmail(email) {
    return models.user.findOne({
      where: {
        email: email
      }
    });
  }

  async findAllUser(offset = 0, limit = 10) {
    return models.user.findAndCountAll({
      limit,
      offset
    })
  }

  async findByStatus(status, offset = 0, limit = 10) {
    return models.user.findAll({
      where: {
        user_status: status
      },
      limit,
      offset
    })
  }

  async updatePass(email, data) {
    return models.user.update(data, {
      where: {
        email
      }
    })
  }

  async updateUser(id, data) {
    return models.user.update(data, {
      where: {
        id
      }
    })
  }
}
export default new UserService();
