// import React, {useState} from 'react';
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import WebView from 'react-native-webview';
// import Colors from '../constants/Colors';
// import PageTitle from './PageTitle';
// import {getVersion} from 'react-native-device-info';

// const Browser = props => {
//   const [show, setShow] = useState(true);


//   console.log('\n\n\n\n\nprops.url',props.url);
//   const showFullScreenLoader = () => {
//     return (
//       <View
//         style={{
//           position: 'absolute',
//           left: 0,
//           right: 0,
//           top: 0,
//           bottom: 0,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <ActivityIndicator
//           size="large"
//           color={Colors.secondary}
//           animating={show}
//         />
//       </View>
//     );
//   };
//   return (
//     <>
//       <View style={{flex: 1, backgroundColor: 'white'}}>
//         {props.showPageTitle ? (
//           <PageTitle
//             titleFirstWord={props.titleFirstWord ? props.titleFirstWord : ''}
//             titleFirstWordColor={'black'}
//             titleLastWord={props.titleLastWord ? props.titleLastWord : ''}
//             titleLastWordColor={Colors.secondary}
//             bgColor={'white'}
//             padBottom={10}
//           />
//         ) : null}
//         {props.showAppVersion ? (
//           <Text
//             style={{
//               fontWeight: 'bold',
//               marginVertical: 10,
//               paddingHorizontal: 15,
//             }}>
//             App Version : {getVersion()}
//           </Text>
//         ) : null}
//         <WebView
//           //   originWhitelist={['*']}

//           originWhitelist={['http://*', 'https://*', 'intent://*']}
//           automaticallyAdjustContentInsets={true}
//           userAgent="Mobile/App"
//           style={{marginHorizontal: 0}}
//           // onLoadStart={() => {
//           //     setShow(true);
//           // }}
//           // onLoad={() => {
//           //     setShow(false);
//           // }}
//           // onLoadEnd={(syntheticEvent) => {
//           //     // update component to be aware of loading status
//           //     const { nativeEvent } = syntheticEvent;
//           //     console.log("syntheticEvent",nativeEvent.loading);
//           //   }}
//           startInLoadingState={true}
//           onLoadProgress={({nativeEvent}) => {
//             let loadingProgress = nativeEvent.progress;
//             console.log('loadingProgress', loadingProgress);
//           }}
//           renderLoading={showFullScreenLoader}
//           // source={{uri: props.url ? props.url : 'https://www.google.com/'}}
//           source={{baseUrl: ''
//           ,uri: props.url ? props.url : 'https://www.google.com/'}}
//           scrollEnabled={true}
//           javaScriptEnabled={true}
//           //   setSupportMultipleWindows={true}
//           onNavigationStateChange={async e => {}}
//         />
//       </View>
//     </>
//   );
// };

// export default Browser;
