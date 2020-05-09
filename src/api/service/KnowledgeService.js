import models from '../../models'

models.knowledge.belongsTo(models.category, { foreignKey: 'category_id' })

class KnowledgeService {
  async save(data) {
    return models.knowledge.create(data);
  }

  async findById(id) {
    return models.knowledge.findByPk(id, {
      include: [
        {
          model: models.category,
          attributes: ['category_name']
        }
      ]
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.knowledge.findAndCountAll({
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

  async findByCategoryId(categoryId, offset = 0, limit = 10) {
    return models.knowledge.findAndCountAll({
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

  async update(id, data) {
    return models.knowledge.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.knowledge.destroy({
      where: {
        id
      }
    })
  }
}

export default new KnowledgeService();
