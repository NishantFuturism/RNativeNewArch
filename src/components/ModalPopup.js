// import {
//   View,
//   Text,
//   Modal,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import {setVarientIdFun} from '../redux/actions/Cart';
// import {useDispatch, useSelector} from 'react-redux';
// import React, {useState} from 'react';
// import AsyncStorageKeys from '../utility/AsyncStorageKeys';
// import {getMultiple} from '../utility/Helper';
// import Network from '../utility/Network';
// import {getVersion} from 'react-native-device-info';

// import SimpleToast from 'react-native-simple-toast';

// const ModalPopup = ({
//   visible,
//   setVisible,
//   buyMembershipList,
//   message,
//   memberAPISuccessCallback,
// }) => {
//   const varientId = useSelector(state => state.cartData.varientId);
//   const dispatch = useDispatch();

//   const addMembershipPlanAPI = from => {
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//       AsyncStorageKeys.PINCODE,
//       AsyncStorageKeys.ISPANINDIA,
//       AsyncStorageKeys.PRIVATEKEY,
//     ]).then(async values => {
//       try {
//         const response = await fetch(
//           Network.urlAddtocart_MemberShipItem_Api,
//           Network.get_UrlEncodedRequest_With_Headers({
//             pKey: Network.funkey,
//             uid: values[0][1] == null ? '0' : values[0][1],
//             productvariantid: from == 'skip' ? '0' : varientId,
//             quantity: 1,
//             flagid: values[1][1] == null ? '2' : values[1][1],
//             tempid: values[2][1],
//             warehouseid: values[3][1] == null ? '1' : values[3][1],
//             pincode: values[4][1] == null ? '0' : values[4][1],
//             ispanindia: values[5][1] == null ? '0' : values[5][1],
//             version: getVersion(),
//             from: '',
//             privatekey: values[6][1] == null ? '0' : values[6][1],
//           }),
//         );
//         const json = await response.json();
//         console.log('addMembershipPlanAPI resp : ', JSON.stringify(json));
//         if (json.status == 1) memberAPISuccessCallback();
//         else {
//           SimpleToast.show(json.message, SimpleToast.SHORT, [
//             'RCTModalHostViewController',
//           ]);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//       }
//     });
//   };

//   const PlanComponent = ({data, setSelectedPlan, selected, index}) => {
//     const [checkImg, setCheckImg] = useState(false);

//     return (
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={() => {
//           setSelectedPlan(index);
//           dispatch(setVarientIdFun(data?.Id));
//         }}
//         style={styles.planView}>
//         <View>
//           {selected ? (
//             <Image
//               style={{width: 40, height: 40}}
//               source={require('../../assets/images/checkbox-clicked.png')}
//             />
//           ) : (
//             <Image
//               style={{width: 40, height: 40}}
//               source={require('../../assets/images/checkbox-default.png')}
//             />
//           )}
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             width: '88%',
//           }}>
//           <Text style={styles.lblPlanName}>{data?.DisplayName}</Text>
//           {data?.MRP == 0 ? null : (
//             <>
//               <Text
//                 style={{
//                   textDecorationLine: 'line-through',
//                   textDecorationStyle: 'solid',
//                   marginLeft: 5,
//                 }}>
//                 ₹ {data?.MRP}
//               </Text>
//               <Text
//                 style={{
//                   marginLeft: 8,
//                   color: '#C80066',
//                   fontSize: 13,
//                   fontWeight: 'bold',
//                 }}>
//                 ₹ {data?.Price}
//               </Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };
//   const [selectedPlan, setSelectedPlan] = useState(-1);
//   return (
//     <Modal transparent visible={visible}>
//       <TouchableOpacity
//         onPress={() => setVisible(false)}
//         activeOpacity={1}
//         style={styles.modalBackGround}>
//         <View style={[styles.modalContainer]}>
//           <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//             <TouchableOpacity activeOpacity={1}>
//               <View style={styles.topView}>
//                 <Text style={styles.topText}>NATURE'S BASKET MEMBERSHIP</Text>
//               </View>
//               <View style={styles.bottomView}>
//                 <Text style={styles.lblHeading}>
//                   NOW AVAIL UNLIMITED DELIVERY, WITH NO MINIMUM ORDER AMOUNT
//                 </Text>
//                 {buyMembershipList?.map((item, index) => {
//                   return (
//                     <PlanComponent
//                       data={item}
//                       setSelectedPlan={setSelectedPlan}
//                       index={index}
//                       selected={selectedPlan == index}
//                     />
//                   );
//                 })}
//                 <View style={styles.membershipDetailsView}>
//                   <Text style={styles.membershipTitle}>
//                     Membership Detail :
//                   </Text>
//                   <Text style={styles.noteMsg}>{message?.[1]?.trim()} </Text>
//                   <Text style={styles.lastText}>{message?.[2]?.trim()}</Text>
//                 </View>

//                 <TouchableOpacity
//                   style={styles.continueBtn}
//                   onPress={() => {
//                     if (
//                       varientId == '' ||
//                       varientId == '0' ||
//                       varientId == undefined ||
//                       varientId == null
//                     ) {
//                       SimpleToast.show(
//                         'Please select membership plan to continue',
//                         SimpleToast.SHORT,
//                         ['RCTModalHostViewController'],
//                       );
//                       return;
//                     }
//                     addMembershipPlanAPI();
//                   }}>
//                   <Text style={styles.continueText}>
//                     CONTINUE WITH MEMBERSHIP
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.continueBtn}
//                   onPress={() => {
//                     dispatch(setVarientIdFun('0'));
//                     addMembershipPlanAPI('skip');
//                   }}>
//                   <Text style={styles.continueText}>SKIP</Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackGround: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 0,
//     elevation: 20,
//     maxHeight: Dimensions.get('window').height - 40,
//   },
//   topView: {
//     backgroundColor: '#82b750',
//     height: 45,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   topText: {
//     fontSize: 14,
//     fontFamily: 'CeraPRO-Bold',
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   lblHeading: {
//     paddingVertical: 20,

//     fontSize: 16,
//     fontFamily: 'CeraPRO-Regular',
//   },
//   bottomView: {
//     paddingHorizontal: 10,
//   },
//   planView: {
//     backgroundColor: '#f2f2f2',
//     paddingHorizontal: 5,
//     //paddingRight:10,
//     paddingVertical: 5,
//     marginVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   lblPlanName: {
//     fontSize: 14,
//     color: '#000',
//     fontFamily: 'CeraPRO-Regular',
//   },
//   membershipDetailsView: {
//     borderColor: '#999999',
//     borderWidth: 1,
//     backgroundColor: '#f1f2ea',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     marginVertical: 20,
//     marginTop: 15,
//   },
//   membershipTitle: {
//     color: '#181b1f',
//     fontSize: 14,
//     fontFamily: 'CeraPRO-Regular',
//   },
//   noteMsg: {
//     marginVertical: 10,
//     color: '#181b1f',
//     fontSize: 13,
//     fontFamily: 'CeraPRO-Regular',
//   },
//   lastText: {
//     color: '#181b1f',
//     fontSize: 14,
//     fontFamily: 'CeraPRO-Regular',
//   },
//   continueBtn: {
//     backgroundColor: '#82b750',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     borderRadius: 2,
//     marginBottom: 15,
//   },
//   continueText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFF',
//     fontFamily: 'CeraPRO-Bold',
//   },
// });

// export default ModalPopup;
