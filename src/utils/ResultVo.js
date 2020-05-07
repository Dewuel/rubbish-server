export default class ResultVo {
  static async success(data) {
    return {
      code: 0,
      message: 'success',
      data: data
    }
  }

  static async successNull() {
    return {
      code: 0,
      message: 'success'
    }
  }
}
