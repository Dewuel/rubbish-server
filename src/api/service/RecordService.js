import models from '../../models'

class RecordService {
  async save(data) {
    return models.record.create(data)
  }

  async findById(id) {
    return models.record.findByPk(id, {
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
    })
  }

  async findAll(offset, limit) {
    return models.record.findAndCountAll({
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset,
      limit
    })
  }

  async findByUserId(userId, offset = 0, limit = 10) {
    return models.record.findAndCountAll({
      where: {
        user_id: userId
      },
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset,
      limit
    })
  }

  async findByRecordNum(recordNum) {
    return models.record.findOne({
      where: {
        record_num: recordNum
      },
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
    })
  }

  async findAllByRecordNum(recordNum) {
    return models.record.findAndCountAll({
      where: {
        record_num: recordNum
      },
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset: 0,
      limit: 10
    })
  }

  async findByDustbinId(dustbinId, offset = 0, limit = 10) {
    return models.record.findAndCountAll({
      where: {
        dustbin_id: dustbinId
      },
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset,
      limit
    })
  }

  async findAllByCategory(categoryId, offset = 0, limit = 10) {
    return models.record.findAndCountAll({
      where: {
        category_id: categoryId
      },
      include: [
        {
          model: models.user,
          attributes: ['email']
        },
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      offset,
      limit
    })
  }

  async update(data, id) {
    return models.record.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.record.destroy({
      where: {
        id
      }
    });
  }

  async findAllByEmail(userId, offset, limit) {
    return models.record.findAndCountAll({
      where: {
        userId
      },
      include: [
        {
          model: models.dustbin,
          attributes: ['device_code']
        },
        {
          model: models.category,
          attributes: ['category_name']
        }
      ],
      limit,
      offset,
    })
  }
}

export default new RecordService();
