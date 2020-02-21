export const AppConstants = {
  apiEndpoint: 'http://localhost:8080/ProjectK/rest',
  loginEndPoint: 'login/validate',
  searchByIdEndPoint: '/user/id',
  searchByUuidEndPoint: '/user',
  searchEndPoint: '/fetchProfiles',
  admin: 'admin',
  client: 'client',
  user: 'user',
  useMockData: false,
  receivedLikeCntEndPoint: '/receivedLikeCntEndPoint',
  sentLikeCntEndPoint: '/sentLikeCntEndPoint',
  receivedMsgCntEndPoint: '/receivedMsgCntEndPoint',
  sentMsgCntEndPoint: '/sentMsgCntEndPoint',
  favCntEndPoint: '/favCntEndPoint',
  mstrFieldsEndPoint: '/mstrFields/getAll',
  clientInfoEndPoint: 'client/myClientInfo',
  updateClient:'client/update',
  fetchProfilesCntEndPoint: 'user/fetchProfilesCount',
  distanceSearchCntEndPoint: 'user/distanceSearchCount',
  createUserEndPoint:'user/create',
  updateUserEndPoint: 'user/update',
  updateUserPicEndPoint: 'user/updatePic',
  myProfileEndPoint: 'user/myProfile',
  updatePwdEndPoint: 'login/update',
  myPartnerPreferenceEndPoint: 'partnerPreference/myPreference',
  updateMyPartnerPreferenceEndPoint: 'partnerPreference/update',
  getPartnerPreferenceEndPoint:'partnerPreference',
  dcResponse: 'dcresponse',
  getAllUsersEndPoint:'user/getAll',
  clientGetAllTmpUserUpdatesCont:'clientDashboard/getAllUsrUpdatesCount',
  clientGetAllTmpUserUpdates:'clientDashboard/getAllUsrUpdates',
  clientGetAllActiveUsersCount:'clientDashboard/activeUsrsCnt',
  clientAcceptUsrUpdate:'clientDashboard/acceptUsrUpdate',
  clientProfilesCreatedCnt:'clientDashboard/profilesCreatedCnt',
  clientDashboardUserLatLong:'clientDashboard/userLatLong',
  clientDashboardEventsCnt:'clientDashboard/eventsCnt',
  clientDashboardEventsDetails:'clientDashboard/eventDetails',
  gunaMatchEndPoint:'tools/gunaCount',
  gunaCountForProfile:'tools/gunaCountForProfile',
  rasiStarMapEndPoint: '/mstrFields/rasiStarMap',
  getAllUserIds:'user/allUserIds',
  getAllEventsCntByUsrId:'events/eventsCnt',
  getEventDetailsByEventType:'events/eventDetails',
  downloadPrfoileEndPoint:'http://localhost:8080/ProjectK/rest/export/pdf',
  fetchStatsEndPoint:'tools/stats',
  fetchClientStatsEndPoint:'tools/clientStats',
  myQRCodeEndPoint:'tools/myQRCode'
};

export class ErrorConstants {
  public static get httpError(): string {
    return 'There was an HTTP error.';
  }
  public static get typeError(): string {
    return 'There was a Type error.';
  }
  public static get generalError(): string {
    return 'There was a general error.';
  }
  public static get somethingHappened(): string {
    return 'Nobody threw an Error but something happened!';
  }
}
