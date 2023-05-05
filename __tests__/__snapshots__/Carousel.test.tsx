import React from "react";

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import AppParellax from "/Users/nishanti/Desktop/RN/futurismts/AppParellax";
import { advanceAnimationByTime, withReanimatedTimer } from "react-native-reanimated/src/reanimated2/jestUtils";
import TestRenderer from 'react-test-renderer';
import Animated from "react-native-reanimated";


  test("renders %s correctly", async () => {
    const colors = ["#1519a1", "#345730", "#34067d"];

    let renderResult: ReturnType<typeof render>;
    withReanimatedTimer(() => {
      // const Carousel = ;
      renderResult = render(<AppParellax  />);
    });
    expect(renderResult!).toBeDefined();
    const { toJSON } = renderResult!;
    withReanimatedTimer(() => {
      act(() => advanceAnimationByTime(2500));
    });
    await waitFor(() => screen.findByTestId("CAROUSEL_ITEM_0_READY"),{timeout : 2000});
    expect(toJSON()).toMatchSnapshot();
  });


// jest.useFakeTimers();

test('stop in the middle of animation', () => {
  const style = { width: 0 };

  const { getByTestId } = render(<AppParellax />);
  let view = getByTestId('CAROUSEL_ITEM_0_READY');
  // const button = getByTestId('button');
  view = view._fiber.stateNode.props;
  expect(view.width).toBe(750);
  expect(view.height).toBe(900);
  expect(view.loop).toBeTruthy();
  expect(view.autoPlay).toBeTruthy();
  expect(view.autoPlayInterval).toBe(1500)

  // fireEvent.press(button);
  withReanimatedTimer(() => {
    advanceAnimationByTime(250); // if whole animation duration is a 500ms
  })
  // style.width = 50; 
  // value of component width after 250ms of animation
  // expect(view).toHaveAnimatedStyle(style);
});


test('render Carousel',async () => {
  // let screen = render(<AppParellax/>)
  // const { toJSON } = screen;
  // const {getAllByLabelText} = screen;
  // console.log(toJSON().children[1].children[0].children[0].props);
  // console.log(toJSON().children[0].props.renderItem);
  // const {debug} = render(<AppParellax/>);
  // debug();

  // const {toJSON} = screen;
  // await waitFor(() => screen.findByAccessibilityValue("AGGGG"),{timeout : 2000});
  // expect(toJSON()).toMatchSnapshot();

  // afterEach(cleanup);

  
  // render(<AppParellax />);


  // const submitButton =  await waitFor(() => screen.findByAccessibilityHint('AGGGG'),{timeout : 2000});

// const submitButton = await screen.getAllBy('AGGGG');
// console.log(submitButton);
// expect(submitButton).toHaveLength(3);


// const element = await screen.getByText('AGGGG');
// console.log(element);


})

test("dummy react test renderer",() => {
//   const testRenderer = TestRenderer.create(<AppParellax />);
// const testInstance = testRenderer.root;

// console.log(testInstance.children);
render(<AppParellax/>);
const element = screen.getByTestId("CAROUSEL_ITEM_0_READY",{
  includeHiddenElements : true
});
expect(element).not.toBeUndefined();
expect(element._fiber.stateNode.props.withAnimation).toStrictEqual({"config": {"damping": 13}, "type": "spring"})
expect(element).toBeDefined();
expect(element).not.toBeFalsy();

// console.log(element);


})