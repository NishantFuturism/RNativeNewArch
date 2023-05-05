import * as React from "react";
import { Button, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

// import SButton from "../../components/SButton";
import { ElementsText, window } from "./src/exampleExpo/src/constants";
import { withAnchorPoint } from "./src/exampleExpo/src/utils/anchor-point";
import { fruitItems } from "./src/exampleExpo/src/utils/items";

const colors = ["#fda282", "#fdba4e", "#800015"];

const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.width * 1.2;

function AppParellax(props) {
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  } as const;

  const Card: React.FC<{
    index: number
    animationValue: Animated.SharedValue<number>
  }> = ({ index, animationValue }) => {
    const WIDTH = PAGE_WIDTH / 1.5;
    const HEIGHT = PAGE_HEIGHT / 1.5;
  
    const cardStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-0.1, 0, 1],
        [0.95, 1, 1],
        Extrapolate.CLAMP,
      );
  
      const translateX = interpolate(
        animationValue.value,
        [-1, -0.2, 0, 1],
        [0, WIDTH * 0.3, 0, 0],
      );
  
      const transform = {
        transform: [
          { scale },
          { translateX },
          { perspective: 200 },
          {
            rotateY: `${interpolate(
              animationValue.value,
              [-1, 0, 0.4, 1],
              [30, 0, -25, -25],
              Extrapolate.CLAMP,
            )}deg`,
          },
        ],
      };
  
      return {
        ...withAnchorPoint(
          transform,
          { x: 0.5, y: 0.5 },
          { width: WIDTH, height: HEIGHT },
        ),
      };
    }, [index]);
  
    const blockStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0, 60, 60],
      );
  
      const translateY = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0, -40, -40],
      );
  
      const rotateZ = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0, 0, -25],
      );
  
      return {
        transform: [
          { translateX },
          { translateY },
          { rotateZ: `${rotateZ}deg` },
        ],
      };
    }, [index]);
  
    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        
        accessibilityLabel="answer input"
        accessibilityValue={{ min: 0, max: 100, now: 25, text: '25%' }}
        accessibilityHint={"AGGGG"}
      >
        <Animated.View
          style={[
            {
              backgroundColor: colors[index],
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              width: WIDTH,
              height: HEIGHT,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,
  
              elevation: 16,
            },
            cardStyle,
          ]}
        />
  
        <Animated.Image
          source={fruitItems[index]}
         
          style={[
            {
              width: WIDTH * 0.8,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 999,
            },
            blockStyle,
          ]}
          resizeMode={"contain"}
          accessibilityRole="image"
        />
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop
        autoPlay={isAutoPlay}
        withAnimation={{
          type: "spring",
          config: {
            damping: 13,
          },
        }}
        testID={"CAROUSEL_ITEM_0_READY"}
        autoPlayInterval={1500}
        data={props.colors ? props.colors : colors}
        renderItem={({ index, animationValue }) => (
          <Card
            animationValue={animationValue}
            key={index}
            index={index}
          />
        )}
      />
     <Button
        onPress={() => {
          setIsAutoPlay(!isAutoPlay)
        }}
        title={isAutoPlay ? 'Turn off autoplay' : 'Turn on autoplay'}
        color={"red"}
      />
         
    </View>
  );
}



export default AppParellax;
