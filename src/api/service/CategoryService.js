const models = require('../../models')

class CategoryService {
  async save(data) {
    return models.category.create(data);
  }

  async findOne(id) {
    return models.category.findByPk(id);
  }

  async findByType(category_type) {
    return models.category.findOne({
      where: {
        category_type
      }
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.category.findAndCountAll({
      limit,
      offset
    })
  }

  async update(id, data) {
    return models.category.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.category.destroy({
      where: {
        id
      }
    })
  }
}

export default new CategoryService()
