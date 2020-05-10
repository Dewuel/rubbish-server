import models from '../../models'

class IntegralService {
  async save(data) {
    return models.integral.create(data)
  }

  async findById(id) {
    return models.integral.findByPk(id)
  }

  async findAll(offset = 0, limit = 10) {
    return models.integral.findAndCountAll({
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
    return models.integral.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.integral.destroy({
      where: {
        id
      }
    })
  }
}

export default new IntegralService();
