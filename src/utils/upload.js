import fs from 'fs'
import path from 'path'
import { genFileName } from '@/utils/Utils';

/**
 * 封装文件上传
 * @param file
 * @returns {string}
 */
const upload = file => {
  const reader = fs.createReadStream(file.path)
  if (!fs.readdirSync(path.join('public/static/upload'))) {
    fs.mkdirSync(path.join('public/static/upload'), { recursive: true })
  }
  const filePath = path.join('public/static/upload', `/${genFileName()}.${path.extname(file.name)}`)
  const write = fs.createWriteStream(filePath)
  reader.pipe(write)
  const _filePath = path.join('/static/upload', path.basename(filePath))
  return _filePath.replace(/\\/g, '/')
}

export { upload }
