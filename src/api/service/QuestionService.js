import models from '../../models'

class QuestionService {
  async save(data) {
    return models.question.create(data)
  }

  async findById(id) {
    return models.question.findByPk(id)
  }

  async findAll(offset = 0, limit = 10) {
    return models.question.findAndCountAll({
      offset,
      limit
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
