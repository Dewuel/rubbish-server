import models from '../../models';
import { Op } from 'sequelize';

class HotArticleService {
  async save(data) {
    return models.hot_article.create(data);
  }

  async findById(id) {
    return models.hot_article.findByPk(id)
  }

  async findAll(offset, limit) {
    return models.hot_article.findAndCountAll({
      offset,
      limit,
      order: [['id', 'DESC']]
    })
  }

  async findAllByTitle(title, offset, limit) {
    return models.hot_article.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${title}`
        }
      },
      offset,
      limit
    })
  }

  async findAllById(id) {
    return models.hot_article.findAndCountAll({
      where: {
        id
      },
      offset: 0,
      limit: 10,
    })
  }

  async update(id, data) {
    return models.hot_article.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.hot_article.destroy({
      where: {
        id
      }
    })
  }

  async stick(id) {
    return models.hot_article.update({ stick: 1 }, {
      where: {
        id
      }
    })
  }

  async disStick(id) {
    return models.hot_article.update({ stick: 0 }, {
      where: {
        id
      }
    })
  }

  async getAllByStick() {
    return models.hot_article.findAll({
      where: {
        stick: 1
      },
      limit: 10,
      order: [['id', 'DESC']]
    })
  }
}

export default new HotArticleService();
