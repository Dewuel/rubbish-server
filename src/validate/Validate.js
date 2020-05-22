import { toInt } from '@/utils/Utils';

class Validate {
  validatePage(offset, limit) {
    let page, size
    if (!offset) {
      page = 1
    }
    if (!limit) {
      size = 10
    }
    return { page: toInt(page), size: toInt(size) }
  }
}

export default new Validate();
