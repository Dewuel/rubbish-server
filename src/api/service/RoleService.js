import models from '../../models'

class RoleService {
  async save(data) {
    return models.role.create(data)
  }

  async findById(id) {
    return models.role.findByPk(id)
  }

  async findByRoleNum(roleNum) {
    return models.role.findOne({
      where: {
        role_num: roleNum
      }
    })
  }

  async findAll(offset = 0, limit = 0) {
    return models.role.findAndCountAll({
      offset,
      limit
    })
  }

  async update(id, data) {
    return models.role.update(data, {
      where: {
        id
      }
    })
  }

  async delete(id) {
    return models.role.destroy({
      where: {
        id
      }
    })
  }

  async findAllRole() {
    return models.role.findAll()
  }
}

export default new RoleService();
