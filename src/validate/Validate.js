import { toInt } from '@/utils/Utils';

class Validate {
  validatePage(offset, limit) {
    let page, size
    if (!offset) {
      page = 1
    } else {
      page = offset
    }
    if (!limit) {
      size = 10
    } else {
      size = limit
    }

    return { page: toInt(page), size: toInt(size) }
  }
}

export default new Validate();
