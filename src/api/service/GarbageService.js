import models from '../../models'
import { Op } from 'sequelize';

class GarbageService {
  async save(data) {
    return models.garbage.create(data)
  }

  async findById(id) {
    return models.garbage.findByPk(id, {
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.garbage.findAndCountAll({
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

  async findAllById(id) {
    return models.garbage.findAndCountAll({
      where: {
        id
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

  async findAllByCategoryId(categoryId, offset = 0, limit = 10) {
    return models.garbage.findAndCountAll({
      where: {
        category_id: categoryId
      },
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

  async findByGarbage(keyword) {
    models.garbage.findAll({
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
