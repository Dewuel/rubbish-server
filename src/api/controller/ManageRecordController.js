import RecordService from '@/api/service/RecordService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';

class ManageRecordController {
  async findAll(ctx) {
    let { offset, limit } = ctx.request.query

    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await RecordService.findAll(toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async update(ctx) {
    const payload = ctx.state.user
    const { id } = ctx.params
    const data = ctx.request.body
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (payload.role_num !== 'ROLE_SUPER') {
      throw new HttpException(10009, errCode['10009'])
    }
    const result = await RecordService.update(data, id)
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async delete(ctx) {
    const { id } = ctx.params
    const payload = ctx.state.user
    if (payload.role_num !== 'ROLE_SUPER') {
      throw new HttpException(10009, errCode['10009'])
    }
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await RecordService.delete(id)
    if (result < 1) {
      throw new HttpException(10014, errCode['10014'])
    }
    ctx.body = ResultVo.successNull()
  }

  async findAllByRecordNum(ctx) {
    const { record_num } = ctx.request.query
    if (!record_num) {
      throw new HttpException(10000, errCode['10000'])
    }
    const list = await RecordService.findAllByRecordNum(record_num)
    ctx.body = ResultVo.success(list)
  }

  async findAllByCategory(ctx) {
    let { category_id, offset, limit } = ctx.request.query
    if (!category_id) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (!offset) {
      offset = 0
    }
    if (!limit) {
      limit = 10
    }
    const list = await RecordService.findAllByCategory(category_id, toInt(offset), toInt(limit))
    ctx.body = ResultVo.success(list)
  }
}

export default new ManageRecordController();
