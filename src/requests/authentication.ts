import BaseRequest from './baseRequest'
import Endpoints from './endpoints'
import HttpMethods from './httpMethods'

export default class Authentication extends BaseRequest {
  static async getProfile(anEmail) {
    const url = Endpoints.Authentication.getProfile
    const data = {
      Email: anEmail,
    }
    const requestObject = this.buildRequestObject(HttpMethods.post, data)
    const json = await this.getJson(url, requestObject)
    return json
  }

  static async login(anEmail, aPassword) {
    const url = Endpoints.Authentication.login
    const data = {
      Email: anEmail,
      Password: aPassword,
    }
    const requestObject = this.buildRequestObject(HttpMethods.post, data)
    const json = await this.getJson(url, requestObject)
    return json
  }

  static async logout(aProfileModel) {
    const url = Endpoints.Authentication.logout
    const data = aProfileModel
    const requestObject = this.buildRequestObject(HttpMethods.post, data)
    const json = await this.getJsonStatusOnly(url, requestObject)
    return json
  }

  static async register(aProfileModel) {
    try {
      const url = Endpoints.Authentication.register
      const data = aProfileModel
      const requestObject = this.buildRequestObject(HttpMethods.post, data)
      const json = await this.getJson(url, requestObject)
      return json
    } catch (err) {
      return err
    }
  }
}
