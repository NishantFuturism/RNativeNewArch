// import React, {useState} from 'react';
// import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
// import {FlatListSlider} from 'react-native-flatlist-slider';
// import Colors from '../constants/Colors';
// import ZoomImageBanner from './ZoomImageBanner';
// import Carousel, {Pagination} from 'react-native-snap-carousel';

// const FullScreenImageSlider = ({route, navigation}) => {
//   const {images} = route.params;
//   console.log('FullScreenImageSlider images : ', JSON.stringify(route.params));
//   const [scroll, setScroll] = useState(true);

//   const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

//   const [activeSlide, setActiveSlide] = useState(0);

//   const handleSlideChange = index => {
//     setActiveSlide(index);
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Carousel
//         contentContainerCustomStyle={{
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//         data={images}
//         renderItem={({item, index}) => (
//           <ZoomImageBanner
//             item={item}
//             index={index}
//             imageKey="image"
//             panToMove={!scroll}
//             onPress={() => {}}
//             onMove={({scale}) => {
//               setScroll(scale === 1 ? true : false);
//             }}
//           />
//         )}
//         sliderWidth={screenWidth}
//         itemWidth={screenWidth * 1}
//         inactiveSlideScale={1}
//         inactiveSlideOpacity={1}
//         autoplay={false}
//         enableMomentum={false}
//         lockScrollWhileSnapping={true}
//         autoplayInterval={5000}
//         activeSlideAlignment="start"
//         containerCustomStyle={{}}
//         onSnapToItem={handleSlideChange}
//         loop={false}
//       />

//       <Pagination
//         dotsLength={images.length}
//         activeDotIndex={activeSlide}
//         containerStyle={{
//           paddingVertical: 0,
//           position: 'absolute',
//           bottom: 15,
//           alignSelf: 'center',
//         }}
//         inactiveDotColor="#ddd"
//         dotColor={Colors.secondary}
//         dotStyle={{width: 8, height: 8, borderRadius: 4}}
//         dotContainerStyle={{marginHorizontal: 2}}
//         inactiveDotOpacity={1}
//         inactiveDotScale={1}
//       />

//       {/* <FlatListSlider
      
//         data={images}
//         imageKey={'image'}
//         onPress={() => {}}
//         // scrollEnabled={!scroll}
//         autoscroll={false}
//         loop={false}
//         indicator={true}
//         animation={false}
//         local={false}
//         contentContainerStyle={{
//           justifyContent: 'center',
//           // alignSelf: 'center',
//           alignItems : 'center'
//         }}
//         indicatorContainerStyle={{position: 'absolute', bottom: 15}}
//         indicatorActiveColor={Colors.secondary}
//         component={
//           <ZoomImageBanner
//             panToMove={!scroll}
//             onMove={({scale}) => {
//               setScroll(scale === 1 ? true : false);
//             }}
//           />
//         }
//       /> */}
//     </View>
//   );
// };

// export default FullScreenImageSlider;
