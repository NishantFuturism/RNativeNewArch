import { Dimensions } from "react-native";

export default {
    loop : true,
    width : Dimensions.get('window').width,
    height : Dimensions.get('window').height,
    autoPlay : true,
    data : [],
    autoPlayInterval : 5000,
    scrollAnimationDuration : 5000,
    panGestureHandlerProps : {
        activeOffsetX: [-10, 10],
      },
    onSnapToItem : (index) => {console.log('current index:', index)},
    onProgressChange : (_, absoluteProgress) => null,
    style : {flex : 1,alignItems : 'center',justifyContent : 'center'},
    snapEnabled : true,
    overscrollEnabled : true,
    enabled : true,
    withAnimation : {
      type: "spring",
      config: {
        damping: 13,
      },
    }
}