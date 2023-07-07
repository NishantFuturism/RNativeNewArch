import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StackScreen } from '../src/StackScreens';
import ReusableDrawer from '../src/ReusableDrawer';
import { SuperCategoryData } from '../src/DrawerDataConfig';

describe('DrawerComponent', () => {
  const configuration = {
    drawerData : SuperCategoryData,
    plusImgUrl : 'https://cdn-icons-png.flaticon.com/512/3524/3524388.png',
    minusImgUrl : 'https://thumbs.dreamstime.com/z/minus-sign-icon-vector-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133735659.jpg',
    subCatKeyName : 'title',
    childCatKeyName : 'submenu',
    StackScreen : StackScreen
  }

  test('renders without errors', () => {
    render(<ReusableDrawer
      config={configuration}
      /> );
    // Assert that the component renders without throwing any errors
  });

  test('drawer is initially hidden', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      /> );
    const drawer = getByTestId('drawer');

    // Assert that the drawer is initially hidden
    expect(drawer.props.visible).toBe(false);
  });

  test('drawer becomes visible on open', () => {
    const { getByTestId, getByLabelText } = render(<ReusableDrawer
      config={configuration}
      /> );
    const drawerToggleButton = getByLabelText('Open Drawer');

    fireEvent.press(drawerToggleButton);

    const drawer = getByTestId('drawer');
    // Assert that the drawer becomes visible after clicking the toggle button
    expect(drawer.props.visible).toBe(true);
  });

  test('drawer becomes hidden on close', () => {
    const { getByTestId, getByLabelText } = render(<ReusableDrawer
      config={configuration}
      /> );
    const drawerToggleButton = getByLabelText('Open Drawer');

    fireEvent.press(drawerToggleButton);

    const closeDrawerButton = getByLabelText('Close Drawer');
    fireEvent.press(closeDrawerButton);

    const drawer = getByTestId('drawer');
    // Assert that the drawer becomes hidden after clicking the close button
    expect(drawer.props.visible).toBe(false);
  });


  test('drawer contains expected content', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      />);
    const drawer = getByTestId('drawer');

    // Assert that the drawer contains the expected content, such as menu items or navigation links
    
    // expect(drawer).toContainElement(getByTestId('menu-item-1'));
    // expect(drawer).toContainElement(getByTestId('menu-item-2'));
    
    // Add more assertions for other expected content
  });

  test('drawer updates correctly on state change', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      />);
    const drawer = getByTestId('drawer');

    // Simulate a state change that updates the content of the drawer
    // For example, if the drawer renders based on data in a Redux store, update the store here
    // Ensure that the drawer reflects the updated state


    // expect(drawer).toContainElement(getByTestId('updated-menu-item'));
  });

  test('drawer can be opened by swiping', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      />);
    const drawer = getByTestId('drawer');

    // Simulate a swipe gesture to open the drawer
    
    // fireEvent.swipe(drawer, { direction: 'right' });

    // Assert that the drawer becomes visible after swiping
    expect(drawer.props.visible).toBe(true);
  });

  test('drawer remains open when scrolling main content', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      />);
    const mainContent = getByTestId('main-content');

    // Simulate a scroll event on the main content area
    fireEvent.scroll(mainContent);

    // Assert that the drawer remains open after scrolling
    const drawer = getByTestId('drawer');
    expect(drawer.props.visible).toBe(true);
  });

  test('drawer transitions correctly when switching screens', () => {
    const { getByTestId, rerender } = render(<ReusableDrawer
      config={configuration}
      />);
    const drawer = getByTestId('drawer');

    // Simulate switching to a different screen/component
    rerender(
      <ReusableDrawer
      screen="Home"
      config={configuration}
      />
    );

    // Assert that the drawer transitions correctly when switching screens
    // For example, check if the drawer closes or remains open based on your navigation logic
    expect(drawer.props.visible).toBe(false);
  });

  test('drawer is accessible to screen readers', () => {
    const { getByTestId } = render(<ReusableDrawer
      config={configuration}
      />);
    const drawer = getByTestId('drawer');

    // Assert that the drawer is accessible to screen readers
   
    // expect(drawer).toHaveAccessibleName('Navigation Menu');
   
    // Add more accessibility assertions as needed
  });

  // Add more test cases to cover additional functionality and edge cases


  // Add more test cases to cover other aspects of the drawer component
});