import React from "react";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import AppParellax from "/Users/nishanti/Desktop/RN/futurismts/AppParellax";
import { advanceAnimationByTime, withReanimatedTimer } from "react-native-reanimated/src/reanimated2/jestUtils.js";

// jest.mock("@faker-js/faker", () => ({
//   faker: {
//     name: {
//       findName: jest.fn(() => "__"),
//     },
//     image: {
//       nature: jest.fn(() => "http://loremflickr.com/405/100/nature?random=0.5328608422981651"),
//       animals: jest.fn(() => "http://loremflickr.com/405/100/nature?random=0.5328608422981651"),
//     },
//     animal: {
//       dog: jest.fn(() => "__"),
//     },
//   },
// }));



  test("renders %s correctly", async () => {
    let renderResult: ReturnType<typeof render>;
    withReanimatedTimer(() => {
      const Carousel = AppParellax;
      renderResult = render(<Carousel />);
    });
    expect(renderResult!).toBeDefined();
    const { toJSON } = renderResult!;
    withReanimatedTimer(() => {
      act(() => advanceAnimationByTime(250));
    });
    await waitFor(() => screen.findAllByTestId("__CAROUSEL_ITEM_0_READY__"));
    expect(toJSON()).toMatchSnapshot();
  });


jest.useFakeTimers();

// test('stop in the middle of animation', () => {
//   const style = { width: 0 };

//   const { getByTestId } = render(<AppParellax />);
//   const view = getByTestId('view');
//   const button = getByTestId('button');

//   expect(view.props.style.width).toBe(0);
//   expect(view).toHaveAnimatedStyle(style);

//   fireEvent.press(button);
//   withReanimatedTimer(() => {
//     advanceAnimationByTime(250); // if whole animation duration is a 500ms
//   })
//   style.width = 50; // value of component width after 250ms of animation
//   expect(view).toHaveAnimatedStyle(style);
// });