import BaseModel from './base'

export default class Profile extends BaseModel {
  Email: string
  Password: string
  IsAuthenticated: boolean
  AffiliateId: string
  ReferralId: string
  ErrorMessage: string
  private constructor(
    anEmail,
    aPassword,
    isAuthenticated,
    anAffiliateId,
    aReferralId,
    anErrorMessage,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate)
    this.Email = anEmail
    this.Password = aPassword
    this.IsAuthenticated = isAuthenticated
    this.AffiliateId = anAffiliateId
    this.ReferralId = aReferralId
    this.ErrorMessage = anErrorMessage
  }
  static NewProfile(
    anEmail,
    aPassword,
    anId,
    aCreatedDate,
    isAuthenticated,
    anAffiliateId,
    aReferralId,
    anErrorMessage
  ): Profile {
    return new Profile(
      anEmail,
      aPassword,
      isAuthenticated,
      anAffiliateId,
      aReferralId,
      anErrorMessage,
      anId,
      aCreatedDate
    )
  }
  static EmptyProfile(): Profile {
    return new Profile('', '', false, '', '', '', '', new Date())
  }
}
