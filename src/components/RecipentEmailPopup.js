// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   TextInput,
//   View,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
//   Alert,
// } from 'react-native';
// import {theme} from '../constants/Theme';
// import {
//   getMultiple,
//   showToast,
//   validateEmail,
//   _retrieveData,
//   _storeData,
//   checkProductAvailabilityInCart,
//   logFirebaseEvent,
//   moengageEvent,
// } from '../utility/Helper';
// import ButtonComponent from '../components/TouchableButton';
// import Colors from '../constants/Colors';
// import Network from '../utility/Network';
// import AsyncStorageKeys from '../utility/AsyncStorageKeys';
// import {getVersion} from 'react-native-device-info';
// import {fetchAddEGiftVoucherToCart} from '../redux/actions/Cart';
// import {useDispatch} from 'react-redux';
// import Toast from 'react-native-simple-toast';
// import appsFlyer from 'react-native-appsflyer';
// import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';

// const RecipientEmailPopup = props => {
//   const [email, onChangeEmail] = useState(null);
//   const [isVisible, setVisiblility] = useState(
//     props.visible ? props.visible : false,
//   );
//   const [egvid, setEgvid] = useState(0);
//   const dispatch = useDispatch();

//   const onSubmitRecipientEmail = () => {
//     if (email === null) {
//       showToast('Please enter email address');
//       return;
//     }
//     if (!validateEmail(email)) {
//       showToast('Please enter valid email Address');
//       return;
//     }
//     invokePopup();
//   };

//   const invokePopup = () => {
//     Alert.alert(
//       'Confirm Email',
//       'Please confirm the email address',
//       [
//         {
//           text: 'DONE',
//           onPress: () => {
//             setVisiblility(false);
//             addEgvToCart();
//           },
//         },
//         {
//           text: 'Cancel',
//           onPress: () => {},
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const addEgvToCart = () => {
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.ISGUESTLOGIN,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//       AsyncStorageKeys.PINCODE,
//       AsyncStorageKeys.ISPANINDIA,
//       AsyncStorageKeys.PRIVATEKEY,
//       AsyncStorageKeys.CITYNAMEFORMOENGAGE,
//     ]).then(async values => {
//       let funckey = {
//         pKey: Network.funkey,
//         uid: values[0][1] === null ? '0' : values[0][1],
//         productvariantid: props.prodId,
//         quantity: 1,
//         flagid:
//           values[1][1] === 'false'
//             ? values[2][1] === null
//               ? 1
//               : values[2][1]
//             : 1,
//         tempid: values[3][1] === null ? '0' : values[3][1],
//         warehouseid: values[4][1] === null ? '1' : values[4][1],
//         pincode: values[5][1] === null ? '' : values[5][1],
//         ispanindia: values[6][1] === null ? '0' : values[6][1],
//         version: getVersion(),
//         egvid: egvid,
//         emailid: email,
//         from: 'GIFTCARD',
//         privateKey: values[7][1] === null ? '0' : values[7][1],
//       };

//       await dispatch(fetchAddEGiftVoucherToCart(funckey)).then(
//         async response => {
//           if (response.status == 1) {
//             Toast.show(response.message, Toast.SHORT, [
//               'RCTModalHostViewController',
//             ]);

//             checkProductAvailabilityInCart(props.prodId).then(qty => {
//               console.log('displaying cart qyantity...', qty);

//               AppEventsLogger.logEvent(
//                 'nb_add_to_cart',
//                 parseFloat(qty * parseFloat(props.productData.sellingprice)),
//                 {
//                   product_name: props.productData.productname,
//                   Product_varient_id: props.prodId,
//                   product_data: JSON.stringify([
//                     {
//                       productName: props.productData.productname,
//                       varId: props.prodId,
//                       mrp: parseFloat(props.productData.mrp),
//                       price: parseFloat(props.productData.sellingprice),
//                       totalPrice: parseFloat(
//                         qty * parseFloat(props.productData.sellingprice),
//                       ),
//                       cartQty: 1,
//                       city: values[8][1] == null ? '' : values[8][1],
//                       source: '',
//                       pincode: values[5][1],
//                     },
//                   ]),
//                 },
//               );

//               moengageEvent('Add To Cart', {
//                 productName: props.productData.productname,
//                 varId: props.prodId,
//                 mrp: parseFloat(props.productData.mrp),
//                 price: parseFloat(props.productData.sellingprice),
//                 totalPrice: parseFloat(
//                   qty * parseFloat(props.productData.sellingprice),
//                 ),
//                 cartQty: 1,
//                 city: values[8][1] == null ? '' : values[8][1],
//                 source: '',
//                 pincode: values[5][1],
//               });

//               appsFlyer.logEvent(
//                 'af_add_to_cart',
//                 {
//                   af_product_name: props.productData.productname,
//                   af_content_id: props.prodId,
//                   af_mrp: parseFloat(props.productData.mrp),
//                   af_price: parseFloat(props.productData.sellingprice),
//                   af_quantity	: 1,
//                   af_city: values[8][1] == null ? '' : values[8][1],
//                   af_pincode: values[5][1],
//                 },
//                 res => {
//                   console.log('add to cart success ', res);
//                 },
//                 err => {
//                   console.error('add to cart error ', err);
//                 },
//               );
//             });

//             //   if (props.productData?.dataFromNetcore == true) {
//             //     //let qty = checkProductAvailabilityInCart(prodVarId);
//             //     addNetcoreItem({
//             //       "productid": props.productData.productid,
//             //       "productvarientid": props.prodId,
//             //       "qty": 1
//             //     });
//             //   }

//             logFirebaseEvent('add_to_cart', {
//               product_variant_id: props.prodId,
//             });
//           } else {
//             Toast.show(response.message, Toast.SHORT, [
//               'RCTModalHostViewController',
//             ]);
//           }
//         },
//       );
//     });
//   };

//   const sentEGiftCardToServer = async egvid => {
//     let funckey = {
//       pKey: Network.funkey,
//       egvid: egvid,
//       emailid: email,
//     };

//     try {
//       const response = await fetch(
//         Network.urlUpdateEGVEmailId,
//         Network.get_UrlEncodedRequest_With_Headers(funckey),
//       );
//       console.log(response);

//       const responseJSON = await response.json();
//       console.log('recepient email response : ', JSON.stringify(responseJSON));

//       if (responseJSON.status === 1) {
//         // props.addCart();
//         showToast(responseJSON.message);
//         props.setModalVisibility(false);
//       }
//     } catch (error) {
//       // stopLoader//
//       // setIsOtpVerified(false);
//       console.log('error===>>>', error);
//       showToast('something went wrong');
//     }
//   };

//   const getUrlEgiftCardEGVID = async () => {
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.ISGUESTLOGIN,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//     ]).then(async values => {
//       let funckey = {
//         pKey: Network.funkey,
//         // egvid: props.EGVID ? props.EGVID : '',
//         // emailid: email,
//         // pKey : network.funkey,
//         userid: values[0][1] === null ? '0' : values[0][1],
//         pvid: props.prodId,
//         // flagid : ((BenocdingProperties.getString('isGuestLogin', 'false') === 'false') ? BenocdingProperties.getString("flagID") : 1),
//         flagid:
//           values[1][1] === 'false'
//             ? values[2][1] === null
//               ? 1
//               : values[2][1]
//             : 1,
//         tempid: values[3][1] === null ? '0' : values[3][1],
//         warehouseid: values[4][1] === null ? '1' : values[4][1],
//       };
//       try {
//         const response = await fetch(
//           Network.urlGetEGVDetails_Status,
//           Network.get_UrlEncodedRequest_With_Headers(funckey),
//         );
//         console.log(response);

//         const responseJSON = await response.json();

//         if (responseJSON.status === 1) {
//           console.log('responseJSON getUrlEgiftCardEGVID', responseJSON);

//           setEgvid(responseJSON.egvid);
//           if (responseJSON.egvemailid !== '') {
//             onChangeEmail(responseJSON.egvemailid);
//           }
//           // props.addCart();
//           // showToast(responseJSON.message);
//           // props.setModalVisibility(false);
//           // egvidVAlue = xml.egvid;

//           // if (xml.egvemailid !== '') {
//           //     txtOTP.value = xml.egvemailid;
//           // } else {
//           //     txtOTP.hintText = 'Recipient email';
//           // }

//           //where should be above updated

//           //sentEGiftCardToServer(responseJSON.egvid);
//         }
//       } catch (error) {
//         // stopLoader//
//         // setIsOtpVerified(false);
//         console.log('error===>>>', error);
//         showToast('something went wrong');
//       }
//     });
//   };

//   useEffect(() => {
//     getUrlEgiftCardEGVID();
//   }, []);

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={() => {
//         // setVisiblility(false);
//         props.setModalVisibility(false);
//       }}>
//       <TouchableWithoutFeedback
//         onPress={() => {
//           // setModalVisible(false);
//           // setVisiblility(false);
//           props.setModalVisibility(false);
//         }}>
//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//           }}>
//           <View
//             style={{
//               backgroundColor: 'white',
//               borderRadius: 3,
//             }}>
//             <View
//               style={{
//                 height: 35,
//                 justifyContent: 'center',
//                 backgroundColor: Colors.primary,
//               }}>
//               <Text
//                 style={{
//                   ...theme.authForgotPasswordTitleText,
//                   color: 'white',
//                   textAlign: 'center',
//                   fontSize: 17,
//                 }}>
//                 Buy a E-mail Gift Card
//               </Text>
//             </View>
//             <Text
//               style={{
//                 color: 'black',
//                 paddingHorizontal: 10,
//                 marginTop: 12,
//                 fontSize: 16,
//               }}>
//               Enter recipient's email
//             </Text>
//             <TextInput
//               style={{
//                 //...theme.authSignupEmailMobileOtpTextBox,
//                 fontSize: 12,
//                 fontFamily: 'CeraPRO-Regular',
//                 color: '#181b1e',
//                 flex: 1,
//                 width: Dimensions.get('window').width - 68,
//                 borderWidth: 1,
//                 borderRadius: 3,
//                 borderColor: 'lightgrey',
//                 paddingHorizontal: 10,
//                 flex: null,
//                 marginHorizontal: 10,
//                 marginTop: 5,
//                 fontSize: 14,
//                 alignSelf: 'center',
//                 height: 40,
//               }}
//               placeholderTextColor={'grey'}
//               onChangeText={onChangeEmail}
//               value={email}
//               placeholder="Recipient email"
//               keyboardType="email-address"
//             />
//             <ButtonComponent
//               callBack={() => {
//                 onSubmitRecipientEmail();
//               }}
//               buttonText={'DONE'}
//               dispatchTouchableStyles={{
//                 ...theme.authSignupBtn,
//                 marginVertical: 10,
//                 height: 34,
//                 justifyContent: 'center',
//                 padding: 0,
//                 width: Dimensions.get('window').width - 68,
//                 alignSelf: 'center',
//               }}
//               dispatchTextStyles={theme.authResetBtnText}
//             />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// export default RecipientEmailPopup;
