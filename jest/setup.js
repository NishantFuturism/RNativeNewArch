jest.mock("react-native-bootsplash", () => {
    return {
      hide: jest.fn().mockResolvedValueOnce(),
      getVisibilityStatus: jest.fn().mockResolvedValue("hidden"),
    };
  });

jest.mock('react-native-reanimated/lib/reanimated2/jestUtils', () =>
  require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()
);

jest.mock('react-native/Libraries/Lists/FlatList', () => {
    const RN = jest.requireActual('react-native');
    return RN.ScrollView;
  });


