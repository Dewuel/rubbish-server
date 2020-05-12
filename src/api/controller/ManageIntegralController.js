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
}

export default new ManageIntegralController();
