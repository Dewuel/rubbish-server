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
}

export default new DustbinService();
