import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs';
import HotArticleService from '@/api/service/HotArticleService';

class ManageArticleController {
  async create(ctx) {
    const { title, description, origin, content } = ctx.request.body
    if (!title || !description || !origin || !content) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await HotArticleService.save({ title, description, origin, content })
    if (!result) {
      throw new HttpException(10001, errCode['10001'])
    }
    ctx.body = ResultVo.successNull()
  }
}

export default new ManageArticleController();
