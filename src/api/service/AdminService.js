// import ResultVo from "@/utils/ResultVo";
// import {errCode} from "@/enums/enum";

const models = require('../../models')

class AdminService {
  async save(data) {
    return models.admin.create(data)
  }

  async findOne(id) {
    return models.admin.findByPk(id)
  }

  async findByUsername(username) {
    return models.admin.findOne({
      where: {
        username
      }
    })
  }

  async findAll(offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      offset,
      limit
    })
  }

  async updateAdmin(username, data) {
    return models.admin.update(data, {
      where: {
        username
      }
    })
  }

  async delete(username) {
    return models.admin.destroy({
      where: {
        username
      }
    })
  }

  async findAllByStatus(admin_status, offset = 0, limit = 10) {
    return models.admin.findAndCountAll({
      where: {
        admin_status
      },
      offset,
      limit
    })
  }

}

export default new AdminService()
