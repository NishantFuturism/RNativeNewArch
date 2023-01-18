// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
// import Colors from '../constants/Colors';
// import {theme} from '../constants/Theme';
// import {
//   fetchAddToCart,
//   fetchUpdateCart,
//   fetchUpdateCartWithAttribute,
//   getCartDetailsFun,
//   remopveCartFUN,
//   fetchAddEGiftVoucherToCart,
// } from '../redux/actions/Cart';
// import {
//   getMultiple,
//   _retrieveData,
//   addNetcoreItem,
//   removeNetcoreItem,
//   moengageEvent,
//   checkProductAvailabilityInCart,
//   logFirebaseEvent,
// } from '../utility/Helper';
// import AsyncStorageKeys from '../utility/AsyncStorageKeys';
// import Network from '../utility/Network';
// import Types from '../redux/Types';
// import {useDispatch, useSelector} from 'react-redux';
// import {getVersion} from 'react-native-device-info';
// import {useNavigation} from '@react-navigation/native';
// import {useFocusEffect} from '@react-navigation/native';
// import Toast from 'react-native-simple-toast';
// import networkFactory from '../utility/Network';
// import {notifyMeFun} from '../redux/actions/Product';
// import RecipentEmailPopup from '../components/RecipentEmailPopup';
// import {AppEventsLogger, Settings} from 'react-native-fbsdk-next';
// import appsFlyer from 'react-native-appsflyer';

// export const ProductsListItem = props => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const productList = useSelector(state => state.product.products);
//   const productListFromLeftMenu = useSelector(
//     state => state.product.productsFromLeftMenu,
//   );
//   const notifyMeData = useSelector(state => state.product.notifyMeData);

//   const cartDetails = useSelector(state => state.cartData.cartDetails);
//   const userLoginFlag = useSelector(state => state.account.userLoginFlag);

//   const [inCart, setIncart] = useState(false);
//   const [productCartQuantity, setProductCartQuantity] = useState(0);

//   const [imgLoading, setImgLoading] = useState(true);
//   const [eGiftEmailModal, setEgiftEmailModal] = useState(false);

//   useEffect(() => {
//     // Settings.initializeSDK();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       setIncart(false);
//       setProductCartQuantity(0);

//       cartDetails?.cartcategories?.map(item => {
//         item?.cartproducts?.map(itm => {
//           if (itm?.productvariantid == props.productData.productvariantid) {
//             setIncart(true);
//             setProductCartQuantity(Number(itm.quantity));
//           }
//         });
//       });
//     }, [cartDetails]),
//   );

//   const removeCart = async (productvariantid, prodIndex) => {
//     let pincode = null;
//     let uid = null;

//     let flagid = null;
//     let warehouseid = null;
//     let ispanindia = null;
//     let privateKey = null;

//     await _retrieveData(AsyncStorageKeys.USERID, '0')
//       .then(value => {
//         uid = value;
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.WAREHOUSEID, '1').then(value => {
//           warehouseid = value;
//         });
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.FLAGID, '2').then(value => {
//           flagid = value;
//         });
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.ISPANINDIA, '0').then(value => {
//           ispanindia = value;
//         });
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.PINCODE, '').then(value => {
//           pincode = value;
//         });
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.PRIVATEKEY, '').then(value => {
//           privateKey = value;
//         });
//       })
//       .then(async () => {
//         await _retrieveData(AsyncStorageKeys.NETCORE_UUID, '').then(value => {
//           tempId = value;
//         });
//       })
//       .catch(error => {
//         console.log('error', error);
//         uid = '0';
//         warehouseid = '1';
//         flagid = '2';
//         ispanindia = '0';
//         pincode = '';
//         privateKey = '';
//         tempId = '';
//       });

//     const headerData = {
//       pKey: networkFactory.funkey,
//       uid: uid,
//       productvariantid: productvariantid,
//       tempid: tempId,
//       flagid: flagid,
//       warehouseid: warehouseid,
//       pincode: pincode,
//       ispanindia: ispanindia,
//       version: getVersion(),
//     };

//     console.log(
//       '------------ remove cart details-----------header data-----------',
//       headerData,
//     );
//     let result = await dispatch(remopveCartFUN(headerData));

//     if (result.status == 1) {
//         moengageEvent('Delete Cart', {
//            productName: props.productData.productname,
//            varId: productvariantid,
//            price: parseFloat(props.productData.sellingprice),
//            pincode: pincode,
//          });

//            appsFlyer.logEvent( 'af_remove_from_cart',
//             {
//               af_product_name: props.productData.productname,
//               af_content_id:productvariantid,
//               af_price:parseFloat(props.productData.sellingprice),
//               af_pincode: pincode,

//             },
//             (res) => {
//               console.log("remove cart success ",res);
//             },
//             (err) => {
//               console.error("remove cart error ",err);
//             },
//           );

//       setIncart(false);
//       setProductCartQuantity(0);
//       props?.initialFetch?.();
//       if (props.productData.from == 'leftMenu') {
//         console.log('inside update cart leftmenu func...', prodIndex);
//         productListFromLeftMenu[prodIndex].quantity = 0;
//         dispatch({
//           type: Types.PRODUCTS.PRODUCT_LIST_LEFTMENU_SUCCESS,
//           payload: [...productListFromLeftMenu],
//         });
//       }
//       if (props.productData?.dataFromNetcore == true) {
//         removeNetcoreItem({
//           productid: props.productData?.productid,
//           productvarientid: productvariantid,
//           qty: 0,
//         });
//       }
//     }
//   };

//   const updateCartWithAttr = (prodVarId, attrId, attrName, prodIndex, qty) => {
//     if (qty == 0) {
//       removeCart(prodVarId, prodIndex);
//       return;
//     }
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//       AsyncStorageKeys.PINCODE,
//       AsyncStorageKeys.ISPANINDIA,
//     ]).then(async values => {
//       const header = {
//         pKey: Network.funkey,
//         uid: values[0][1] == null ? '0' : values[0][1],
//         productvariantid: prodVarId,
//         quantity: qty,
//         flagid: values[1][1] == null ? '2' : values[1][1],
//         tempid: values[2][1],
//         warehouseid: values[3][1],
//         pincode: values[4][1],
//         ispanindia: values[5][1],
//         attributeid: attrId,
//         attributename: attrName,
//         version: getVersion(),
//         from: '',
//       };
//       await dispatch(fetchUpdateCartWithAttribute(header)).then(
//         async response => {
//           console.log('\n\n\n\n\n status', response);
//           if (response.status == 1) {
//             Toast.show(response.message, Toast.SHORT, [
//               'RCTModalHostViewController',
//             ]);

//             await dispatch(getCartDetailsFun());

//             checkProductAvailabilityInCart(prodVarId).then(qty => {
//               AppEventsLogger.logEvent(
//                 'nb_add_to_cart',
//                 parseFloat(qty * parseFloat(props.productData.sellingprice)),
//                 {
//                   product_name: props.productData.productname,
//                   product_varient_id: prodVarId,
//                   product_name: JSON.stringify([
//                     {
//                       productName: props.productData.productname,
//                       varId: prodVarId,
//                       mrp: parseFloat(props.productData.mrp),
//                       price: parseFloat(props.productData.sellingprice),
//                       totalPrice: parseFloat(
//                         qty * parseFloat(props.productData.sellingprice),
//                       ),
//                       cartQty: qty,
//                       pincode: values[4][1],
//                     },
//                   ]),
//                 },
//               );

//               if (action == 'increase') {
//                 moengageEvent('Add Quantity To Cart', {
//                   productName: props.productData.productname,
//                   varId: prodVarId,
//                   mrp: parseFloat(props.productData.mrp),
//                   price: parseFloat(props.productData.sellingprice),
//                   totalPrice: parseFloat(
//                     qty * parseFloat(props.productData.sellingprice),
//                   ),
//                   cartQty: qty,
//                   pincode: values[4][1],
//                 });
//               } else {
//                 moengageEvent('Remove Quantity To Cart', {
//                   productName: props.productData.productname,
//                   varId: prodVarId,
//                   mrp: parseFloat(props.productData.mrp),
//                   price: parseFloat(props.productData.sellingprice),
//                   totalPrice: parseFloat(
//                     qty * parseFloat(props.productData.sellingprice),
//                   ),
//                   cartQty: qty,
//                   pincode: values[4][1],
//                 });

//               }

//               appsFlyer.logEvent(
//                 'af_add_to_cart',
//                 {

//                   af_product_name: props.productData.productname,
//                   af_content_id:prodVarId,
//                   af_mrp: parseFloat(props.productData.mrp),
//                   af_price: parseFloat(props.productData.sellingprice),
//                   af_quantity	: qty,
//                   af_city: values[7][1] == null ? '' : values[7][1],
//                   af_pincode: values[4][1],
//                },
//                 res => {
//                   console.log('add to cart success ', res);
//                 },
//                 err => {
//                   console.error('add to cart error ', err);
//                 },
//               );
//             });

//             if (props.productData.from == 'leftMenu') {
//               productListFromLeftMenu[prodIndex].quantity = qty;
//               dispatch({
//                 type: Types.PRODUCTS.PRODUCT_LIST_LEFTMENU_SUCCESS,
//                 payload: [...productListFromLeftMenu],
//               });
//             } else {
//               productList.searchproducts[prodIndex].quantity = qty;

//               dispatch({
//                 type: Types.PRODUCTS.PRODUCT_LIST_SUCCESS,
//                 payload: {...productList},
//               });
//             }
//           } else {
//             Toast.show(response.message, Toast.SHORT, [
//               'RCTModalHostViewController',
//             ]);
//           }
//         },
//       );
//     });
//   };

//   const addToCart = (prodVarId, prodIndex, prodId) => {
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//       AsyncStorageKeys.PINCODE,
//       AsyncStorageKeys.ISPANINDIA,
//       AsyncStorageKeys.PRIVATEKEY,
//       AsyncStorageKeys.CITYNAMEFORMOENGAGE,
//     ]).then(async values => {
//       const header = {
//         pKey: Network.funkey,
//         uid: values[0][1] == null ? '0' : values[0][1],
//         productvariantid: prodVarId,
//         quantity: 1,
//         flagid: values[1][1] == null ? '2' : values[1][1],
//         tempid: values[2][1],
//         warehouseid: values[3][1],
//         pincode: values[4][1],
//         ispanindia: values[5][1],
//         version: getVersion(),
//         from: '',
//         privatekey: values[6][1] == null ? '0' : values[6][1],
//       };
//       await dispatch(fetchAddToCart(header)).then(async response => {
//         if (response.status == 1) {
//           Toast.show(response.message, Toast.SHORT, [
//             'RCTModalHostViewController',
//           ]);
//           await dispatch(getCartDetailsFun());

//           checkProductAvailabilityInCart(prodVarId).then(qty => {
//             console.log('displaying cart qyantity...', qty);

//             AppEventsLogger.logEvent(
//               'nb_add_to_cart',
//               parseFloat(qty * parseFloat(props.productData.sellingprice)),
//               {
//                 product_name: props.productData.productname,
//                 Product_varient_id: prodVarId,
//                 product_data: JSON.stringify([
//                   {
//                     productName: props.productData.productname,
//                     varId: prodVarId,
//                     mrp: parseFloat(props.productData.mrp),
//                     price: parseFloat(props.productData.sellingprice),
//                     totalPrice: parseFloat(
//                       qty * parseFloat(props.productData.sellingprice),
//                     ),
//                     cartQty: qty,
//                     city: values[7][1] == null ? '' : values[7][1],
//                     source: '',
//                     pincode: values[4][1],
//                   },
//                 ]),
//               },
//             );
//             moengageEvent('Add To Cart', {
//               productName: props.productData.productname,
//               varId: prodVarId,
//               mrp: parseFloat(props.productData.mrp),
//               price: parseFloat(props.productData.sellingprice),
//               totalPrice: parseFloat(
//                 qty * parseFloat(props.productData.sellingprice),
//               ),
//               cartQty: qty,
//               city: values[7][1] == null ? '' : values[7][1],
//               source: '',
//               pincode: values[4][1],
//             });

//             appsFlyer.logEvent(
//               'af_add_to_cart',
//               {
//                 af_product_name: props.productData.productname,
//                   af_content_id:prodVarId,
                  
//                   af_mrp: parseFloat(props.productData.mrp),
//                   af_price: parseFloat(props.productData.sellingprice),
//                   af_quantity	: qty,
//                   af_city: values[7][1] == null ? '' : values[7][1],
//                   af_pincode: values[4][1],
//                },
//               res => {
//                 console.log('add to cart success ', res);
//               },
//               err => {
//                 console.error('add to cart error ', err);
//               },
//             );
//           });

//           if (props.productData.from == 'leftMenu') {
//             productListFromLeftMenu[prodIndex].quantity = 1;
//             dispatch({
//               type: Types.PRODUCTS.PRODUCT_LIST_LEFTMENU_SUCCESS,
//               payload: [...productListFromLeftMenu],
//             });
//           } else {
//             if (prodIndex !== null && prodIndex !== undefined) {
//               productList.searchproducts[prodIndex].quantity = 1;
//               //ƒconsole.log('quantity set to 1',productList.searchproducts[prodIndex]);

//               dispatch({
//                 type: Types.PRODUCTS.PRODUCT_LIST_SUCCESS,
//                 payload: {...productList},
//               });
//             }
//           }

//           if (props.productData?.dataFromNetcore == true) {
//             //let qty = checkProductAvailabilityInCart(prodVarId);
//             addNetcoreItem({
//               productid: prodId,
//               productvarientid: prodVarId,
//               qty: 1,
//             });
//           }

//           logFirebaseEvent('add_to_cart', {
//             product_variant_id: prodVarId,
//           });

//           if (props.catName == 'Membership Plans') {
//             props.navigation.popToTop();
//             props.navigation.navigate('MyCart');
//           }
//         } else {
//           Toast.show(response.message, Toast.SHORT, [
//             'RCTModalHostViewController',
//           ]);
//         }
//       });
//     });
//   };

//   const updateCart = (prodVarId, prodIndex, qty, action) => {
//     if (qty == 0) {
//       removeCart(prodVarId, prodIndex);
//       return;
//     }
//     getMultiple([
//       AsyncStorageKeys.USERID,
//       AsyncStorageKeys.FLAGID,
//       AsyncStorageKeys.NETCORE_UUID,
//       AsyncStorageKeys.WAREHOUSEID,
//       AsyncStorageKeys.PINCODE,
//       AsyncStorageKeys.ISPANINDIA,
//     ]).then(async values => {
//       const header = {
//         pKey: Network.funkey,
//         uid: values[0][1] == null ? '0' : values[0][1],
//         productvariantid: prodVarId,
//         quantity: qty,
//         flagid: values[1][1] == null ? '2' : values[1][1],
//         tempid: values[2][1],
//         warehouseid: values[3][1],
//         pincode: values[4][1],
//         ispanindia: values[5][1],
//         version: getVersion(),
//         from: '',
//       };
//       await dispatch(fetchUpdateCart(header)).then(async response => {
//         if (response.status == 1) {
//           Toast.show(response.message, Toast.SHORT, [
//             'RCTModalHostViewController',
//           ]);

//           await dispatch(getCartDetailsFun());

//           checkProductAvailabilityInCart(prodVarId).then(qty => {
//             AppEventsLogger.logEvent(
//               'nb_add_to_cart',
//               parseFloat(qty * parseFloat(props.productData.sellingprice)),
//               {
//                 product_name: props.productData.productname,
//                 Product_varient_id: prodVarId,
//                 product_data: JSON.stringify([
//                   {
//                     productName: props.productData.productname,
//                     varId: prodVarId,
//                     mrp: parseFloat(props.productData.mrp),
//                     price: parseFloat(props.productData.sellingprice),
//                     totalPrice: parseFloat(
//                       qty * parseFloat(props.productData.sellingprice),
//                     ),
//                     cartQty: qty,
//                     cartQty: values[4][1],
//                   },
//                 ]),
//               },
//             );

//             if (action == 'increase') {
//               moengageEvent('Add Quantity To Cart', {
//                 productName: props.productData.productname,
//                 varId: prodVarId,
//                 mrp: parseFloat(props.productData.mrp),
//                 price: parseFloat(props.productData.sellingprice),
//                 totalPrice: parseFloat(
//                   qty * parseFloat(props.productData.sellingprice),
//                 ),
//                 cartQty: qty,
//                 pincode: values[4][1],
//               });
//             } else {
//               moengageEvent('Remove Quantity To Cart', {
//                 productName: props.productData.productname,
//                 varId: prodVarId,
//                 mrp: parseFloat(props.productData.mrp),
//                 price: parseFloat(props.productData.sellingprice),
//                 totalPrice: parseFloat(
//                   qty * parseFloat(props.productData.sellingprice),
//                 ),
//                 cartQty: qty,
//                 pincode: values[4][1],
//               });
//             }
//             appsFlyer.logEvent(
//               'af_add_to_cart',
//               {
//                 af_product_name: props.productData.productname,
//                   af_content_id:prodVarId,
                  
//                   af_mrp: parseFloat(props.productData.mrp),
//                   af_price: parseFloat(props.productData.sellingprice),
//                   af_quantity	: qty,
//                   af_city: values[7][1] == null ? '' : values[7][1],
//                   af_pincode: values[4][1],
//                   },
//               res => {
//                 console.log('add to cart success ', res);
//               },
//               err => {
//                 console.error('add to cart error ', err);
//               },
//             );
//           });

//           if (props.productData.from == 'leftMenu') {
//             console.log('inside update cart leftmenu func...', prodIndex);
//             productListFromLeftMenu[prodIndex].quantity = qty;
//             dispatch({
//               type: Types.PRODUCTS.PRODUCT_LIST_LEFTMENU_SUCCESS,
//               payload: [...productListFromLeftMenu],
//             });
//           } else {
//             productList.searchproducts[prodIndex].quantity = qty;
//             //ƒconsole.log('quantity set to 1',productList.searchproducts[prodIndex]);

//             dispatch({
//               type: Types.PRODUCTS.PRODUCT_LIST_SUCCESS,
//               payload: {...productList},
//             });
//           }

//           logFirebaseEvent('add_to_cart', {
//             product_variant_id: prodVarId,
//           });
//         } else {
//           Toast.show(response.message, Toast.SHORT, [
//             'RCTModalHostViewController',
//           ]);
//         }
//       });
//     });
//   };

//   const updateEgvToCart = (quantity, action) => {
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
//         quantity: quantity,
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
//         egvid: 1,
//         emailid: '',
//         from: 'GIFTCARD',
//         privateKey: values[7][1] === null ? '0' : values[7][1],
//       };

//       await dispatch(fetchAddEGiftVoucherToCart(funckey)).then(
//         async response => {
//           if (response.status == 1) {
//             Toast.show(response.message, Toast.SHORT, [
//               'RCTModalHostViewController',
//             ]);

//             checkProductAvailabilityInCart(prodVarId).then(qty => {
//               AppEventsLogger.logEvent(
//                 'nb_add_to_cart',
//                 parseFloat(qty * parseFloat(props.productData.sellingprice)),
//                 {
//                   product_name: props.productData.productname,
//                   product_varient_id: props.productData.productvariantid,
//                   product_data: JSON.stringify([
//                     {
//                       productName: props.productData.productname,
//                       varId: props.productData.productvariantid,
//                       mrp: parseFloat(props.productData.mrp),
//                       price: parseFloat(props.productData.sellingprice),
//                       totalPrice: parseFloat(
//                         qty * parseFloat(props.productData.sellingprice),
//                       ),
//                       cartQty: qty,
//                       pincode: values[5][1],
//                     },
//                   ]),
//                 },
//               );

//               if (action == 'increase') {
//                 moengageEvent('Add Quantity To Cart', {
//                   productName: props.productData.productname,
//                   varId: props.productData.productvariantid,
//                   mrp: parseFloat(props.productData.mrp),
//                   price: parseFloat(props.productData.sellingprice),
//                   totalPrice: parseFloat(
//                     qty * parseFloat(props.productData.sellingprice),
//                   ),
//                   cartQty: qty,
//                   pincode: values[5][1],
//                 });
//               } else {
//                 moengageEvent('Remove Quantity To Cart', {
//                   productName: props.productData.productname,
//                   varId: props.productData.productvariantid,
//                   mrp: parseFloat(props.productData.mrp),
//                   price: parseFloat(props.productData.sellingprice),
//                   totalPrice: parseFloat(
//                     qty * parseFloat(props.productData.sellingprice),
//                   ),
//                   cartQty: qty,
//                   pincode: values[5][1],
//                 });
//               }

//               appsFlyer.logEvent(
//                 'af_add_to_cart',
//                 {
//                   af_product_name: props.productData.productname,
//                   af_content_id:prodVarId,
                  
//                   af_mrp: parseFloat(props.productData.mrp),
//                   af_price: parseFloat(props.productData.sellingprice),
//                   af_quantity	: qty,
//                   af_city: values[7][1] == null ? '' : values[7][1],
//                   af_pincode: values[4][1],
//                },
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
//               product_variant_id: props.productData.productvariantid,
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

//   const notifyMeHandler = async () => {
//     if (userLoginFlag != '1') {
//       navigation.navigate('Login');
//     } else {
//       // action for notify me

//       let Pincode = null;
//       let UserID = null;
//       let EmailID = null;
//       let WareHouseID = null;
//       let PanIndia = null;
//       let mobileNo = null;

//       await _retrieveData(AsyncStorageKeys.USERID, '0')
//         .then(value => {
//           UserID = value;
//         })
//         .then(async () => {
//           await _retrieveData(AsyncStorageKeys.WAREHOUSEID, '1').then(value => {
//             WareHouseID = value;
//           });
//         })
//         .then(async () => {
//           await _retrieveData(AsyncStorageKeys.USEREMAIL, '').then(value => {
//             EmailID = value;
//           });
//         })
//         .then(async () => {
//           await _retrieveData(AsyncStorageKeys.ISPANINDIA, '0').then(value => {
//             PanIndia = value;
//           });
//         })
//         .then(async () => {
//           await _retrieveData(AsyncStorageKeys.PINCODE, '').then(value => {
//             Pincode = value;
//           });
//         })
//         .then(async () => {
//           await _retrieveData(AsyncStorageKeys.MOBILE, '').then(value => {
//             mobileNo = value;
//           });
//         })
//         .catch(error => {
//           console.log('error', error);
//           UserID = '0';
//           EmailID = '';
//           WareHouseID = WareHouseID;
//           Pincode = '';
//           PanIndia = '';
//           mobileNo = '';
//         });

//       const headerData = {
//         pKey: networkFactory.funkey,
//         UserID: UserID,
//         EmailID: EmailID,
//         ProductID: props.productData.productid,
//         ProductVariantID: props.productData.productvariantid,
//         WareHouseID: WareHouseID,
//         Pincode: Pincode,
//         PanIndia: PanIndia,
//       };
//       const res = await dispatch(notifyMeFun(headerData));

//       if (res.status == 1) {
//         moengageEvent('Notify', {
//           productTitle: props.productData.productname,
//           prodVarId: props.productData.productvariantid,
//           prodId: props.productData.productid,
//           sellingPrice: parseFloat(props.productData.sellingprice),
//           mobileNo: mobileNo,
//           emailId: EmailID,
//           pincode: Pincode,
//         });
//         Toast.show(res.message, Toast.LONG);
//       }
//     }
//   };

//   return (
//     <>
//       {eGiftEmailModal && (
//         <RecipentEmailPopup
//           setModalVisibility={bool => {
//             setEgiftEmailModal(bool);
//           }}
//           visible={eGiftEmailModal}
//           productData={props.productData}
//           prodId={props.productData.productvariantid}
//         />
//       )}
//       <TouchableOpacity
//         onPress={() => {
//           navigation.push('ProductDetails', {
//             productData: {
//               productVariantId: props.productData.productvariantid,
//               productId: props.productData?.productid,
//               deliveryspantime: props.productData.deliveryspantime,
//               ProductTitle: props.productData.productname,
//               SellingPrice: props.productData.sellingprice,
//               MRP: props.productData.mrp,
//               PromoText: props.productData.promotext,
//               availablesizes: props.productData.availableSizes,
//               varproductvariantid: props.productData?.varproductvariantid,
//               varavailablesizes: props.productData?.varavailablesizes,
//               varsellingprice: props.productData?.varsellingprice,
//               varmrp: props.productData?.varmrp,
//               dataFromNetcore: props.productData?.dataFromNetcore,
//               IsMembershipItem: props.productData.IsMembershipItem,
//             },
//           });
//         }}>
//         <View style={styles.innerContainer}>
//           <View
//             style={{
//               marginTop: 5,
//               backgroundColor: '#FFF',
//               borderWidth: 1,
//               borderColor: Colors.dividerColor,
//               borderRadius: 5,
//               width: 97,
//               height: 95,
//               shadowColor: '#000',
//               shadowOffset: {
//                 width: 0,
//                 height: 2,
//               },
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 5,
//             }}>
//             <Image
//               // source={{uri: props.productData.image}}
//               onLoadEnd={() => setImgLoading(false)}
//               source={
//                 props.productData.image && !imgLoading
//                   ? {uri: props.productData.image}
//                   : require('../../assets/images/daily-deal-img-coming-soon.png')
//               }
//               defaultSource={require('../../assets/images/daily-deal-img-coming-soon.png')}
//               style={{
//                 ...styles.productImage,
//                 opacity: props.productData.outofstockflag == 0 ? 0.6 : 1,
//               }}
//               resizeMode="contain"
//             />
//             {props.productData.outofstockflag == 0 ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: 13,
//                   borderWidth: 1,
//                   backgroundColor: 'transparent',
//                   alignSelf: 'center',
//                   paddingHorizontal: 2,
//                   paddingVertical: 2,
//                   borderColor: 'rgba(0,0,0,0.6)',
//                 }}>
//                 <Text
//                   style={{
//                     color: 'rgba(0,0,0,0.6)',
//                     fontFamily: 'CeraPRO-Regular',
//                     fontSize: 12,
//                   }}>
//                   SOLD OUT
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//           <View style={{marginLeft: 10, alignSelf: 'flex-start', flex: 0.85}}>
//             <Text
//               style={styles.lblProdName}
//               numberOfLines={2}
//               ellipsizeMode="tail">
//               {props.productData.productname}
//             </Text>
//             {props.productData.availableSizes == 1 ? (
//               <TouchableOpacity
//                 onPress={() => {
//                   let data = {
//                     type: 'size',
//                     sizeNames: props.productData.varavailablesizes.split(','),
//                     sizePrices: props.productData.varsellingprice.split(','),
//                     sizeMrps: props.productData.varmrp.split(','),
//                     sizeProductVarIds:
//                       props.productData.varproductvariantid.split(','),
//                     selectedProdIndex: props.productIndex,
//                   };
//                   props.sizeSetDataCallback(data);
//                   props.sizeDropdownCallback(true);
//                 }}>
//                 <View style={styles.vwAvailableSizes}>
//                   <Text style={styles.lblSelectedSize}>
//                     {props.productData.size}
//                   </Text>
//                   <Image
//                     source={require('../../assets/images/var-drop-arrow.png')}
//                     style={{marginLeft: 10}}
//                   />
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <Text style={styles.lblSize}>{props.productData.size}</Text>
//             )}
//             <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
//               <Text
//                 style={[
//                   {fontFamily: 'Roboto-Regular', fontSize: 15},
//                   props.productData.sellingprice < props.productData.mrp
//                     ? {color: '#676972'}
//                     : {color: Colors.secondary},
//                 ]}>
//                 MRP
//               </Text>
//               {props.productData.sellingprice < props.productData.mrp ? (
//                 <>
//                   <Text
//                     style={{
//                       marginLeft: 2,
//                       fontFamily: 'Roboto-Regular',
//                       fontSize: 15,
//                       color: '#676972',
//                       textDecorationLine: 'line-through',
//                     }}>
//                     {'\u20B9' + props.productData.mrp}
//                   </Text>
//                   <Text
//                     style={{
//                       marginLeft: 5,
//                       fontFamily: 'Roboto-Regular',
//                       fontSize: 15,
//                       color: Colors.secondary,
//                     }}>
//                     {'\u20B9' + props.productData.sellingprice}
//                   </Text>
//                 </>
//               ) : (
//                 <Text
//                   style={{
//                     marginLeft: 5,
//                     fontFamily: 'Roboto-Regular',
//                     fontSize: 15,
//                     color: Colors.secondary,
//                   }}>
//                   {'\u20B9' + props.productData.sellingprice}
//                 </Text>
//               )}
//             </View>
//             {props.productData.deliveryspantime != '' ? (
//               <Text
//                 style={[
//                   theme.lblDeliverySpanTime,
//                   {marginTop: 10, marginLeft: 0},
//                 ]}>
//                 {' ' + props.productData.deliveryspantime + ' '}
//               </Text>
//             ) : null}
//             {props.productData.promotext != undefined &&
//             props.productData.promotext != null ? (
//               <Text style={theme.lblPromoText}>
//                 {props.productData.promotext}
//               </Text>
//             ) : null}
//           </View>
//           {props.productData.isegift != 1 && (
//             <TouchableOpacity
//               style={{
//                 height: 26,
//                 width: 26,
//                 position: 'absolute',
//                 right: 5,
//               }}
//               onPress={() => {
//                 if (userLoginFlag !== null && userLoginFlag === '1') {
//                   props.setProdVarIdCallback(
//                     props.productData.productvariantid,
//                   );
//                   props.setItemDataForFavourite(props.productData);
//                   props.showFavouritePopupCallback(true);
//                 } else {
//                   navigation.navigate('Login');
//                 }
//               }}>
//               <Image
//                 source={require('../../assets/images/favourites-icon-disabled.png')}
//                 style={{
//                   height: 26,
//                   width: 26,
//                 }}
//               />
//             </TouchableOpacity>
//           )}
//           {props.productData.outofstockflag == 0 ? (
//             <TouchableOpacity
//               style={[
//                 theme.btnAdd,
//                 {
//                   position: 'absolute',
//                   right: 5,
//                   bottom: 25,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 },
//               ]}
//               onPress={() => {
//                 notifyMeHandler();
//               }}>
//               <Text style={[theme.lblAdd, {fontSize: 13}]}>Notify Me</Text>
//             </TouchableOpacity>
//           ) : (
//             <>
//               {props.productData.quantity == 0 &&
//                 props.productData.isegift != 1 &&
//                 props.productData.IsMembershipItem != 1 &&
//                 inCart == false && (
//                   <TouchableOpacity
//                     style={[
//                       theme.btnAdd,
//                       {position: 'absolute', right: 5, bottom: 25},
//                     ]}
//                     onPress={async () => {
//                       await _retrieveData(AsyncStorageKeys.PINCODE, '').then(
//                         pincode => {
//                           if (pincode == '')
//                             props.pincodeModalToggleCallback(true);
//                           else {
//                             if (
//                               props.productData.attributestatus == 1 &&
//                               props.productData.attributeid.split(',').length >
//                                 1
//                             ) {
//                               let data = {
//                                 type: 'attribute',
//                                 attrIds:
//                                   props.productData.attributeid.split(','),
//                                 attrNames:
//                                   props.productData.attributename.split(','),
//                                 selectedAttr:
//                                   props.productData.selectedAttributeId,
//                                 selectedAttrName:
//                                   props.productData.selectedAttributeName,
//                                 selectedProdIndex: props.productIndex,
//                               };
//                               props.sizeSetDataCallback(data);
//                               props.sizeDropdownCallback(true);
//                             } else {
//                               console.log('ProductDATATATA', props.productData);
//                               if (
//                                 !eGiftEmailModal &&
//                                 props.productData &&
//                                 props.productData.isegift == 1
//                               ) {
//                                 setEgiftEmailModal(true);
//                               } else {
//                                 addToCart(
//                                   props.productData.productvariantid,
//                                   props.productIndex,
//                                   props.productData.productid,
//                                 );
//                               }
//                             }
//                           }
//                         },
//                       );
//                     }}>
//                     <Text style={theme.lblAdd}>ADD</Text>
//                   </TouchableOpacity>
//                 )}
//               {props.productData.isegift != 1 &&
//                 props.productData.IsMembershipItem != 1 &&
//                 inCart == true &&
//                 props.catName != 'Membership Plans' && (
//                   <View
//                     style={[
//                       styles.quantityView,
//                       {position: 'absolute', right: 0, bottom: 25},
//                     ]}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         if (props.productData.attributestatus == 1) {
//                           updateCartWithAttr(
//                             props.productData.productvariantid,
//                             props.productData.selectedAttributeId,
//                             props.productData.selectedAttributeName,
//                             props.productIndex,
//                             props.productData.quantity
//                               ? props.productData.quantity - 1
//                               : productCartQuantity - 1,
//                             'decrease',
//                           );
//                         } else {
//                           if (props.productData.isegift == 1) {
//                             updateEgvToCart(
//                               props.productData.quantity
//                                 ? props.productData.quantity - 1
//                                 : productCartQuantity - 1,
//                               'decrease',
//                             );
//                           } else {
//                             updateCart(
//                               props.productData.productvariantid,
//                               props.productIndex,
//                               props.productData.quantity
//                                 ? props.productData.quantity - 1
//                                 : productCartQuantity - 1,
//                               'decrease',
//                             );
//                           }
//                         }
//                       }}
//                       style={styles.quantityValue}>
//                       <Image
//                         source={require('../../assets/images/icon-rounded-minus.png')}
//                         style={{width: 25, height: 14}}
//                       />
//                     </TouchableOpacity>
//                     <Text style={styles.quantityVal}>
//                       {props.productData.quantity || productCartQuantity}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => {
//                         if (props.productData.attributestatus == 1) {
//                           updateCartWithAttr(
//                             props.productData.productvariantid,
//                             props.productData.selectedAttributeId,
//                             props.productData.selectedAttributeName,
//                             props.productIndex,
//                             props.productData.quantity
//                               ? props.productData.quantity + 1
//                               : productCartQuantity + 1,
//                             'increase',
//                           );
//                         } else {
//                           if (props.productData.isegift == 1) {
//                             updateEgvToCart(
//                               props.productData.quantity
//                                 ? props.productData.quantity + 1
//                                 : productCartQuantity + 1,
//                               'increase',
//                             );
//                           } else {
//                             updateCart(
//                               props.productData.productvariantid,
//                               props.productIndex,
//                               props.productData.quantity
//                                 ? props.productData.quantity + 1
//                                 : productCartQuantity + 1,
//                               'increase',
//                             );
//                           }
//                         }
//                       }}
//                       style={styles.quantityValue}>
//                       <Image
//                         source={require('../../assets/images/icon-rounded-plus.png')}
//                         style={{width: 25, height: 14}}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               {(props.productData.isegift == 1 ||
//                 props.productData.IsMembershipItem == 1) && (
//                 <TouchableOpacity
//                   style={[
//                     theme.btnAdd,
//                     {position: 'absolute', right: 5, bottom: 25},
//                   ]}
//                   onPress={async () => {
//                     await _retrieveData(AsyncStorageKeys.PINCODE, '').then(
//                       pincode => {
//                         if (pincode == '')
//                           props.pincodeModalToggleCallback(true);
//                         else {
//                           if (
//                             props.productData.attributestatus == 1 &&
//                             props.productData.attributeid.split(',').length > 1
//                           ) {
//                             let data = {
//                               type: 'attribute',
//                               attrIds: props.productData.attributeid.split(','),
//                               attrNames:
//                                 props.productData.attributename.split(','),
//                               selectedAttr:
//                                 props.productData.selectedAttributeId,
//                               selectedAttrName:
//                                 props.productData.selectedAttributeName,
//                               selectedProdIndex: props.productIndex,
//                             };
//                             props.sizeSetDataCallback(data);
//                             props.sizeDropdownCallback(true);
//                           } else {
//                             console.log('ProductDATATATA', props.productData);
//                             if (
//                               !eGiftEmailModal &&
//                               props.productData &&
//                               props.productData.isegift == 1
//                             ) {
//                               if (
//                                 userLoginFlag !== null &&
//                                 userLoginFlag === '1'
//                               ) {
//                                 setEgiftEmailModal(true);
//                               } else {
//                                 navigation.navigate('Login');
//                               }
//                             } else {
//                               addToCart(
//                                 props.productData.productvariantid,
//                                 props.productIndex,
//                                 props.productData.productid,
//                               );
//                             }
//                           }
//                         }
//                       },
//                     );
//                   }}>
//                   <Text style={theme.lblAdd}>ADD</Text>
//                 </TouchableOpacity>
//               )}
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   innerContainer: {
//     flexDirection: 'row',
//   },
//   productImage: {
//     width: 95,
//     height: 95,
//   },
//   lblProdName: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: 15,
//     color: '#402E00',
//     //width: 250,
//     marginRight: 5,
//   },
//   vwAvailableSizes: {
//     paddingLeft: 10,
//     paddingRight: 10,
//     marginTop: 12,
//     flexDirection: 'row',
//     alignSelf: 'baseline',
//     alignItems: 'center',
//     height: 32,
//     borderWidth: 1,
//     borderColor: '#d2d2d2',
//   },
//   lblSelectedSize: {
//     color: '#676972',
//     fontSize: 14,
//     fontFamily: 'CeraPRO-Regular',
//     textAlignVertical: 'center',
//   },
//   lblSize: {
//     marginTop: 12,
//     color: '#181b1f',
//     fontSize: 17,
//     fontFamily: 'CeraPRO-Regular',
//   },
//   quantityView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityVal: {
//     fontSize: 16,
//     color: '#C40E59',
//     paddingHorizontal: 15,
//     marginVertical: 10,
//   },
//   quantityValue: {
//     borderColor: '#d2d2d2',
//     borderWidth: 1,
//     width: 35,
//     height: 30,
//     borderRadius: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 3,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default ProductsListItem;
