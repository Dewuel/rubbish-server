import models from '../../models';
import { Op } from 'sequelize';

class HotArticleService {
  async save(data) {
    return models.hot_article.create(data);
  }

  async findById(id) {
    return models.hot_article.findByPk(id)
  }

  async findAll(offset = 0, limit = 0) {
    return models.hot_article.findAndCountAll({
      offset,
      limit
    })
  }

  async findAllByTitle(title, offset = 0, limit = 10) {
    return models.hot_article.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      },
      offset,
      limit
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
}

export default new HotArticleService();
