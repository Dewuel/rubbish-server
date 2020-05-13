import { Op } from 'sequelize';

const models = require('../../models')

class DustbinService {
  async save(data) {
    return models.dustbin.create(data);
  }

  async findById(id) {
    return models.dustbin.findByPk(id)
  }

  async findByDeviceCode(deviceCode) {
    return models.dustbin.findOne({
      where: {
        device_code: deviceCode
      }
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.dustbin.findAndCountAll({
      offset,
      limit
    })
  }

  async update(id, data) {
    return models.dustbin.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.dustbin.destroy({
      where: {
        id
      }
    })
  }

  async findAllByEstate(estate) {
    return models.dustbin.findAndCountAll({
      where: {
        estate: {
          [Op.like]: `%${estate}%`
        }
      },
      offset: 0,
      limit: 10
    })
  }

  async findAllByDeviceCode(device_code) {
    return models.dustbin.findAndCountAll({
      where: {
        device_code
      },
      offset: 0,
      limit: 10
    })
  }
}

export default new DustbinService();
