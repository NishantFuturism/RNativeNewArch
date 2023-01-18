// import React from 'react';
// import {View,Modal,ActivityIndicator} from 'react-native';

// import Colors from '../constants/Colors';

// const Spinner = (props) => {
//   return (
//     <Modal
//     transparent={true}
//     animationType={'none'}
//     visible={props.loading ? props.loading : false}>
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',position : 'absolute',top: 0, left: 0, right: 0, bottom: 0,backgroundColor : 'transparent'}}>
//       {/* <ProgressCircle
//         borderWidth={props.spinnerWidth ? props.spinnerWidth :  3}
//         color={props.color ? props.color : Colors.secondary}
//         size={props.size ? props.size : 50}
//         indeterminate={props.loading ? props.loading : false}
//       /> */}
//           <ActivityIndicator 
//                   color={props.color ? props.color : Colors.secondary}
//                   size={props.size ? props.size : 50}
//                   // borderWidth={props.spinnerWidth ? props.spinnerWidth :  3}
//                   animating={props.loading ? props.loading : false}
//                   // style={{height : props.size ? props.size : 50,width : props.size ? props.size : 50,backgroundColor : 'black'}}
 
//            />
//     </View>
//     </Modal>
//   );
// };

// export default Spinner;