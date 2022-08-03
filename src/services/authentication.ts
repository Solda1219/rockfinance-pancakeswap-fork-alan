import AuthenticationRequest from '../requests/authentication'
import baseService from './base'

export default class authenticationService extends baseService {
  static async getProfile(anEmail) {
    const json = await AuthenticationRequest.getProfile(anEmail)
    if (this.isApiError(json)) {
      return json.ErrorMessage
    }
    return json
  }

  static async login(anEmail, aPassword) {
    const json = await AuthenticationRequest.login(anEmail, aPassword)
    if (this.isApiError(json)) {
      return json.ErrorMessage
    }
    return json
  }

  static async logout(aProfileModel) {
    const success = await AuthenticationRequest.logout(aProfileModel)
    return success
  }

  static async register(aProfileModel) {
    const json = await AuthenticationRequest.register(aProfileModel)
    if (this.isApiError(json)) {
      return json.ErrorMessage
    }
    return json
  }
}
