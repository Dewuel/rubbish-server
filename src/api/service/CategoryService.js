const models = require('../../models')

class CategoryService {
  async save(data) {
    return models.category.create(data);
  }

  async findOne(id) {
    return models.category.findByPk(id);
  }

  async findByType(categoryType) {
    return models.category.findOne({
      where: {
        category_type: categoryType
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

  async findAllByType(category_type, offset = 0, limit = 10) {
    return models.category.findAndCountAll({
      where: {
        category_type
      },
      offset,
      limit
    })
  }

  async findAllByName(category_name, offset = 0, limit = 10) {
    return models.category.findAndCountAll({
      where: {
        category_name
      },
      limit,
      offset
    })
  }
}

export default new CategoryService()
