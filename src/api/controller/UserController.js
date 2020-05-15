import UserService from '@/api/service/UserService';
import ResultVo from '@/utils/ResultVo';
import { errCode } from '@/enums/enum';
import bcrypt from 'bcrypt';
import send from '@/config/MailConfig';
import dayjs from 'dayjs';
import { setValue } from '@/config/RedisConfig';
import { checkCode } from '@/utils/Utils';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs'
import path from 'path'
import config from '../../config'
import { HttpException } from '@/exception/ResultException';

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
      setValue(body.email, code, 60 * 5)
      ctx.body = ResultVo.success(result)
    } catch (e) {
      console.log(e)
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
    console.log('value', bool)
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
    console.log(res)
  }

  async changeUserInfo(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;

    if (!id) {
      ctx.body = ResultVo.fail(10000, errCode[10000])
      return
    }
    const res = await UserService.updateUser(id, body)
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
    const reader = fs.createReadStream(file.path)
    const filePath = path.join('public/static/upload', `${dayjs().format('YYYY-MM-dd')}-${file.name}`);
    const writeStream = fs.createWriteStream(filePath)
    reader.pipe(writeStream)
    console.log(filePath)
  }
}

export default new UserController()
