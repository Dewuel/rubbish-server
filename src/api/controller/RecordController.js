import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { randomRecord, toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import RecordService from '@/api/service/RecordService';

class RecordController {
  async create(ctx) {
    const payload = ctx.state.user
    const { room_num, estate, dustbinId, categoryId } = ctx.request.body
    if (!room_num || !estate || !dustbinId || !categoryId) {
      throw new HttpException(10000, errCode['10000'])
    }
    const record_num = randomRecord()
    const userId = payload.id

    try {
      const result = await RecordService.save({ userId, record_num, estate, dustbinId, room_num, categoryId })
      ctx.body = ResultVo.success(result)
    } catch (e) {
      throw new HttpException(10001, errCode['10001'])
    }
  }

  async recordList(ctx) {
    const { id } = ctx.state.user
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await RecordService.findAllByEmail(id, toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async categoryList(ctx) {
    let { categoryId, offset, limit } = ctx.request.query
    if (!categoryId) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const result = await RecordService.findAllByCategory(categoryId, toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(result)
  }
}

export default new RecordController();
