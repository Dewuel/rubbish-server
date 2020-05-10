import { getValue } from '@/config/RedisConfig'
import config from '../config/index'
import jwt from 'jsonwebtoken'

const getJWTPayload = token => {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET)
}

const checkCode = async (key, value) => {
  const redisData = await getValue(key)
  if (redisData != null) {
    return redisData.toLowerCase() === value.toLowerCase();
  } else {
    return false
  }
}

const genToken = data => {
  return jwt.sign(data, config.JWT_SECRET, { expiresIn: 86400 })
}

export {
  checkCode,
  getJWTPayload,
  genToken
}
