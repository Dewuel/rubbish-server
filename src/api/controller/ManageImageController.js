import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs';
import ImageService from '@/api/service/ImageService';

class ManageImageController {
  async create(ctx) {
    const { file } = ctx.request.files
    const reader = fs.createReadStream(file.path)
    const filePath = path.join(`public/static/upload${dayjs().date()}${file.name}`)
    const write = fs.createWriteStream(filePath)
    reader.pipe(write)
    console.log(filePath)
  }

  async findAll(ctx) {
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }

    const list = await ImageService.findAllWithPage(toInt(offset) - 1, limit)
    ctx.body = ResultVo.success(list)
  }

  async delete(ctx) {
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await ImageService.delete(id)
    if (result < 1) {
      throw new HttpException(10014, errCode['10014'])
    }
    ctx.body = ResultVo.successNull()
  }
}

export default new ManageImageController()
