import DustbinService from '@/api/service/DustbinService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { randomNum, toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';

class ManageDustbinController {
  async create(ctx) {
    const { estate, category_id, address } = ctx.request.body
    console.log(estate, category_id, address)
    if (!estate || !address || !category_id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const device_code = randomNum()
    const info = await DustbinService.save({ estate, device_code, address, categoryId: category_id })
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async findAll(ctx) {
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await DustbinService.findAll(toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async update(ctx) {
    const { id } = ctx.params
    const data = ctx.request.body
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const result = await DustbinService.update(id, data)
    if (result < 1) {
      ctx.body = ResultVo.fail(10013, errCode['10013'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async delete(ctx) {
    const { id } = ctx.params
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const result = await DustbinService.delete(id)
    if (result < 1) {
      ctx.body = ResultVo.fail(10014)
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async searchByEstate(ctx) {
    const { estate } = ctx.request.query
    if (!estate) {
      // ctx.body = ResultVo.fail(10000, errCode['10000'])
      throw new HttpException(10000, errCode['10000'])
    }

    const result = await DustbinService.findAllByEstate(estate)
    ctx.body = ResultVo.success(result)
  }

  async searchByDevice(ctx) {
    const { device_code } = ctx.request.query
    if (!device_code) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await DustbinService.findAllByDeviceCode(device_code)
    ctx.body = ResultVo.success(result)
  }

  async findById(ctx) {
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await DustbinService.findById(id)
    ctx.body = ResultVo.success(result)
  }
}

export default new ManageDustbinController()
