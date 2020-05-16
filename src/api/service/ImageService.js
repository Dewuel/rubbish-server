import models from '../../models'

class ImageService {
  async save(data) {
    return models.image.create(data)
  }

  async findById(id) {
    return models.image.findByPk(id)
  }

  async findAll() {
    return models.image.findAll()
  }

  async findAllWithPage(offset, limit) {
    return models.image.findAndCountAll({
      offset,
      limit
    })
  }

  async update(id, data) {
    return models.image.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.image.destroy({
      where: {
        id
      }
    })
  }
}

export default new ImageService();
