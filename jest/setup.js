jest.mock("react-native-bootsplash", () => {
    return {
      hide: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
    };
  });

jest.mock('react-native-reanimated/lib/reanimated2/jestUtils', () =>
  require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()
);

// jest.requireActual('react-native-reanimated/lib/reanimated2/jestUtils',() => 
//   require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()
// )

// jest.mock('react-native-reanimated/lib/reanimated2/core', () => {
//   const originalModule = jest.requireActual('react-native-reanimated/lib/reanimated2/core');

//   return {
//     __esModule: true,
//     ...originalModule,
//   };
// });

// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Lists/FlatList', () => {
    const RN = jest.requireActual('react-native');
    return RN.ScrollView;
  });

jest.mock("react-native-reanimated-carousel",() => "Carousel")
// jest.mock("react-native-reanimated/src/reanimated2/jestUtils",() => "advanceAnimationByTime")
// // jest.mock("react-native-reanimated/src/reanimated2/jestUtils",() => "withReanimatedTimer")
// jest.mock('react-native-reanimated/lib/reanimated2/jestUtils', () =>
//   require('react-native-reanimated/lib/reanimated2/jestUtils').advanceAnimationByTime()
// );
// jest.mock('react-native-reanimated/lib/reanimated2/jestUtils', () =>
//   require('react-native-reanimated/lib/reanimated2/jestUtils').withReanimatedTimer()
// );