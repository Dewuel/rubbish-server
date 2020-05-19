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

const toInt = num => {
  return Number(num) || 0
}

const randomNum = () => {
  const len = 16
  const chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const maxLength = chr.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str = str.concat(chr.charAt(Math.floor(Math.random() * maxLength)))
  }
  return str
}

const randomRecord = () => {
  const chr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const str = chr.charAt(Math.floor(Math.random() * chr.length))
  const date = new Date().getTime()
  return str.concat(date.toString())
}

const genFileName = () => {
  const len = 16
  const chr = 'abcdefhs23456789'
  const maxLength = chr.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str = str.concat(chr.charAt(Math.floor(Math.random() * maxLength)))
  }
  return str
}

export {
  checkCode,
  getJWTPayload,
  genToken,
  toInt,
  randomNum,
  randomRecord,
  genFileName
}
