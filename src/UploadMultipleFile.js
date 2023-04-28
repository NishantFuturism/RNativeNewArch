import React, { useEffect } from "react";
import { Alert, Button, PermissionsAndroid, Platform, Text } from "react-native";
// import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { saveFileToServer } from "./Utils";
// import ExampleFileOps from "./ExampleFileOps";

const UploadMultipleFile = (props) => {

  useEffect(() => {
    runPermissions()
  },[])

    const requestStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
              title: 'Storage Read And Write Permission',
              message:
                'Futurism App needs access to your storage ' +
                'so you can upload multiple files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the file system');
          } else {
            console.log('Storage permission denied',granted);
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const checkPermissions = async() => {
        let readPerm = false;
        let writePerm = false;
      await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(async res => {
            console.log("checkPermissions READ_EXTERNAL_STORAGE",res);
            if(res){
                readPerm = res;
            }
           await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(resp => {
            console.log("checkPermissions WRITE_EXTERNAL_STORAGE",resp);
            if(resp){
                writePerm = resp;
            }
            })
        }).catch(e => {console.log(e)})
        if(readPerm && writePerm){
            return true;
        }else{
            return false;
        }
    }

    const runPermissions = () => {
        checkPermissions().then(isRequired => {
            console.log("isRequired",isRequired);
            if(!isRequired){
                requestStoragePermission();
            }
        })
    }







 const selectDocument = async () => {

  // Pick a single file
  try {
    let permitted = false;
    await checkPermissions().then(isPermissionGranted => {
    console.log("BNMBMN",isPermissionGranted);
    permitted =  Platform.OS === 'android'? isPermissionGranted : true;
    }) ;
   if(permitted){
    const res = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
    })
    // let read = await readFile(res[0].uri);
    // console.log("read",read);
    if(res){
      return res;
    }
   }else{
     Alert.alert("To upload the document, please go to settings and allow storage access");
     return
   }
  
  
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      console.log(err);
    } else {
      throw err
    }
  }
  }




const onUploadButtonPressed = async () => {
  if(props.submit){
    props.submit("Files Succesfully Added");
    return;
  }
  let docsArray = [];
  await selectDocument().then(res => {
    docsArray = res;
  })
  
  console.log("docsArrayRes",docsArray);
  
var formdata = new FormData();

docsArray.forEach(doc => {
  formdata.append("image", doc, doc.name);
})


var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

saveFileToServer("http://192.168.43.194:4242/storage/uploadFile",requestOptions);


}


   return(
    <>
    <Text accessibilityRole="header">This is UploadMultipleFile Screen</Text>
    <Button title="UploadFile" onPress={() => {onUploadButtonPressed()}} color={"darkgreen"} />
    <Button title="List Documents" onPress={() => {props.navigation.navigate("Documents")}} color={"olive"} />
    </>
   )
}

export default UploadMultipleFile;