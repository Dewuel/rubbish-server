import { Op } from 'sequelize';
import models from '../../models'

class DustbinService {
  async save(data) {
    return models.dustbin.create(data);
  }

  async findById(id) {
    return models.dustbin.findByPk(id, {
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ]
    })
  }

  async findByDeviceCode(deviceCode) {
    return models.dustbin.findOne({
      where: {
        device_code: deviceCode
      },
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ]
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.dustbin.findAndCountAll({
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset,
      limit
    })
  }

  async update(id, data) {
    return models.dustbin.update(data, {
      where: {
        id
      },
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
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset: 0,
      limit: 10
    })
  }

  async findAllByDeviceCode(device_code) {
    return models.dustbin.findAndCountAll({
      where: {
        device_code
      },
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset: 0,
      limit: 10
    })
  }
}

export default new DustbinService();
