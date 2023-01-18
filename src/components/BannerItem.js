// import React, {useEffect, useState} from 'react';
// import {TouchableOpacity, Image, StyleSheet} from 'react-native';
// import appsFlyer from 'react-native-appsflyer';
// import AsyncStorageKeys from '../utility/AsyncStorageKeys';
// import {moengageEvent, _retrieveData} from '../utility/Helper';

// export const BannerItem = ({item, index, navigation}) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={styles.container}
//       onPress={() => {
//         console.log('banner clicked: ', JSON.stringify(item));

//         _retrieveData(AsyncStorageKeys.PINCODE, '').then(pincode => {
//           moengageEvent('Banner Click', {
//             bannerName: item.BannerName,
//             bannerId: item.webbannerid,
//             pincode: pincode,
//           });
//         });

//         switch (item.AppBannerPage) {
//           case 'Category':
//             navigation.navigate('ProductList', {
//               productData: {
//                 superCatId: '0',
//                 catId: item.AppBannerPagevalue,
//                 subCatId: '0',
//                 brandId: '0',
//                 catName: item.value,
//                 searchText: '',
//               },
//             });
//             break;
//           case 'AppUpdateScreen':
//             break;
//           case 'SuperCategory':
//             navigation.navigate('ProductList', {
//               productData: {
//                 superCatId: item.AppBannerPagevalue,
//                 catId: '0',
//                 subCatId: '0',
//                 brandId: '0',
//                 catName: item.value,
//                 searchText: '',
//               },
//             });
//             break;
//           case 'SubCategory':
//             navigation.navigate('ProductList', {
//               productData: {
//                 superCatId: '0',
//                 catId: '0',
//                 brandId: '0',
//                 subCatId: item.AppBannerPagevalue,
//                 catName: item.value,
//                 searchText: '',
//               },
//             });
//             break;
//           case 'SearchText':
//             navigation.navigate('ProductList', {
//               productData: {
//                 superCatId: '0',
//                 catId: '0',
//                 subCatId: '0',
//                 brandId: '0',
//                 catName: item.value,
//                 searchText: item.AppBannerPagevalue,
//               },
//             });
//             break;
//           case 'Brands':
//             navigation.navigate('ProductList', {
//               productData: {
//                 superCatId: '0',
//                 catId: '0',
//                 subCatId: '0',
//                 brandId: item.AppBannerPagevalue,
//                 catName: item.value,
//                 from: 'homescreenBanner',
//                 searchText: '',
//               },
//             });
//             break;

//           case 'ExternalURL':
//             navigation.navigate('BannerExternalLinkRedirection', {
//               url: item.msiteURL,
//             });
//             break;

//           case 'ProductPage':
//             navigation.navigate('ProductDetails', {
//               productData: {
//                 productVariantId: item.AppBannerPagevalue,
//                 dataFromNetcore: false,
//               },
//             });
//             break;
//           case 'OfferScreen':
//             navigation.navigate('NetcoreProductList', {
//               screenName: 'Latest Offers',
//             });
//             break;
//           case 'BestSeller':
//             navigation.navigate('NetcoreProductList', {
//               screenName: 'Best Sellers',
//             });
//             break;
//           case 'WhatsTrending':
//             navigation.navigate('NetcoreProductList', {
//               screenName: "What's Trending",
//             });
//             break;
//           case 'BulkEnquiry':
//             navigation.navigate('BulkGiftOrder');
//             break;
//         }
//       }}
//       //   onPress={() => {
//       //     onPress(index);
//       //     appsFlyer.logEvent(
//       //       'af_banner_clicked',

//       //       {
//       //         af_banner_name: item.BannerName,
//       //         af_super_category_name: item?.supercategoryname,
//       //         af_web_banner_id: item.webbannerid,
//       //         af_app_banner_page: item?.AppBannerPage,
//       //       },
//       //       res => {
//       //         console.log('banner click success ', res);
//       //       },
//       //       err => {
//       //         console.error('banner click error ', err);
//       //       },
//       //     );
//       //   }}
//     >
//       <Image
//         onLoadEnd={() => setIsLoading(false)}
//         style={[styles.image, {height: 230, width: '100%'}]}
//         source={
//           item.webbannerimagepath && !isLoading
//             ? {uri: item.webbannerimagepath}
//             : require('../../assets/images/defaultBanner.png')
//         }
//         defaultSource={require('../../assets/images/defaultBanner.png')}
//       />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   image: {
//     resizeMode: 'stretch',
//   },
// });
