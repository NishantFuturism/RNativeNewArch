// import React, {useState,useRef} from 'react';
// import {TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
// import ImageZoom from 'react-native-image-pan-zoom';

// export default ZoomImageBanner = ({
//   item,
//   style,
//   onPress,
//   index,
//   imageKey,
//   height,
//   panToMove,
//   onMove,
// }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const scaleValue = useRef(1);
//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={styles.container}
//       onPress={() => onPress(index)}>
//       <ImageZoom
//       onMove={({scale}) => {
//         scaleValue.current = scale;
//         onMove && onMove({scale});
//       }}
//         cropWidth={Dimensions.get('window').width}
//         cropHeight={Dimensions.get('window').height}
//         imageWidth={Dimensions.get('window').width}
//         imageHeight={400}
//         panToMove={panToMove}
//         // onMove={onMove}
//         minScale={1}
//         onStartShouldSetPanResponder={e => {
//           return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
//         }}>
//         <Image
//          onStartShouldSetResponder={(e) => {
//             return e.nativeEvent.touches.length < 2 && scaleValue.current <= 1;
//           }}
//           onLoadEnd={() => setIsLoading(false)}
//           style={[styles.image, style, {height: 400}]}
//           source={
//             item[imageKey] && !isLoading
//               ? {uri: item[imageKey]}
//               : require('../../assets/images/daily-deal-img-coming-soon.png')
//           }
//           defaultSource={require('../../assets/images/daily-deal-img-coming-soon.png')}
//         />
//       </ImageZoom>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   image: {
//     resizeMode: 'cover',
//   },
// });
