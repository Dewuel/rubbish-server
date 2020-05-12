import UserService from '@/api/service/UserService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';

class ManageUserController {
  async findAllUser(ctx) {
    const { offset, limit } = ctx.request.query
    const list = await UserService.findAllUser(toInt(offset - 1), toInt(limit))
    if (!list) {
      ctx.body = ResultVo.fail(10016, errCode['10016'])
      return
    }
    ctx.body = ResultVo.success(list)
  }

  async deleteUser(ctx) {
    const payload = ctx.state.user
    const id = ctx.params.id

    if (payload.role_num !== 'ROLE_SUPER') {
      ctx.body = ResultVo.fail(10009, errCode['10009'])
      return
    }

    const result = await UserService.delete(id)
    if (result < 1) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async searchByEmail(ctx) {
    const { email } = ctx.request.query

    if (!email) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const info = await UserService.findAllByEmail(email)
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
    const info = await UserService.findAllById(id)
    if (!info) {
      ctx.body = ResultVo.fail(10016, errCode['10016'])
      return
    }
    ctx.body = ResultVo.success(info)
  }
}
export default new ManageUserController();
