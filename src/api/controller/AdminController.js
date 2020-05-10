import AdminService from '@/api/service/AdminService';
import bcrypt from 'bcrypt'
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { genToken, getJWTPayload } from '@/utils/Utils';

class AdminController {
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
      avatarUrl: info.avatar,
      role: info.role,
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
    const { username, password, role_id } = ctx.request.body

    if (role_num !== 'ROLE_SUPER') {
      ctx.body = ResultVo.fail(10009, errCode['10009'])
      return
    }

    if (!username || !password) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const _password = bcrypt.hashSync(password, salt)
    const info = await AdminService.save({ username, role_id, password: _password })
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return
    }
    ctx.body = ResultVo.successNull()
  }
}

export default new AdminController();
