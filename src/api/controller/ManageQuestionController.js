import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import QuestionService from '@/api/service/QuestionService';

class ManageQuestionController {
  async create(ctx) {
    const { content, A, B, C, D, correct, describe, add_count } = ctx.request.body

    if (!content || !A || !B || !C || !D || !correct || !describe) {
      throw new HttpException(10000, errCode['10000'])
    }
    try {
      const result = await QuestionService.save({ content, A, B, C, D, correct, describe, add_count })
      ctx.body = ResultVo.success(result)
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
    const list = await QuestionService.findAll(toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async findById(ctx) {
    const { id } = ctx.request.query
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await QuestionService.findById(id)
    ctx.body = ResultVo.success(result)
  }

  async update(ctx) {
    const data = ctx.request.body
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await QuestionService.update(id, data)
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
    const result = await QuestionService.delete(id)
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async searchById(ctx) {
    let { id, offset, limit } = ctx.request.query
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await QuestionService.findAllById(id, toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(list)
  }

  async getQuestion(ctx) {
    const list = await QuestionService.randomQuestion()
    ctx.body = ResultVo.success(list)
  }
}

export default new ManageQuestionController();
