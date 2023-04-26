import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert,Share, Button, Image, PermissionsAndroid, Platform, Text, View,FlatList, Dimensions, TouchableOpacity } from "react-native";

const DocumentsList = (props) => {
    const [documents, setDocuments] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getAllDocuments();
        }, []),
      );

    const getAllDocuments = () => {
        fetch('http://192.168.43.194:4242/storage/getFiles').then(async res => {
            if (res.status === 200) {
                let response = await res.json();
                setDocuments(response.files);
            }
        });
    }

    const onShare = async (pdfUrl) => {
        try {
          const result = await Share.share({
            url : pdfUrl,
            title : 'Pdf Sharer',
            message : "I am sharing this Pdf"
          },{
            dialogTitle : 'Pdf Share',
            tintColor : 'red',
            subject : 'Sharing Pdf With Contacts'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    const deleteDocument = (docId) => {
        fetch(`http://192.168.43.194:4242/storage/deleteFile?fileId=${docId}`).then(async res => {
            if (res.status === 200) {
                let response = await res.json();
                if(response.message){
                    props.navigation.goBack();
                }
            }
        });
    }   

    const renderItem = ({ item, index }) => 
           (item.mimeType !== 'application/pdf' ? (
           <TouchableOpacity onLongPress={() => {
            Alert.alert('Do you want to delete', `Delete File ${item.name}`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => deleteDocument(item._id)},
              ]);
           }}>
           <Image
            style={{
                width: Dimensions.get('window').width - 20,
                height : Dimensions.get('window').height,
                marginVertical : 30,
                alignSelf : 'center',
                // aspectRatio : 40/100
            }}
            source={{
                uri: `http://192.168.43.194:4242/uploads/${item.name}`,
            }}
        /></TouchableOpacity>) : 
        <>
        <Text style={{color : "red",marginVertical : 50,textAlign : 'center',fontWeight : 'bold'}}>Pdf is Not Yet Supported</Text>
        <Button onPress={() => {onShare(`http://192.168.43.194:4242/uploads/${item.name}`)}} title="Share"/>
        </>)
    
    

        


    return (
        <FlatList
            data={documents}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{backgroundColor : 'olive'}}
            ItemSeparatorComponent={() => (
                <View style={{width : Dimensions.get('window').width , height : 1,backgroundColor : 'red'}}/>
            )}
            ListEmptyComponent={() => <Text>NO DOCUMENTS FOUND!!</Text>}
        />
    )
}
export default DocumentsList;