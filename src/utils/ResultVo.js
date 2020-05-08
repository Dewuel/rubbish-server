export default class ResultVo {
  static success(data) {
    return {
      code: 0,
      message: 'success',
      data: data
    }
  }

  static successNull() {
    return {
      code: 0,
      message: 'success'
    }
  }

  static fail(code, msg) {
    return {
      code,
      message: msg
    }
  }
}
