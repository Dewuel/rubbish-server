import AdminService from '@/api/service/AdminService';
import RoleService from '@/api/service/RoleService';
import bcrypt from 'bcrypt'
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { genToken, getJWTPayload } from '@/utils/Utils';
import config from '../../config'
import { upload } from '@/utils/upload';

class ManageAdminController {
  async login(ctx) {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const info = await AdminService.findByUsername(username)
    if (!info) {
      ctx.body = ResultVo.fail(10007, errCode['10007'])
      return
    }
    if (!bcrypt.compareSync(password, info.password)) {
      ctx.body = ResultVo.fail(10007, errCode['10007'])
      return
    }
    const token = genToken({ id: info.id, username: info.username, role_num: info.role.role_num })
    const response = {
      id: info.id,
      username: info.username,
      nickname: info.nickname,
      avatarUrl: info.avatar,
      role: info.role,
      domain: config.baseUrl,
      token,
    }
    ctx.body = ResultVo.success(response)
  }

  async addAdmin(ctx) {
    const auth = ctx.request.headers['authorization']
    let role_num;
    try {
      const role = getJWTPayload(auth);
      role_num = role.role_num
    } catch (e) {
      ctx.body = ResultVo.fail(10010, errCode['10010'])
    }
    if (role_num !== 'ROLE_SUPER') {
      ctx.body = ResultVo.fail(10009, errCode['10009'])
      return
    }

    const { username, password, nickname } = ctx.request.body
    if (!username || !password) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const user = await AdminService.findByUsername(username);
    if (user) {
      ctx.body = ResultVo.fail(10008, errCode['10008'])
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const _password = bcrypt.hashSync(password, salt)
    const info = await AdminService.save({ username, roleId: 2, password: _password, nickname })
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async addRole(ctx) {
    const auth = ctx.request.headers['authorization']
    let role_num;
    try {
      const role = getJWTPayload(auth);
      role_num = role.role_num
    } catch (e) {
      ctx.body = ResultVo.fail(10010, e)
    }

    if (role_num !== 'ROLE_SUPER') {
      ctx.body = ResultVo.fail(10009, errCode['10009'])
    }

    const data = ctx.request.body
    const info = await RoleService.save(data)
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
    }
    ctx.body = ResultVo.success(info)
  }

  async deleteAdmin(ctx) {
    const name = ctx.params.id
    const payload = ctx.state.user
    const { username, role_num } = payload

    if (role_num !== 'ROLE_SUPER') {
      ctx.body = ResultVo.fail(10009, errCode['10009'])
      return
    }
    if (name === username) {
      ctx.body = ResultVo.fail(10012, errCode['10012'])
      return
    }

    const info = await AdminService.delete(name)
    if (info < 1) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async changePassword(ctx) {
    const payload = ctx.state.user;
    const { password, newPassword, rePassword } = ctx.request.body
    if (!password || !rePassword || !newPassword) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const info = await AdminService.findByUsername(payload.username);
    if (!info || !bcrypt.compareSync(password, info.password)) {
      ctx.body = ResultVo.fail(10007, errCode['10007'])
      return
    }
    if (newPassword !== rePassword) {
      ctx.body = ResultVo.fail(10005, errCode['10005'])
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const _password = bcrypt.hashSync(rePassword, salt)
    console.log(_password)
    const update = await AdminService.updateAdmin(payload.username, { password: _password })
    console.log(update[0])
    if (update[0] < 1) {
      ctx.body = ResultVo.fail(10011, errCode['10011'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async adminList(ctx) {
    const { offset, limit } = ctx.request.query;
    let list;
    if (offset) {
      if (limit) {
        list = await AdminService.findAll(offset - 1, limit)
      } else {
        list = await AdminService.findAll(offset - 1)
      }
    } else {
      list = await AdminService.findAll()
    }
    ctx.body = ResultVo.success(list)
  }

  async adminFindOne(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const admin = await AdminService.findOne(id)
    ctx.body = ResultVo.success(admin)
  }

  async updateAdmin(ctx) {
    const { username } = ctx.params
    const data = ctx.request.body

    if (!username || !data) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const res = await AdminService.updateAdmin(username, data)
    if (res[0] < 1) {
      ctx.body = ResultVo.fail(10013, errCode['10013'])
      return
    }

    ctx.body = ResultVo.successNull()
  }

  async getUserInfo(ctx) {
    const payload = ctx.state.user;
    const info = await AdminService.findByUsername(payload.username)
    const response = {
      id: info.id,
      username: info.username,
      nickname: info.nickname,
      avatar: info.avatar,
      role: info.role,
      admin_status: info.admin_status,
      domain: config.baseUrl
    }
    ctx.body = ResultVo.success(response)
  }

  async uploadAvatar(ctx) {
    const file = await ctx.request.files.file
    const payload = ctx.state.user

    const _avatar = upload(file)
    const info = await AdminService.updateAdmin(payload.username, { avatar: _avatar })
    if (info < 1) {
      ctx.body = ResultVo.fail(10015, errCode['10015'])
      return
    }
    const response = {
      domain: config.baseUrl,
      image: _avatar
    }
    ctx.body = ResultVo.success(response)
  }

  async searchByUsername(ctx) {
    const { username } = ctx.request.query

    if (!username) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const info = await AdminService.findAllByUsername(username)
    if (!info) {
      ctx.body = ResultVo.fail(10016, errCode['10016'])
      return
    }
    ctx.body = ResultVo.success(info)
  }

  async searchById(ctx) {
    const { id } = ctx.request.query

    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const info = await AdminService.findAllByUserId(id)
    if (!info) {
      ctx.body = ResultVo.fail(10016, errCode['10016'])
      return
    }
    ctx.body = ResultVo.success(info)
  }
}

export default new ManageAdminController();
