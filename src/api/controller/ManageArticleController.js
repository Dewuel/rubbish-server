import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { genFileName, toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import HotArticleService from '@/api/service/HotArticleService';
import fs from 'fs'
import path from 'path'

class ManageArticleController {
  async create(ctx) {
    const { title, description, origin, content } = ctx.request.body
    const { file } = ctx.request.files
    if (!title || !description || !origin || !content) {
      throw new HttpException(10000, errCode['10000'])
    }
    const reader = fs.createReadStream(file.path)
    const filePath = path.join('public/static/upload', `/${genFileName()}.${file.name.split('.')[1]}`)
    const write = fs.createWriteStream(filePath)
    reader.pipe(write)
    const url = path.join('/static/upload', path.basename(filePath))
    const image = url.replace(/\\/g, '/')
    const result = await HotArticleService.save({ title, image, description, origin, content })
    if (!result) {
      throw new HttpException(10001, errCode['10001'])
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
    const list = await HotArticleService.findAll(toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async update(ctx) {
    const { id } = ctx.params
    const data = ctx.request.body
    const { file } = ctx.request.files
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    let result;
    if (file) {
      const reader = fs.createReadStream(file.path)
      const filePath = path.join('public/static/upload', `/${genFileName()}.${file.name.split('.')[1]}`)
      const write = fs.createWriteStream(filePath)
      reader.pipe(write)
      const url = path.join('/static/upload', path.basename(filePath))
      data.image = url.replace(/\\/g, '/')
      result = await HotArticleService.update(id, data)
    } else {
      result = await HotArticleService.update(id, data)
    }

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
    const result = await HotArticleService.delete(id)
    console.log(id, result)
    if (result < 1) {
      throw new HttpException(10014, errCode['10014'])
    }
    ctx.body = ResultVo.successNull()
  }

  async searchAllById(ctx) {
    const { id } = ctx.request.query
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }

    const list = await HotArticleService.findAllById(id)
    ctx.body = ResultVo.success(list)
  }

  async searchByTitle(ctx) {
    let { title, offset, limit } = ctx.request.query
    if (!title) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await HotArticleService.findAllByTitle(title, toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async findById(ctx) {
    const { id } = ctx.params

    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await HotArticleService.findById(id)
    ctx.body = ResultVo.success(result)
  }
}

export default new ManageArticleController();
