// import React, {useEffect, useState} from 'react';
// import {TouchableOpacity, Image, StyleSheet} from 'react-native';
// import appsFlyer from 'react-native-appsflyer';

// export default ChildItem = ({
//   item,
//   style,
//   onPress,
//   index,
//   imageKey,
//   height,
// }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={styles.container}
//       onPress={() => {
//         onPress(index);
//         appsFlyer.logEvent(
//           'af_banner_clicked',

//           {
//             af_banner_name: item.BannerName,
//             af_super_category_name: item?.supercategoryname,
//             af_web_banner_id: item.webbannerid,
//             af_app_banner_page: item?.AppBannerPage,
//           },
//           res => {
//             console.log('banner click success ', res);
//           },
//           err => {
//             console.error('banner click error ', err);
//           },
//         );
//       }}>
//       <Image
//         onLoadEnd={() => setIsLoading(false)}
//         style={[styles.image, style, {height: height}]}
//         source={
//           item[imageKey] && !isLoading
//             ? {uri: item[imageKey]}
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
