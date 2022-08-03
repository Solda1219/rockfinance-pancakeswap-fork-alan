export default class BaseRequest {
  static async getJson(aUrl, aRequesObject) {
    try {
      const response = await fetch(aUrl, aRequesObject);
      const json = response.json();
      return json;
    } catch (exception) {
      const json = {};
      json["ErrorMessage"] = exception;
      return json;
    }
  }

  static async getJsonStatusOnly(aUrl, aRequesObject) {
    try {
      const response = await fetch(aUrl, aRequesObject);
      return response.status === 200;
    } catch {
      return false;
    }
  }

  static buildRequestObject(anHttpMethod, someData) {
    return {
      method: anHttpMethod,
      body: JSON.stringify(someData),
    };
  }
}
