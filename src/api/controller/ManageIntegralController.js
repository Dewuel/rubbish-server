import IntegralService from '@/api/service/IntegralService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';

class ManageIntegralController {
  async create(ctx) {
    const { category_id, integral_base } = ctx.request.body

    const info = await IntegralService.save({ categoryId: category_id, integral_base: toInt(integral_base) })
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async findAll(ctx) {
    let { offset, limit } = ctx.request.query

    if (!offset) {
      offset = 0
    }
    if (!limit) {
      limit = 10
    }
    const list = await IntegralService.findAll(toInt(offset), toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async updateIntegral(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const data = ctx.request.body

    const result = await IntegralService.update(id, data)
    if (result < 1) {
      ctx.body = ResultVo.fail(10013, errCode['10013'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async deleteIntegral(ctx) {
    const { id } = ctx.params

    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const result = await IntegralService.delete(id)
    if (result < 0) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async searchById(ctx) {
    const { id } = ctx.request.query
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const list = await IntegralService.findAllById(id)
    ctx.body = ResultVo.success(list)
  }

  async searchByCategory(ctx) {
    const { category_id } = ctx.request.query
    if (!category_id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const list = await IntegralService.findAllById(category_id)
    ctx.body = ResultVo.success(list)
  }
}

export default new ManageIntegralController();
