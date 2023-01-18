import React, {useEffect} from 'react';
import Network from '../utility/Network';
import Browser from '../components/Browser';
import { logFirebaseScreen } from '../utility/Helper';

const AboutUs = () => {
  
  useEffect(() => {
    logFirebaseScreen('about_us_screen', 'about_us_screen');
  }, []);

  return (
    <>
      <Browser
        showPageTitle={true}
        titleFirstWord={'ABOUT'}
        titleLastWord={'US'}
        url={Network.aboutUs_link}
        showAppVersion={true}
      />
    </>
  );
};
export default AboutUs;
