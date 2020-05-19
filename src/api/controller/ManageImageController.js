import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import { toInt } from '@/utils/Utils';
import { HttpException } from '@/exception/ResultException';
import ImageService from '@/api/service/ImageService';
import config from '@/config'
import { upload } from '@/utils/upload';

class ManageImageController {
  async create(ctx) {
    const { file } = ctx.request.files
    // const reader = fs.createReadStream(file.path)
    // const filePath = path.join(`public/static/upload/${genFileName()}.${file.name.split('.')[1]}`)
    // const write = fs.createWriteStream(filePath)
    // reader.pipe(write)
    // const url = path.join('/static/upload', path.basename(filePath))
    // const _img = url.replace(/\\/g, '/')
    const image = upload(file)
    console.log(image)
    try {
      const result = await ImageService.save({ url: image })
      ctx.body = ResultVo.success(result)
    } catch (e) {
      throw new HttpException(10001, errCode['10001'])
    }
  }

  async findAll(ctx) {
    let { offset, limit } = ctx.request.query
    console.log(offset, limit)
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await ImageService.findAllWithPage(toInt(offset) - 1, toInt(limit))
    // const response = {
    //   data: list,
    //   baseUrl: config.baseUrl
    // }
    list.baseUrl = config.baseUrl
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
