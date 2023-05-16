import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {SafeAreaView, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const {width: PAGE_WIDTH} = Dimensions.get('window');
const App2 = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <GestureHandlerRootView>
      <Carousel
        loop={true}
        autoPlay={true}
        snapEnabled={true}
        scrollAnimationDuration={4000}
        overscrollEnabled={true}
        enabled={true}
        width={PAGE_WIDTH}
        height={PAGE_WIDTH / 2}
        data={[...new Array(6).keys()]}
        renderItem={({index}) => (
          <View key={index}>
            <Text>{index + 98798789}</Text>
          </View>
        )}
        
      />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App2;