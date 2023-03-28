import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Share,
} from 'react-native';



  // const plusUrl = 'https://cdn-icons-png.flaticon.com/512/3524/3524388.png';
  // const minusUrl = 'https://thumbs.dreamstime.com/z/minus-sign-icon-vector-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133735659.jpg';
  
  const renderImage = (imageLocation) => {
    return (
      <Image
      style={{
          width: 50,
          height: 50,
      }}
      source={{
        uri: imageLocation,
      }}
    />
    )
  }

  const  DrawerNavigator = (props) => {
  console.log("DrawerNavigator=====>>",props)
    const {subCatKeyName,minusImgUrl,plusImgUrl,drawerData,childCatKeyName} = props.config;
    const [activeSuperCategoryIndex, setActiveSuperCategoryIndex] =  useState(null);
    const [activeSubCategoryIndex, setActiveSubcategoryIndex] = useState(null);
   
    
   
  
    const renderDrawerItem = ({item, index}) => {
      return (
        <>
          <TouchableOpacity
           style={{height : 50,width : '100%',backgroundColor : 'grey',justifyContent : 'space-between' ,alignItems : 'center',flexDirection : 'row',paddingHorizontal : 10}}
            activeOpacity={1}
            onPress={() => {
              if(item[subCatKeyName].length > 0 && activeSuperCategoryIndex !== index){
                setActiveSuperCategoryIndex(index);
                setActiveSubcategoryIndex(null);
              }else{
                setActiveSuperCategoryIndex(null);
                setActiveSubcategoryIndex(null);
              }
            }}>
            <Text
            style={{color : 'white'}}
             >
              {item.name}
            </Text>
            {item[subCatKeyName].length > 0 && (<Image
             style={{
              width: 15,
              height: 15 ,
            }}
             source={{
             uri: activeSuperCategoryIndex !== null && activeSuperCategoryIndex === index ? minusImgUrl : plusImgUrl,
        }}
      />)}
          </TouchableOpacity>
    
         {activeSuperCategoryIndex !== null && item[subCatKeyName].length > 0 && activeSuperCategoryIndex === index  && (<FlatList
                    data={item[subCatKeyName]}
                    renderItem={renderSubCategoryItems}
                    keyExtractor={item => item.name}
                  />)}

            
          
  
        </>
      );
    };
  
    const renderSubCategoryItems = ({item, index}) => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              height: 35,
              justifyContent: 'space-between',
              backgroundColor: '#ccc',
              paddingHorizontal : 5,
              alignItems : 'center',
              flexDirection : 'row'
            }}
            onPress={() => {
              if(item[childCatKeyName].length > 0 && activeSubCategoryIndex !== index){
                setActiveSubcategoryIndex(index);
              }else{
                setActiveSubcategoryIndex(null);
              }
            }}>
            
              <Text
                style={{
                  marginLeft: 30,
                  color: '#000',
                  // fontFamily: 'CeraPRO-Medium',
                  fontSize: 13,
                }}>
                {item.name}
              </Text>
              {item[childCatKeyName].length > 0 && (<Image
             style={{
              width: 15,
              height: 15 ,
            }}
             source={{
             uri: activeSubCategoryIndex !== null && activeSubCategoryIndex === index ? minusImgUrl : plusImgUrl,
        }}
      />)}
          </TouchableOpacity>
          {activeSubCategoryIndex !== null && item[childCatKeyName].length > 0 && activeSubCategoryIndex === index && (<FlatList
                    data={item[childCatKeyName]}
                    renderItem={renderChildCategoryItems}
                    keyExtractor={item => item.name}
                  />)}
          <View style={{height: 1, width: '100%', backgroundColor: '#dddddd'}} />
        </>
      );
    };

    const renderChildCategoryItems = ({item, index}) => {
      return (
        <>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              height: 35,
              justifyContent: 'center',
              backgroundColor: 'olive',
            }}
            onPress={() => {
             console.log("childCategory clicked")
            }}>
            <View>
              <Text
                style={{
                  marginLeft: 30,
                  color: 'white',
                  // fontFamily: 'CeraPRO-Medium',
                  fontSize: 13,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={{height: 1, width: '100%', backgroundColor: '#dddddd'}} />
        </>
      );
    };
  
  
    return (
      <>
        <FlatList
          data={drawerData}
          renderItem={renderDrawerItem}
          keyExtractor={item => item.name}
        />
      </>
    );
  }
  


export default DrawerNavigator;