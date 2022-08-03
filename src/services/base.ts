export default class BaseService {
  static isApiError(someJson) {
    return someJson != null && someJson.ErrorMessage != null;
  }
}
