export default class ResponseHandler {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  static getResponse(response) {
    if (response.status === undefined) {
      this.setError(response);
    } else if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      const data = response.data ? response.data : null;
      return this.setSuccess(data);
    } else {
      return this.setError(response);
    }
  }

  static setSuccess(responseData) {
    return {
      data: responseData,
      type: "success",
    };
  }

  static setError(error) {
    return {
      type: "error",
      message: error,
    };
  }
}
