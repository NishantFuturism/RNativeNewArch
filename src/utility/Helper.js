import AsyncStorage from "@react-native-async-storage/async-storage";
import Regex from "../constants/Regex";
import Toast from 'react-native-simple-toast';



export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("something went wrong in Asyncstorage");
  }
};

export const _retrieveData = async (key, defaultVal) => {

  try {
    //console.log('arg key : ' + key);
    //console.log('arg defaultVal : ' + defaultVal);
    const temp = await AsyncStorage.getItem(key);
    //console.log('Value of key ' + key + ' : ' + temp);
    if (temp !== null) {
      //console.log('inside if condition');
      return temp;
    }
    return defaultVal;
  } catch (e) {
    console.error(e);
    return defaultVal;
  }



  //try {
  /*AsyncStorage.getItem(key)
    .then((value) => {
      console.log('AsyncStoage Val for key ' + key + ' : ' + JSON.stringify(value) + '----' + defaultVal);
      if (value != null && value != undefined) {
        return value;
      }
      return defaultVal;
    })
    .catch(error => {
      console.log("something went wrong in Asyncstorage");
    });
  /*} catch (error) {
    console.log("something went wrong in Asyncstorage");
  }*/
};

export const multiSetStorage = async (Array) => {
  // const firstPair = ["@MyApp_user", "value_1"]
  // const secondPair = ["@MyApp_key", "value_2"]
  // if(Array !== null || Array === undefined || Array.length === 0) return;
  // console.log("inside");
  try {
    await AsyncStorage.multiSet(Array)
  } catch (e) {
    console.log("something wrong in multi storage", e);
  }

  console.log("Done.NISH")
}

export const multiRemoveStorage = async (Array) => {

  try {
    await AsyncStorage.multiRemove(Array)
  } catch (e) {
    console.log("something wrong in multi remove storage", e);
  }

  console.log('Done')
}


export const getMultiple = async (array) => {

  let values;
  try {
    values = await AsyncStorage.multiGet(array);
    // console.log("^^^&&&",values);
    return values;
  } catch (e) {
    // read error
    console.log("erro", e);
  }

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
}

export const getAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys()
  } catch (e) {
    // read key error
  }
  // getMultiple(keys);
  console.log("KEYSKEYS", keys)
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

export const validateEmail = (email) => {
  var regex = Regex.expression.email
  return regex.test(email);
}

// Password validation
export const validatePassword = (password) => {
  var regex = Regex.expression.password
  return regex.test(password);
}

// Mobile validation
export const validateMobile = (mobile) => {
  var regex = Regex.expression.mobile
  return regex.test(mobile);
}

export const showToast = (message) => {
  Toast.showWithGravity(
    message,
    Toast.LONG,
    Toast.CENTER,
  );
};

export const trimWord = (previousValue) => {
  var value = '';
  if (previousValue.charAt(0) === ',') {
    value = previousValue.substr(1);
  }
  return value;
};


// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   return enabled;
// }

export const ValidateNumber = (strNumber) => {
  var regExp = Regex.expression.isNumber;
  return regExp.test(strNumber);
}

export const validateName = (str) => {
  var regExp = Regex.expression.isName;
  return regExp.test(str);
}

export const validateAlphaNumeric = (str) => {
  var regExp = Regex.expression.isAlphabetNumber;
  return regExp.test(str);
}


export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};