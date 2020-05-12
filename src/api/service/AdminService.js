// import ResultVo from "@/utils/ResultVo";
// import {errCode} from "@/enums/enum";

const models = require('../../models')

class AdminService {
  async save(data) {
    return models.admin.create(data)
  }

  async findOne(id) {
    return models.admin.findByPk(id, {
      attributes: ['id', 'username', 'nickname', 'avatar', 'admin_status', 'createdAt']
    })
  }

  async findByUsername(username) {
    return models.admin.findOne({
      where: {
        username
      },
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ]
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ],
      attributes: ['id', 'username', 'nickname', 'avatar', 'admin_status', 'createdAt'],
      offset,
      limit
    })
  }

  async updateAdmin(username, data) {
    return models.admin.update(data, {
      where: {
        username
      },
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ]
    })
  }

  async delete(username) {
    return models.admin.destroy({
      where: {
        username
      }
    })
  }

  async findAllByStatus(adminStatus, offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      where: {
        admin_status: adminStatus
      },
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ],
      offset,
      limit
    })
  }

  async findAllByUsername(username, offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      where: {
        username,
      },
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ],
      attributes: ['id', 'username', 'nickname', 'avatar', 'admin_status', 'createdAt'],
      offset,
      limit
    })
  }

  async findAllByUserId(id, offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      where: {
        id
      },
      include: [
        {
          model: models.role,
          attributes: ['role_num', 'role_name']
        }
      ],
      attributes: ['id', 'username', 'nickname', 'avatar', 'admin_status', 'createdAt'],
      offset,
      limit
    })
  }
}

export default new AdminService()
