import models from '../../models'
import { Op } from 'sequelize';

class GarbageService {
  async save(data) {
    return models.garbage.create(data)
  }

  async findById(id) {
    return models.garbage.findByPk(id)
  }

  async findAll(offset = 0, limit = 10) {
    return models.garbage.findAndCountAll({
      offset,
      limit
    })
  }

  async findAllByCategoryId(categoryId, offset = 0, limit = 10) {
    return models.garbage.findAndCountAll({
      where: {
        category_id: categoryId
      },
      offset,
      limit
    })
  }

  async findAllByGarbageInfo(keyword, offset = 0, limit = 10) {
    models.garbage.findAndCountAll({
      where: {
        garbage_info: {
          [Op.like]: `%${keyword}%`
        }
      },
      attributes: ['id', 'garbage_info'],
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
    return models.garbage.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.garbage.destroy({
      where: {
        id
      }
    })
  }
}

export default new GarbageService();
