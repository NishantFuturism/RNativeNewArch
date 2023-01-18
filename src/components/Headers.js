// import React, {useState, useEffect,useRef} from 'react';
// import {
//   View,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   Text,
//   TextInput,
//   Keyboard
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import HomeScreenHeaderRight from '../screens/HomeScreenHeaderRight';
// import {_retrieveData} from '../utility/Helper';
// import AsyncStorageKeys from '../utility/AsyncStorageKeys';
// import {grtCardCountFun} from '../redux/actions/Cart';
// import {useDispatch, useSelector} from 'react-redux';

// export const HeaderBGView = () => {
//   return (
//     <View style={{height: 51, width: '100%'}}>
//       {/*<ImageBackground source={require('../../assets/images/shadow-hdr.png')} resizeMode='repeat' />*/}
//     </View>
//   );
// };

// export const HeaderBack = () => {
//   return (
//     <Image
//       source={require('../../assets/images/left-arrow-personal.png')}
//       height={46}
//       width={29}
//       style={{left: 5, position: 'absolute'}}
//     />
//   );
// };

// export const HeaderRight = () => {
//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           height: 47,
//           flexDirection: 'row',
//           position: 'absolute',
//           right: 5,
//         }}>
//         <Image
//           style={{width: 44}}
//           source={require('../../assets/images/icon-search-personal-screen.png')}
//         />
//         <Image
//           style={{height: 40}}
//           source={require('../../assets/images/icon-cart-hdr.png')}
//         />
//         <Image
//           style={{width: 44}}
//           source={require('../../assets/images/right-menu-icon.png')}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export const ShopByCatHeader = props => {
//   return (
//     <SafeAreaView>
//       <View style={{height: 51, width: '100%', backgroundColor: '#FFF'}}>
//         <Image
//           source={require('../../assets/images/shadow-hdr.png')}
//           style={{position: 'absolute', bottom: 0, height: 4, width: '100%'}}
//           resizeMode="stretch"
//         />
//         <TouchableOpacity onPress={props.onBackPress}>
//           <Image
//             source={require('../../assets/images/left-arrow-personal.png')}
//             height={46}
//             width={29}
//             style={{left: 5, position: 'absolute'}}
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             height: 47,
//             flexDirection: 'row',
//             position: 'absolute',
//             right: 5,
//           }}>
//           <HomeScreenHeaderRight isDisplayingFromHome={false} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const ProductDetailsScreenHeader = props => {
//   return (
//     <SafeAreaView>
//       <View style={{height: 51, width: '100%', backgroundColor: '#FFF'}}>
//         <Image
//           source={require('../../assets/images/shadow-hdr.png')}
//           style={{position: 'absolute', bottom: 0, height: 4, width: '100%'}}
//           resizeMode="stretch"
//         />
//         <TouchableOpacity
//           style={{
//             left: 0,
//             zIndex: 100,
//             position: 'absolute',
//           }}
//           onPress={() => {
//             props.onBackPress();
//           }}>
//           <Image
//             source={require('../../assets/images/left-arrow-personal.png')}
//             height={46}
//             width={29}
//           />
//         </TouchableOpacity>
//         <View style={{height: '100%', justifyContent: 'center', marginTop: -2}}>
//           <Text
//             style={{
//               marginLeft: 34,
//               marginRight: 144,
//               fontFamily: 'CeraPRO-Regular',
//               fontSize: 18,
//               // position: 'absolute',
//               // height: 47,
//               textAlignVertical: 'center',
//               color: '#413000',
//             }}
//             numberOfLines={1}>
//             {props.title}
//           </Text>
//         </View>
//         <View
//           style={{
//             height: 47,
//             flexDirection: 'row',
//             position: 'absolute',
//             right: 0,
//           }}>
//           <HomeScreenHeaderRight  isDisplayingFromHome={false}/>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const BackOnlyHeader = props => {
//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           height: 51,
//           width: '100%',
//           backgroundColor: '#FFF',
//           elevation: 1,
//         }}>
//         <Image
//           source={require('../../assets/images/shadow-hdr.png')}
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             backgroundColor: 'lightgrey',
//             width: Dimensions.get('screen').width,
//             height: 0.5,
//             shadowColor: 'black',
//             shadowOffset: {width: 1, height: 5},
//             shadowOpacity: 0.5,
//             shadowRadius: 3,
//           }}
//           resizeMode="stretch"
//         />
//         <TouchableOpacity onPress={props.onBackPress}>
//           <Image
//             source={require('../../assets/images/left-arrow-personal.png')}
//             height={46}
//             width={29}
//             style={{left: 5, position: 'absolute'}}
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const HeaderWithTitle = props => {
//   return (
//     <SafeAreaView>
//       <View
//         style={[
//           {
//             height: 51,
//             width: '100%',
//             backgroundColor: '#FFF',
//             elevation: 1,
//             flexDirection: 'row',
//             alignItems: 'center',
//           },
//           props.titleCenter && {
//             justifyContent: 'center',
//           },
//         ]}>
//         <Image
//           source={require('../../assets/images/shadow-hdr.png')}
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             backgroundColor: 'lightgrey',
//             width: Dimensions.get('screen').width,
//             height: 0.5,
//             shadowColor: 'black',
//             shadowOffset: {width: 1, height: 5},
//             shadowOpacity: 0.5,
//             shadowRadius: 3,
//           }}
//           resizeMode="stretch"
//         />

//         <TouchableOpacity
//           style={[props.titleCenter && {position: 'absolute'}, {left: 5}]}
//           onPress={props.onBackPress}>
//           <Image
//             source={require('../../assets/images/left-arrow-personal.png')}
//             height={46}
//             width={29}
//             // style={{left: 5}}
//           />
//         </TouchableOpacity>
//         <View>
//           <Text
//             style={[
//               {
//                 fontSize: 18,
//                 fontFamily: 'CeraPRO-Medium',
//                 color: '#413000',
//               },
//               !props.titleCenter && {
//                 marginLeft: 10,
//                 marginTop: 5,
//               },
//               props.titleStyle,
//             ]}>
//             {props.screenName}
//           </Text>
//         </View>

//         <TouchableOpacity
//           onPress={() => props.rightIconOnPress?.()}
//           style={{position: 'absolute', right: 10}}>
//           {props.rightIcon}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const HeaderWithStep = props => {
//   const [ispanIndia, setIspanIndia] = useState();
//   const [step, setStep] = useState([1, 2, 3]);

//   useEffect(() => {
//     if (props?.isPanIndia != undefined) {
//       if (props.isPanIndia) {
//         setStep([1, 2, 3]);
//       } else {
//         setStep([1, 2, 3, 4]);
//       }
//     }
//   }, [props?.isPanIndia]);
//   // const steps = [1, 2, 3, 4];
//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           height: 51,
//           width: '100%',
//           backgroundColor: '#FFF',
//           elevation: 1,
//           flexDirection: 'row',
//           justifyContent: 'center',
//         }}>
//         <Image
//           source={require('../../assets/images/shadow-hdr.png')}
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             backgroundColor: 'lightgrey',
//             width: Dimensions.get('screen').width,
//             height: 0.5,
//             shadowColor: 'black',
//             shadowOffset: {width: 1, height: 5},
//             shadowOpacity: 0.5,
//             shadowRadius: 3,
//           }}
//           resizeMode="stretch"
//         />
//         <TouchableOpacity
//           style={{left: 5, position: 'absolute'}}
//           onPress={props.onBackPress}>
//           <Image
//             source={require('../../assets/images/left-arrow-personal.png')}
//             height={46}
//             width={29}
//           />
//         </TouchableOpacity>

//         <View
//           style={{
//             flexDirection: 'row',
//             // alignItems: 'center'
//           }}>
//           {step?.map((i, idx) => {
//             if (props.stepNumber == idx + 1) {
//               return (
//                 <ImageBackground
//                   style={{
//                     width: 48,
//                     height: 58,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                   source={require('../../assets/images/checkout-step1-circle-select.png')}>
//                   <Text
//                     style={{
//                       fontSize: 24,
//                       fontFamily: 'CeraPRO-Medium',
//                       color: '#fff',
//                     }}>
//                     {idx + 1}
//                   </Text>
//                 </ImageBackground>
//               );
//             } else {
//               return (
//                 <TouchableOpacity activeOpacity={1} onPress={() => {props.screenNumberUserWantsToNavigate(idx + 1)}}>
//                 <View
//                   style={{
//                     borderColor: '#dddddd',
//                     borderWidth: 2,
//                   }}>
//                   <ImageBackground
//                     style={{
//                       width: 48,
//                       height: 47,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       borderColor: 'red',
//                     }}
//                     source={require('../../assets/images/checkout-step1-circle-default.png')}>
//                     <Text
//                       style={{
//                         fontSize: 24,
//                         fontFamily: 'CeraPRO-Medium',
//                         color: '#000000',
//                       }}>
//                       {idx + 1}
//                     </Text>
//                   </ImageBackground>
//                 </View>
//                 </TouchableOpacity>
//               );
//             }
//           })}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const HeaderWithSearchBar = props => {
//   const [searchText, onChangeSearchText] = useState('');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const cartCount = useSelector(state => state.cartData.cartCount);
//   const countHowManyProductFun = async () => {
//     dispatch(grtCardCountFun());
//   };
//   var inputEl = false;
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     countHowManyProductFun();
//   }, []);

//   // useEffect(() => {
//   // //  console.log("textareaRef.current",textareaRef.current._internalFiberInstanceHandleDEV.memoizedProps.onBlur());
//   //  if(props.keyBoardStatus){
//   //    if(textareaRef)
//   //      if(textareaRef.current)
//   //       if(textareaRef.current._internalFiberInstanceHandleDEV)
//   //         if(textareaRef.current._internalFiberInstanceHandleDEV.memoizedProps)
//   //              textareaRef.current._internalFiberInstanceHandleDEV.memoizedProps.onBlur()
//   //  }
//   // },[props.keyBoardStatus])

//   const setSearchString = text => {
//     onChangeSearchText(text);
//     props.searchString(text);
//   };

//   return (
//     <>
//       <SafeAreaView style={{flex: 1}}>
//         <View
//           style={{
//             height: 51,
//             width: '100%',
//             backgroundColor: '#FFF',
//             elevation: 1,
//             flexDirection: 'row',
//             // justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             style={{marginHorizontal: 5}}
//             onPress={() => {
//               setSearchString('');
//               props.onBackPress();
//             }}>
//             <Image
//               source={require('../../assets/images/left-arrow-personal.png')}
//               height={46}
//               width={29}
//             />
//           </TouchableOpacity>

//           <View style={{flex: 1, height: 51}}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 height: 45,
//                 width: '100%',
//                 marginTop: 2,
//               }}>
//               <Image
//                 source={require('../../assets/images/search-icon-search.png')}
//                 style={{
//                   height: 40,
//                   width: 44,
//                 }}
//               />
//               <TextInput
//                 style={{
//                   width: '60%',
//                   height: '100%',
//                   backgroundColor: 'transparent',
//                   color: 'black',
//                   fontSize: 16,
//                   fontFamily: 'CeraPRO-Regular',
//                   // paddingTop : 10
//                 }}
//                 // ref={inputEl}
//                 placeholderTextColor={'#757575'}
//                 onChangeText={setSearchString}
//                 value={searchText}
//                 placeholder="Search"
//                 keyboardType="default"
//                 // autoFocus={inputEl}
//                 // onSubmitEditing={Keyboard.dismiss}
//                 ref={textareaRef}
//                 onFocus={(e) => e.persist()}
//               />
//               {searchText !== '' && (
//                 <TouchableOpacity
//                   style={{marginLeft: 10}}
//                   onPress={() => {
//                     setSearchString('');
//                   }}>
//                   <Image
//                     source={require('../../assets/images/search-cross-icon.png')}
//                     style={{width: 40, height: 44}}
//                   />
//                 </TouchableOpacity>
//               )}
//             </View>
//             <Image
//               source={require('../../assets/images/shadow-hdr.png')}
//               style={{
//                 backgroundColor: 'lightgrey',
//                 width: '100%',
//                 height: 0.5,
//                 shadowColor: 'black',
//                 shadowOffset: {width: 1, height: 5},
//                 shadowOpacity: 0.5,
//                 shadowRadius: 3,
//                 // marginBottom : 10
//               }}
//               resizeMode="stretch"
//             />
//           </View>

//           {/* <View style={{ width: '20%', alignItems: 'flex-end' }}>
//             <Image source={require("../../assets/images/icon-cart-hdr.png")} style={{
//               width: 40, height: 40,
//             }} />
//           </View> */}

//           <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
//             <ImageBackground
//               style={{
//                 width: 48,
//                 height: 47,
//                 marginRight: Platform.OS === 'ios' ? 5 : 0,
//               }}
//               source={require('../../assets/images/icon-cart-hdr.png')}>
//               {cartCount?.count > 0 ? (
//                 <View style={{position: 'absolute', right: 3, top: 6}}>
//                   <ImageBackground
//                     style={{
//                       width: 18,
//                       height: 19,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                     source={require('../../assets/images/cartpopup-cart-bg.png')}>
//                     <Text
//                       style={{
//                         color: '#FFFFFF',
//                         fontFamily: 'CeraPRO-Medium',
//                         fontSize: 11,
//                       }}>
//                       {cartCount?.count}
//                     </Text>
//                   </ImageBackground>
//                 </View>
//               ) : null}
//             </ImageBackground>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export const BackHeaderWithRightIcon = props => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
//   const [isChangePincodeOpen, setIsChangePincodeOpen] = useState(false);
//   const cartCount = useSelector(state => state.cartData.cartCount);

//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   const countHowManyProductFun = async () => {
//     dispatch(grtCardCountFun());
//   };

//   useEffect(() => {
//     countHowManyProductFun();
//   }, []);

//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           height: 51,
//           width: '100%',
//           backgroundColor: '#FFF',
//           elevation: 1,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <View>
//           <Image
//             source={require('../../assets/images/shadow-hdr.png')}
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               backgroundColor: 'lightgrey',
//               width: Dimensions.get('screen').width,
//               height: 0.5,
//               shadowColor: 'black',
//               shadowOffset: {width: 1, height: 5},
//               shadowOpacity: 0.5,
//               shadowRadius: 3,
//             }}
//             resizeMode="stretch"
//           />
//           <TouchableOpacity onPress={props.onBackPress}>
//             <Image
//               source={require('../../assets/images/left-arrow-personal.png')}
//               height={46}
//               width={29}
//               style={{left: 5, position: 'absolute'}}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Search');
//             }}>
//             <Image
//               style={{width: 48, height: 47}}
//               source={require('../../assets/images/icon-search-personal-screen.png')}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
//             <ImageBackground
//               style={{
//                 width: 48,
//                 height: 47,
//                 marginRight: Platform.OS === 'ios' ? 5 : 0,
//               }}
//               source={require('../../assets/images/icon-cart-hdr.png')}>
//               {cartCount?.count > 0 ? (
//                 <View style={{position: 'absolute', right: 3, top: 6}}>
//                   <ImageBackground
//                     style={{
//                       width: 18,
//                       height: 19,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}
//                     source={require('../../assets/images/cartpopup-cart-bg.png')}>
//                     <Text
//                       style={{
//                         color: '#FFFFFF',
//                         fontFamily: 'CeraPRO-Medium',
//                         fontSize: 11,
//                       }}>
//                       {cartCount?.count}
//                     </Text>
//                   </ImageBackground>
//                 </View>
//               ) : null}
//             </ImageBackground>
//           </TouchableOpacity>

//           {Platform.OS === 'android' ? (
//             <TouchableOpacity
//               onPress={() => {
//                 // setIsRightDrawerOpen(!isRightDrawerOpen);
//               }}>
//               <Image
//                 style={{width: 48, height: 47}}
//                 source={require('../../assets/images/right-menu-icon.png')}
//               />
//             </TouchableOpacity>
//           ) : null}
//         </View>
//         {isRightDrawerOpen && renderRightSideDrawer()}
//         {isChangePincodeOpen && (
//           <ChangePincode
//             callBack={() => {
//               toggleChangePincodeModal();
//             }}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };
