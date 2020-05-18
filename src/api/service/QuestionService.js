import models from '../../models'
import Sequelize from 'sequelize';

class QuestionService {
  async save(data) {
    return models.question.create(data)
  }

  async findById(id) {
    return models.question.findByPk(id)
  }

  async findAll(offset, limit) {
    return models.question.findAndCountAll({
      offset,
      limit
    })
  }

  async findAllById(id, offset, limit) {
    return models.question.findAndCountAll({
      where: {
        id
      },
      offset,
      limit
    })
  }

  async randomQuestion() {
    return models.question.findAll({
      order: [[Sequelize.literal('RAND()')]],
      limit: 10
    })
  }

  async update(id, data) {
    return models.question.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.question.destroy({
      where: {
        id
      }
    })
  }
}

export default new QuestionService();
