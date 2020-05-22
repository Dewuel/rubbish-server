import UserService from '@/api/service/UserService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import bcrypt from 'bcrypt';
import send from '@/config/MailConfig';
import dayjs from 'dayjs';
import { setValue } from '@/config/RedisConfig';
import { checkCode, randomRecord, toInt } from '@/utils/Utils';
import jsonwebtoken from 'jsonwebtoken';
import config from '../../config'
import { HttpException } from '@/exception/ResultException';
import RecordService from '@/api/service/RecordService';
import { upload } from '@/utils/upload';
import HotArticleService from '@/api/service/HotArticleService';
import ImageService from '@/api/service/ImageService';
import DustbinService from '@/api/service/DustbinService';
import CategoryService from '@/api/service/CategoryService';
import QuestionService from '@/api/service/QuestionService';
import GarbageService from '@/api/service/GarbageService';
import Validate from '@/validate/Validate';

class UserController {
  async getCode(ctx) {
    const { body } = ctx.request;
    const code = Math.random().toString(32).substr(-4, 4).toUpperCase();
    try {
      const result = await send({
        code,
        expire: dayjs().add(10, 'minute'),
        email: body.email
      })
      setValue(body.email, code, 60 * 10)
      ctx.body = ResultVo.success(result)
    } catch (e) {
      throw new HttpException(10017, errCode['10017'])
    }
  }

  async register(ctx) {
    const body = ctx.request.body;
    const { email, password, code } = body
    if (!email || !password || !code) {
      ctx.body = ResultVo.fail(10000, errCode['10000'])
      return;
    }
    const bool = await checkCode(email, code)
    if (!bool) {
      ctx.body = ResultVo.fail(10003, errCode['10003'])
      return
    }
    const user = await UserService.findByEmail(email);
    if (user) {
      ctx.body = ResultVo.fail(10002, errCode['10002'])
      return
    }
    const salt = bcrypt.genSaltSync(10)
    const _password = bcrypt.hashSync(password, salt);
    const response = await UserService.save({ email, password: _password });
    if (!response) {
      ctx.body = ResultVo.fail(10001, errCode['10001'])
      return;
    }
    ctx.body = ResultVo.successNull()
  }

  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await UserService.findByEmail(email);
    if (bcrypt.compare(password, user.password)) {
      const token = jsonwebtoken.sign({
        id: user.id,
        name: user.name,
        email: user.email
      }, config.JWT_SECRET, { expiresIn: 864000 })
      const response = {
        id: user.id,
        email: user.email,
        gender: user.gender,
        name: user.name,
        integral_count: user.integral_count,
        address: user.address,
        tel: user.tel,
        avatar: user.avatar,
        token,
      }
      ctx.body = ResultVo.success(response)
    }
  }

  async changePass(ctx) {
    const { email, oldPassword, newPassword, rePassword } = ctx.request.body;
    if (!oldPassword || !newPassword || !rePassword) {
      ctx.body = ResultVo.fail(10000, errCode[10000])
      return
    }

    if (newPassword !== rePassword) {
      ctx.body = ResultVo.fail(10005, errCode[10005])
      return
    }

    const user = await UserService.findByEmail(email)
    if (!bcrypt.compare(oldPassword, user.password)) {
      ctx.body = ResultVo.fail(10006, errCode[10006])
      return
    }
    const salt = bcrypt.genSaltSync(10);
    const cryptPass = bcrypt.hashSync(newPassword, salt)
    const res = await UserService.updatePass(email, { password: cryptPass })
    if (res < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async changeUserInfo(ctx) {
    const { email } = ctx.state.user;
    const { body } = ctx.request;

    const res = await UserService.updateUser(email, body)
    if (res < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async getUserInfo(ctx) {
    const { id } = ctx.state.user
    const result = await UserService.findById(id)
    ctx.body = ResultVo.success(result)
  }

  async changeAvatar(ctx) {
    const { file } = ctx.request.files;
    const { email } = ctx.state.user
    const image = upload(file)
    const result = await UserService.updateUser(email, { avatar: image })
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async getRecord(ctx) {
    const { id } = ctx.state.user
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const list = await RecordService.findByUserId(id, toInt(offset) - 1, limit)
    ctx.body = ResultVo.success(list)
  }

  async getNewArticles(ctx) {
    const result = await HotArticleService.getAllByStick()
    ctx.body = ResultVo.success(result)
  }

  async getHotNews(ctx) {
    let { offset, limit } = ctx.request.query
    if (!offset) {
      offset = 1
    }
    if (!limit) {
      limit = 10
    }
    const result = await HotArticleService.findAll(toInt(offset) - 1, toInt(limit))
    ctx.body = ResultVo.success(result)
  }

  async getSwiper(ctx) {
    const result = await ImageService.findAll()
    ctx.body = ResultVo.success(result)
  }

  async getDustbin(ctx) {
    const result = await DustbinService.findAllNoPage()
    ctx.body = ResultVo.success(result)
  }

  async getCategory(ctx) {
    const result = await CategoryService.findAllCategory()
    ctx.body = ResultVo.success(result)
  }

  async getQuestion(ctx) {
    const result = await QuestionService.randomQuestion()
    ctx.body = await ResultVo.success(result)
  }

  async addIntegral(ctx) {
    const { email } = ctx.state.user
    const { count } = ctx.request.body
    if (!count) {
      throw new HttpException(10000, errCode['10000'])
    }
    const info = await UserService.findByEmail(email)
    const result = await UserService.updateUser(email, { integral_count: info.integral_count + count })
    if (result < 1) {
      throw new HttpException(10013, errCode['10013'])
    }
    ctx.body = ResultVo.successNull()
  }

  async createRecord(ctx) {
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

  async searchGarbage(ctx) {
    const { garbage_info } = ctx.request.query

    if (!garbage_info) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await GarbageService.findByGarbage(garbage_info)
    ctx.body = ResultVo.success(result)
  }

  async getArticleDetail(ctx) {
    const { id } = ctx.params
    if (!id) {
      throw new HttpException(10000, errCode['10000'])
    }
    const result = await HotArticleService.findById(id)
    ctx.body = ResultVo.success(result)
  }

  async searchArticles(ctx) {
    const { title, offset, limit } = ctx.request.query
    if (!title) {
      throw new HttpException(10000, errCode['10000'])
    }
    // if (!offset) {
    //   offset = 1
    // }
    // if (!limit) {
    //   limit = 10
    // }
    const { page, size } = Validate.validatePage(offset, limit)
    const result = await HotArticleService.findAllByTitle(title, page - 1, size)
    ctx.body = ResultVo.success(result)
  }
}

export default new UserController()
