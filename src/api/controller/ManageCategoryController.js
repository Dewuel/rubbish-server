import CategoryService from '@/api/service/CategoryService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';

class ManageCategoryController {
  async createCategory(ctx) {
    const { body } = ctx.request
    const info = await CategoryService.save(body)
    if (!info) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return
    }
    ctx.body = ResultVo.success(info)
  }

  async updateCategory(ctx) {
    const { id } = ctx.params
    const { body } = ctx.request

    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const result = await CategoryService.update(toInt(id), body)
    if (result < 1) {
      ctx.body = ResultVo.fail(10013, errCode['10013'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async findAllCategory(ctx) {
    const { offset } = ctx.request.query
    const list = await CategoryService.findAll(toInt(offset) - 1)
    ctx.body = ResultVo.success(list)
  }

  async deleteCategory(ctx) {
    const { id } = ctx.params

    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const result = await CategoryService.delete(id)

    if (result < 1) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    ctx.body = ResultVo.successNull()
  }

  async searchCategoryByName(ctx) {
    const { category_name } = ctx.request.query

    if (!category_name) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    const list = await CategoryService.findAllByName(category_name)
    ctx.body = ResultVo.success(list)
  }

  async searchCategoryByType(ctx) {
    const { category_type } = ctx.request.query

    if (!category_type) {
      ctx.body = ResultVo.fail(10014, errCode['10014'])
      return
    }
    const list = await CategoryService.findAllByType(category_type)
    ctx.body = ResultVo.success(list)
  }

  async findCategoryById(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return
    }
    const category = await CategoryService.findOne(id)
    ctx.body = ResultVo.success(category)
  }
}

export default new ManageCategoryController();
