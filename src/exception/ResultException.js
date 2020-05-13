class ResultException extends Error {
  constructor(code = 2000, message = '服务器异常') {
    super()
    this.code = code
    this.message = message
  }
}

class HttpException extends ResultException {
  constructor(code, message) {
    super();
    this.code = code
    this.message = message
  }
}

export { ResultException, HttpException };
