var networkFactory = {};
networkFactory.funkey = 'ASDB%#EWISL@#!';
var nbDomain = '';
// var link = 'https://appsecurity.naturesbasket.co.in/';

var link = 'http://testappsecurity.naturesbasket.co.in/';

if (link == 'http://testappsecurity.naturesbasket.co.in/') {
  nbDomain = 'https://testweb.naturesbasket.co.in/';
} else if (link == 'https://appsecurity.naturesbasket.co.in/' || link == 'http://appsecurity.naturesbasket.co.in/') {
  nbDomain = 'https://www.naturesbasket.co.in/';
}

//New Login Api's
networkFactory.urlSendOtp = 'http://testappsecurity1.naturesbasket.co.in/SendOTP';
networkFactory.urlLoginRegisterUser = 'http://testappsecurity1.naturesbasket.co.in/LoginRegisterUser';
networkFactory.urlAddNewUserBasicDetails = 'http://testappsecurity1.naturesbasket.co.in/SetPersonalDetails';
networkFactory.urlRefresh = 'http://testappsecurity1.naturesbasket.co.in/Refresh';
//Static Pages Links
networkFactory.aboutUs_link = 'https://www.naturesbasket.co.in/apihtml/AboutUs.html';
networkFactory.FAQ_link = 'https://www.naturesbasket.co.in/apihtml/FAQ.html';
networkFactory.contactUs_link = 'https://www.naturesbasket.co.in/apihtml/ContactUs.html';
networkFactory.privacyPolicy_link = 'https://www.naturesbasket.co.in/apihtml/PrivacyPolicy.html';
networkFactory.termsOfUse_link = 'http://www.naturesbasket.co.in/apihtml/TermOfUse.html';
networkFactory.blogs_link = 'https://m.naturesbasket.co.in/html/appblog.aspx';
networkFactory.promotions_link = 'https://www.naturesbasket.co.in/apihtml/mobilepromotions.html';
networkFactory.storeLocator_link = 'https://www.naturesbasket.co.in/apihtml/StoreLocator.html';
networkFactory.events_link = 'https://m.naturesbasket.co.in/HTML/NoHeaderEvents.aspx';
networkFactory.nbtv_link = 'http://www.naturesbasket.co.in/apihtml/mobiletv.html';

networkFactory.nbDomain = nbDomain;

//New Easy Reward APIs
networkFactory.urlCheckCoupon_INNB = link + 'ekstopwebapis.asmx/CheckCoupon_INNB';
networkFactory.urlGenerateToken_EasyReward = link + 'ekstopwebapis.asmx/GenerateToken_EasyReward';
networkFactory.urlCheckCouponAvailability_EasyReward = link + 'ekstopwebapis.asmx/CheckCouponAvailability_EasyReward';
networkFactory.urlGetCoupon_RequestId = link + 'ekstopwebapis.asmx/GetCoupon_RequestId';
networkFactory.urlUnblockCoupon_EasyReward = link + 'ekstopwebapis.asmx/UnblockCoupon_EasyReward';
networkFactory.urlRedeemCoupon_EasyReward = link + 'ekstopwebapis.asmx/RedeemCoupon_EasyReward';
networkFactory.urlUpdateOrderNo_toRedeemedCoupon = link + 'ekstopwebapis.asmx/UpdateOrderNo_toRedeemedCoupon';
networkFactory.urlGetEasyRewardzCouponDetails = link + 'ekstopwebapis.asmx/GetEasyRewardzCouponDetails';
networkFactory.urlUseCoupon_EasyReward = link + 'ekstopwebapis.asmx/UseCoupon_EasyReward';

networkFactory.urlGetHomepageUpperBannerDetails = link + 'ekstopwebapis.asmx/GetHomepageUpperBannerDetails';
networkFactory.urlGetHomePageWidget_FromNetcore_ViewMore = link + 'ekstopwebapis.asmx/GetHomePageWidget_FromNetcore_ViewMore_PanIndia';
networkFactory.urlGetHomePageWidget_FromNetcore = link + 'ekstopwebapis.asmx/GetHomePageWidget_FromNetcore_PanIndia';
//networkFactory.urlGetHomePageWidget_FromNetcore_ViewMore = link + 'ekstopwebapis.asmx/GetHomePageWidget_FromNetcore_ViewMore';
//networkFactory.urlGetHomePageWidget_FromNetcore = link + 'ekstopwebapis.asmx/GetHomePageWidget_FromNetcore';
networkFactory.urlGetRemovedProductFromCart = link + 'ekstopwebapis.asmx/GetRemovedProductFromCart';
networkFactory.urlEmailSignin_ApiNew_OTP = link + 'ekstopwebapis.asmx/emailSignin_ApiNew_OTP';
networkFactory.urlValidateUserOTp = link + 'ekstopwebapis.asmx/ValidateUserOTp';
networkFactory.urlGetPaymentRepayList = link + 'ekstopwebapis.asmx/GetPaymentRepayList';
networkFactory.urlUpdatePaymentModeRetry = link + 'ekstopwebapis.asmx/UpdatePaymentModeRetry';
networkFactory.urlCheckUserCartMembershipOnly = link + 'ekstopwebapis.asmx/CheckUserCartMembershipOnly';
networkFactory.urlCheckPincodeIsRapid = link + 'ekstopwebapis.asmx/CheckPincodeIsRapid';
networkFactory.urlGetHomepagePOPUPDetails = link + 'ekstopwebapis.asmx/GetHomepagePOPUPDetails';
networkFactory.urlUpdateHomepagePOPUPUserAction = link + 'ekstopwebapis.asmx/UpdateHomepagePOPUPUserAction';
networkFactory.urlFetchFastandFreshMessageDetails = link + 'ekstopwebapis.asmx/FetchFastandFreshMessageDetails';
networkFactory.urlFetchMessageForYellowBandOnHomePage = link + 'ekstopwebapis.asmx/FetchMessageForYellowBandOnHomePage_Pincode';
networkFactory.urlFetchCityForEnquiry = link + 'ekstopwebapis.asmx/FetchCityForEnquiry';
networkFactory.urlGetSlots_ApiBar = link + 'ekstopwebapis.asmx/GetSlots_ApiBar';
networkFactory.urlGetSelfPickupDetails = link + 'ekstopwebapis.asmx/GetSelfPickupDetails';
networkFactory.urlemergencymessage_Api = link + 'ekstopwebapis.asmx/emergencymessage_Api';
networkFactory.urlsetAppVersion = link + 'ekstopwebapis.asmx/setAppVersion';
networkFactory.urlnotificationManager = link + 'ekstopwebapis.asmx/notificationManager';
networkFactory.urlCaptureDevice = link + 'ekstopwebapis.asmx/CaptureDeviceNew';
networkFactory.urlSearchProduct = link + 'ekstopwebapis.asmx/getSearchDetails';
networkFactory.urlcheckoutOrderSummary = link + 'ekstopwebapis.asmx/checkoutOrderSummary_Version3';
//networkFactory.urlGetSlots = link + 'ekstopwebapis.asmx/GetSlots';
networkFactory.urlGetSlotsDataPercentageApi = link + 'ekstopwebapis.asmx/GetSlots_DataPercentageApi';
networkFactory.urlapplycoupon = link + 'ekstopwebapis.asmx/applycoupon_version2';
networkFactory.urlapplyEks = link + 'ekstopwebapis.asmx/applyEks';
networkFactory.urlIsGuestCheckout = link + 'ekstopwebapis.asmx/IsGuestCheckout';
networkFactory.urlGetCartDetails = link + 'ekstopwebapis.asmx/GetCartDetails_Version3';
networkFactory.urlgetOrderDetails = link + 'ekstopwebapis.asmx/getOrderDetails';
networkFactory.urlgetDailyDeals = link + 'ekstopwebapis.asmx/getDailyDeals';
networkFactory.urlemailSignin = link + 'ekstopwebapis.asmx/emailSignin_ApiNew';
networkFactory.urlemaillogin = link + 'ekstopwebapis.asmx/emailloginNew_ApiVersion2';
networkFactory.urlforgotPassword = link + 'ekstopwebapis.asmx/forgotPassword';
networkFactory.urlfacebookLogin = link + 'ekstopwebapis.asmx/facebookLoginNew';
networkFactory.urlchangepassword = link + 'ekstopwebapis.asmx/changepassword';
networkFactory.urladdAddress = link + 'ekstopwebapis.asmx/addAddress';
networkFactory.urlgetpincodearea = link + 'ekstopwebapis.asmx/getpincodearea';
networkFactory.urlgetProductDetails = link + 'ekstopwebapis.asmx/getProductDetails';

networkFactory.urlchangepassword = link + 'ekstopwebapis.asmx/changepassword';
networkFactory.urladdAddress = link + 'ekstopwebapis.asmx/addAddress';
networkFactory.urlgetpincodearea = link + 'ekstopwebapis.asmx/getpincodearea';
networkFactory.urlgetpersonaldetails = link + 'ekstopwebapis.asmx/getpersonaldetails';
networkFactory.urlsubscribeNewsletters = link + 'ekstopwebapis.asmx/subscribeNewsletters';
networkFactory.urlsetpersonaldetails = link + 'ekstopwebapis.asmx/setpersonaldetails';
networkFactory.urlchangepassword = link + 'ekstopwebapis.asmx/changepassword';
networkFactory.urlgetpincodearea = link + 'ekstopwebapis.asmx/getpincodearea';
networkFactory.urlgetSubscribedNewsletters = link + 'ekstopwebapis.asmx/getSubscribedNewsletters';
networkFactory.urlgetOrderDetails = link + 'ekstopwebapis.asmx/getOrderDetails';
networkFactory.urlgetExpenses = link + 'ekstopwebapis.asmx/getExpenses';
networkFactory.urlgetEKSsummary = link + 'ekstopwebapis.asmx/getEKSsummary';
networkFactory.urlgetEksSummaryorders = link + 'ekstopwebapis.asmx/getEksSummaryorders';
networkFactory.urlgetTotalExpenses = link + 'ekstopwebapis.asmx/getTotalExpenses';
networkFactory.urlgetbucketproducts = link + 'ekstopwebapis.asmx/getbucketproducts';
networkFactory.urlgetSearchDetails = link + 'ekstopwebapis.asmx/getSearchDetails';

networkFactory.urlgetHomeBuckets = link + 'ekstopwebapis.asmx/getHomeBuckets';

networkFactory.urladdAddress = link + 'ekstopwebapis.asmx/addAddress';
networkFactory.urlgetpincodearea = link + 'ekstopwebapis.asmx/getpincodearea';
networkFactory.urlgetAddressBook = link + 'ekstopwebapis.asmx/getAddressBook';
networkFactory.urleditAddressBook = link + 'ekstopwebapis.asmx/editAddressBook';
networkFactory.urlDeleteAddressBook = link + 'ekstopwebapis.asmx/deleteAddressBook';
networkFactory.urlAddAddressBook = link + 'ekstopwebapis.asmx/addAddress';
networkFactory.urlgetMyOrders = link + 'ekstopwebapis.asmx/getMyOrders';

networkFactory.urlgetMyLists = link + 'ekstopwebapis.asmx/getMyLists';
networkFactory.urlcreateMyList = link + 'ekstopwebapis.asmx/createMyList';
networkFactory.urleditMylist = link + 'ekstopwebapis.asmx/editMyList';
networkFactory.urldeleteMylist = link + 'ekstopwebapis.asmx/deleteMyList';
networkFactory.urlgetMyListDetails = link + 'ekstopwebapis.asmx/getMyListDetails_ApiVersion2';
networkFactory.urlremoveProductFromMyList = link + 'ekstopwebapis.asmx/removeProductFromMyList';
networkFactory.urlcheckoutPlaceOrder = link + 'ekstopwebapis.asmx/checkoutPlaceOrder_ApiNewPanIndia';
networkFactory.urladdToMyList = link + 'ekstopwebapis.asmx/addToMyList';
networkFactory.urladdtocart = link + 'ekstopwebapis.asmx/addtocart';
networkFactory.urlremoveFromCart = link + 'ekstopwebapis.asmx/removeFromCart';
networkFactory.urlmyListaddToCart = link + 'ekstopwebapis.asmx/myListaddToCart';
networkFactory.urlgetListsToaddproduct = link + 'ekstopwebapis.asmx/getListsToaddproduct';

networkFactory.urlgetOrderDetails = link + 'ekstopwebapis.asmx/getOrderDetails';
networkFactory.urlgetExpenses = link + 'ekstopwebapis.asmx/getExpenses';
networkFactory.urlgetEKSsummary = link + 'ekstopwebapis.asmx/getEKSsummary';
networkFactory.urlgetEksSummaryorders = link + 'ekstopwebapis.asmx/getEksSummaryorders';
networkFactory.urlgetBannerDetails = link + 'ekstopwebapis.asmx/getBannerDetails';

networkFactory.urlcheckoutOrderSummary = link + 'ekstopwebapis.asmx/checkoutOrderSummary_Version3';
networkFactory.urlGetSlots = link + 'ekstopwebapis.asmx/GetSlots_ApiNewVersion2';
networkFactory.urlFetchExpressDeliveryDetails = link + 'ekstopwebapis.asmx/FetchExpressDeliveryDetails';
networkFactory.urlapplycoupon = link + 'ekstopwebapis.asmx/applycoupon_version2';
networkFactory.urlapplyEks = link + 'ekstopwebapis.asmx/applyEks';
networkFactory.urlvalidateCart = link + 'ekstopwebapis.asmx/validateCart_Version2';

networkFactory.urlupdatecartquantity = link + 'ekstopwebapis.asmx/updatecartquantity';

networkFactory.urlisfirstpurchase = link + 'ekstopwebapis.asmx/IsFirstPurchase';

networkFactory.urlGetSearchBannerList_Msite = link + 'ekstopwebapis.asmx/getSearchBannerList_Msite';


//Unused API
//networkFactory.urlupdatecartquantityNew = link + 'ekstopwebapis.asmx/updatecartquantity_PanIndia';

networkFactory.urllogout = link + 'ekstopwebapis.asmx/logout';

//Membership APIs
networkFactory.urlGetMemberShipList = link + 'ekstopwebapis.asmx/GetMemberShipList';
networkFactory.urlGetMemberShipUserList = link + 'ekstopwebapis.asmx/GetMemberShipUserList';
networkFactory.urlAddtocart_MemberShipItem_Api = link + 'ekstopwebapis.asmx/addtocart_MemberShipItem_Api';
networkFactory.urlCheckUserCartMembership = link + 'ekstopwebapis.asmx/CheckUserCartMembership';

//Netcore APIs
networkFactory.urlNetcoreTransactionAPI = 'https://upload.boxx.ai/transaction/';

networkFactory.username = '';
networkFactory.password = '';
networkFactory.xhr = null;
networkFactory.doc = null;
networkFactory.result = null;

//Natures Basket new webservice
networkFactory.urlGetCity = link + 'ekstopwebapis.asmx/GetCity';
networkFactory.urlGetWIDByCityId = link + 'ekstopwebapis.asmx/GetWarehouseByCityId ';
networkFactory.urlGetWareHouseIDPinCode = link + 'ekstopwebapis.asmx/GetPinDetail_PanIndia';
networkFactory.urlValidateCapp = link + 'ekstopwebapis.asmx/validateCapillary';
networkFactory.urlApplyCapp = link + 'ekstopwebapis.asmx/applyCapillary';
networkFactory.urlgetUserWalletDetails = link + 'ekstopwebapis.asmx/getUserWalletDetails';
networkFactory.urlgetOffers_ApiNew = link + 'ekstopwebapis.asmx/getOffers_ApiNew';
networkFactory.urlgetHash_ApiNew = link + 'ekstopwebapis.asmx/getPayUHashCode_Api';

networkFactory.urluserRewardValidation = link + 'ekstopwebapis.asmx/userRewardValidation';
networkFactory.urlgetUserRewardDetails = link + 'ekstopwebapis.asmx/getUserRewardDetails';
networkFactory.urlupdateUserRewardDetails = link + 'ekstopwebapis.asmx/updateUserRewardDetails';
networkFactory.urlGetLatestOffers = link + 'ekstopwebapis.asmx/getLatestOffers_ApiVersion2';

//Pan India
networkFactory.urlGetCartDetailsPanIndia = link + 'ekstopwebapis.asmx/GetCartDetails_Version3';
networkFactory.urlGetCityPanIndia = link + 'ekstopwebapis.asmx/GetCity_ApiPanIndia';
networkFactory.urlGetSlotsPanIndia = link + 'ekstopwebapis.asmx/GetSlots_ApiNewPanIndia';
networkFactory.urlgetBannerDetailsPanIndia = link + 'ekstopwebapis.asmx/getBannerDetails_Redirection';
networkFactory.urlgetHomeBucketsPanIndia = link + 'ekstopwebapis.asmx/getHomeBuckets_ApiPanIndia';
networkFactory.urlgetSearchDetailsPanIndia = link + 'ekstopwebapis.asmx/getSearchDetailsOOSBanner';
networkFactory.urlgetpincodeareaPanIndia = link + 'ekstopwebapis.asmx/getpincodearea_ApiPanIndia';
// networkFactory.urlcheckoutOrderSummaryPanIndia = link + 'ekstopwebapis.asmx/checkoutOrderSummary_Version3';
networkFactory.urlcheckoutOrderSummaryPanIndia = link + 'ekstopwebapis.asmx/checkoutOrderSummary_RN_NewApp';
networkFactory.urlSetPreCheckout_UserDetailsApi = link + 'ekstopwebapis.asmx/SetPreCheckout_UserDetailsApi';

networkFactory.urlgetProductDetailsPanIndia = link + 'ekstopwebapis.asmx/getProductDetails_MobileSiteApi';
networkFactory.urlcheckoutPlaceOrderPanIndia = link + 'ekstopwebapis.asmx/checkoutPlaceOrder_Version3';
networkFactory.urlgetCODChargesPanIndia = link + 'ekstopwebapis.asmx/GetCODChargePlaceOrder_PanIndia';
networkFactory.urladdtocartPanIndia = link + 'ekstopwebapis.asmx/addtocart_PanIndia_Tracking';
networkFactory.urlupdatecartquantityPanIndia = link + 'ekstopwebapis.asmx/updatecartquantity_PanIndia';
networkFactory.urlmyListaddToCartPanIndia = link + 'ekstopwebapis.asmx/myListaddToCart_PanIndia';
networkFactory.urlgetappVersion = link + 'ekstopwebapis.asmx/GetLatestAPK_Version3';
networkFactory.urlgetRecipes = link + 'ekstopwebapis.asmx/GetRecipes_ApiNew';
networkFactory.urlgetRecipesDetails = link + 'ekstopwebapis.asmx/GetRecipeDetails_ApiNew';
networkFactory.urlgetRecipesSearchDetails = link + 'ekstopwebapis.asmx/GetSearchDetailsRecipes_ApiNew';
networkFactory.urlgetRecipesAddAlltoCart = link + 'ekstopwebapis.asmx/addtocartallproduct_Recipe_Tracking';
networkFactory.urlgetHomeCat = link + 'ekstopwebapis.asmx/GetHomeCategories_Version3_New';
networkFactory.urlgetMyListDetail = link + 'ekstopwebapis.asmx/getMyListDetails_ApiVersion2';
networkFactory.urlgetHomeAdVideo = link + 'ekstopwebapis.asmx/GetHome_VideoDetails';
networkFactory.urlgetTopSearchWords = link + 'ekstopwebapis.asmx/GetSearch_CategoriesDetails';

//QuickSilver
networkFactory.urlGetUserQuickCilverDetails = link + 'ekstopwebapis.asmx/GetUserQuickCilverDetails';
networkFactory.urlApplyQuickCilver = link + 'ekstopwebapis.asmx/ApplyQuickCilver';
networkFactory.urlGetMobileNumberVerificationStatus = link + 'ekstopwebapis.asmx/GetMobileNumberVerificationStatus';
networkFactory.urlMobileNumberVerificationForCheckout = link + 'ekstopwebapis.asmx/MobileNumberVerificationForCheckout';
networkFactory.urlGetUserCapillaryPointsDetails = link + 'ekstopwebapis.asmx/GetUserCapillaryPointsDetails';

networkFactory.urlUpdateEGVEmailId = link + 'ekstopwebapis.asmx/UpdateEGVEmailId_OrderSummary';
networkFactory.urladdtocartgift_PanIndia = link + 'ekstopwebapis.asmx/addtocartgift_PanIndia_Tracking';
networkFactory.urlGetEGVDetails_Status = link + 'ekstopwebapis.asmx/GetEGVDetails_Status';
networkFactory.urlSaveUserFeedback = link + 'ekstopwebapis.asmx/UserFeedback_Details';
networkFactory.urlFeedbackType = link + 'ekstopwebapis.asmx/GetUserFeedback_EnquiryDetails';
networkFactory.urlgetcategoriesPanIndia = link + 'ekstopwebapis.asmx/getcategories_ApiVersion3';
networkFactory.urlgetUserPastOrderDetailsApi = link + 'ekstopwebapis.asmx/GetUserPastOrderDetailsApi';
networkFactory.urlgetUserCartCountApi = link + 'ekstopwebapis.asmx/GetUserCartCountDetails';
networkFactory.urlgetRecentPurchaseApi = link + 'ekstopwebapis.asmx/getHomeBuckets_ProductBoughtByOtherApi';
networkFactory.urlgetSameBrandProductsApi = link + 'ekstopwebapis.asmx/getSameBrandProducts_Api';
networkFactory.urlgetSameCategoryProductsApi = link + 'ekstopwebapis.asmx/getSameCategoryProducts_Api';
networkFactory.urladdtocart_CustomizedPanIndia = link + 'ekstopwebapis.asmx/addtocart_CustomizedPanIndia_Tracking';
networkFactory.urlupdatecartquantity_customizedproduct = link + 'ekstopwebapis.asmx/updatecartquantity_customizedproduct';
networkFactory.urlgetBuckets_BestSellerApi = link + 'ekstopwebapis.asmx/getBuckets_BestSellerApi';
networkFactory.urlgetBuckets_WhatsTrendingApi = link + 'ekstopwebapis.asmx/getBuckets_WhatsTrendingApi';
networkFactory.urlgetBuckets_RecentViewedApi = link + 'ekstopwebapis.asmx/getHomeBuckets_RecentlyViewedProductsApi';
networkFactory.urlgetBrandsApi = link + 'ekstopwebapis.asmx/getHomeBuckets_BrandList';
networkFactory.urlgetBrandsProductsApi = link + 'ekstopwebapis.asmx/getHomeBuckets_getBrandProductDetails';
networkFactory.urlgetTopSellerApi = link + 'ekstopwebapis.asmx/getHomeBuckets_getHomePageTopSeller';
//networkFactory.urlgetRecommendedForYouApi = link + 'ekstopwebapis.asmx/getHomeBuckets_getRecommendedForYou';
networkFactory.urlgetRecommendedForYouApi = 'https://loki.boxx.ai';
networkFactory.urlgetAddressByPincode = link + 'ekstopwebapis.asmx/getAddressBook_ByPincode';
networkFactory.urlgetViewedAlsoViewed = link + 'ekstopwebapis.asmx/getProductBuckets_ViewedAlsoViewed';
networkFactory.urlgetBoughtAlsoBought = link + 'ekstopwebapis.asmx/getProductBuckets_BoughtAlsoBought';
networkFactory.urlgetProductPageBuckets_BestSellerApi = link + 'ekstopwebapis.asmx/getProductPageBuckets_BestSellerApi';
networkFactory.urlgetSearchDetailFiltersApi = link + 'ekstopwebapis.asmx/GetSearchDetailsFiltersOutofstock';
networkFactory.urlgetAddNotifyMeApi = link + 'ekstopwebapis.asmx/AddNotifyMe';
networkFactory.urlAddCustomerBulkEnquiry = link + 'ekstopwebapis.asmx/AddCustomerBulkEnquiry';
networkFactory.urlInsertUserIdlereason = link + 'ekstopwebapis.asmx/InsertUserIdlereason';
networkFactory.urlgetReferralCode = link + 'ekstopwebapis.asmx/getReferralCode';
networkFactory.urlgetIdleUser = link + 'ekstopwebapis.asmx/GetIdleUser';
networkFactory.urlotpVerify = link + 'ekstopwebapis.asmx/UserOTPDetails';
networkFactory.urlotpVerifyDetails = link + 'ekstopwebapis.asmx/UserVerifyOTPDetails';
//networkFactory.urlmobileVerify = link + 'ekstopwebapis.asmx/UpdateMyAccount_OTPFlag';
networkFactory.urlmobileVerify = link + 'ekstopwebapis.asmx/UpdateMyAccount_OTPFlag_v2';
networkFactory.urlmobileOTPLogin = link + 'ekstopwebapis.asmx/emailloginNew_ApiVersion2OTP';
//networkFactory.urlchangeMobileNo = link + 'ekstopwebapis.asmx/UpdateMyAccount_OTPFlagMobileUpdate';
networkFactory.urlchangeMobileNo = link + 'ekstopwebapis.asmx/UpdateMyAccount_OTPFlagMobileUpdate_v2';

networkFactory.subCategoriesList = link + 'ekstopwebapis.asmx/GetSubcategoriesforCategory';

networkFactory.HomeWidgetSubCategoryBanners = link + 'ekstopwebapis.asmx/GetHomePageWidget_ForSubcategories_Offers';

networkFactory.sendMobileOTP = link + 'ekstopwebapis.asmx/SendOTP';

networkFactory.newLoginOrRegisterMobile = link + 'ekstopwebapis.asmx/LoginRegisterUser';

networkFactory.getNBCashUserDetails = link + 'ekstopwebapis.asmx/GetNBCashUserDetailsLog'
networkFactory.urlGetNBCashTandC = link + 'ekstopwebapis.asmx/GetNBCashTandC'

networkFactory.get_UrlEncodedRequest_With_Headers = req => {
  let result = [];

  for (let property in req) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(req[property]);
    result.push(encodedKey + '=' + encodedValue);
  }

  result = result.join('&');

  console.log('------ ' + result + ' -------------');

  return {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: result,
  };
};

networkFactory.get_NetcoreRequest_With_Headers = (req, url) => {
  console.log('netcore widget req: ', JSON.stringify(req));
  return {
    method: url == 'https://upload.boxx.ai/transaction/' ? 'put' : 'post',
    headers: {
      Accept:
        url == 'https://upload.boxx.ai/transaction/'
          ? '*/*'
          : 'application/json',
      'Content-Type':
        url == 'https://loki.boxx.ai' ? 'text/plain' : 'application/json',
    },
    body: JSON.stringify(req),
  };
};

networkFactory.get_Json_Request = (req) => {
  console.log("get_Json_Request", req);
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }
};

networkFactory.get_Json_Request_With_AccessToken = (req,token) => {
  console.log("get_Json_Request_With_AccessToken", req);
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    },
    body: JSON.stringify(req)
  }
};

export default networkFactory;
