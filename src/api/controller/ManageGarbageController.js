import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import GarbageService from '@/api/service/GarbageService';

class ManageGarbageController {
  async create(ctx) {
    const { category_id, garbage_info } = ctx.request.body
    if (!category_id || !garbage_info) {
      throw new HttpException(10000, errCode['10000'])
    }
    try {
      const info = await GarbageService.save({ categoryId: category_id, garbage_info })
      ctx.body = ResultVo.success(info)
    } catch (e) {
      throw new HttpException(10001, e)
    }
  }

  async findAll(ctx) {
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    try {
      const list = await GarbageService.findAll(toInt(offset) - 1, toInt(limit))
      ctx.body = ResultVo.success(list)
    } catch (e) {
      throw new HttpException(10016, errCode['10016'])
    }
  }

  async update(ctx) {
    const { id } = ctx.params
    const data = ctx.request.body
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await GarbageService.update(id, data)
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async delete(ctx) {
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await GarbageService.delete(id)
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async searchById(ctx) {
    const { id } = ctx.request.query
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    try {
      const list = await GarbageService.findAllById(id)
      ctx.body = ResultVo.success(list)
    } catch (e) {
      throw new HttpException(10016, errCode['10016'])
    }
  }

  async searchByCategory(ctx) {
    let { category_id, offset, limit } = ctx.request.query
    if (!category_id) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    try {
      const list = await GarbageService.findAllByCategoryId(category_id, toInt(offset) - 1, toInt(limit))
      ctx.body = ResultVo.success(list)
    } catch (e) {
      throw new HttpException(10016, errCode['10016'])
    }
  }

  async findById(ctx) {
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await GarbageService.findById(id)
    ctx.body = ResultVo.success(result)
  }
}

export default new ManageGarbageController()
