// import ResultVo from '@/utils/ResultVo';
// import { errCode } from '@/enums/enum';

const models = require('../../models')

class UserService {
  async save(data) {
    const { email, password } = data
    const name = Math.random().toString(32).substr(-4, 4)
    return await models.user.create({ email, password, name });
  }

  async findById(id) {
    return models.user.findByPk(id, {
      attributes: ['id', 'gender', 'name', 'email', 'integral_count', 'address',
        'tel', 'user_status', 'avatar', 'createdAt']
    });
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
      offset,
      limit,
      attributes: ['id', 'gender', 'name', 'email', 'integral_count', 'address',
        'tel', 'user_status', 'avatar', 'createdAt']
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

  async updateUser(email, data) {
    return models.user.update(data, {
      where: {
        email
      }
    })
  }

  async delete(email) {
    return models.user.destroy({
      where: {
        email
      }
    })
  }

  async findAllByEmail(email, offset = 0, limit = 10) {
    return models.user.findAndCountAll({
      where: {
        email
      },
      attributes: ['id', 'gender', 'name', 'email', 'integral_count', 'address',
        'tel', 'user_status', 'avatar', 'createdAt'],
      offset,
      limit
    })
  }

  async findAllById(id, offset = 0, limit = 10) {
    return models.user.findAndCountAll({
      where: {
        id
      },
      attributes: ['id', 'gender', 'name', 'email', 'integral_count', 'address',
        'tel', 'user_status', 'avatar', 'createdAt'],
      offset,
      limit
    })
  }
}
export default new UserService();
