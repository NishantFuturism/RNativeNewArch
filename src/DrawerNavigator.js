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

const SuperCategoryData = [
    {
      id: 1,
      name: 'PERSONAL BASKET',
      navigationName: '',
      subCategoryData : [
        {
          id : 1,
          name : 'Meat',
          navigationName : '',
          childCategoryData : [
            {
              id : 1,
              name : 'Eggs',
              navigationName : '',
            },
            {
              id : 2,
              name : 'Raw Chicken',
              navigationName : '',
            }
          ] 
        },
        {
          id : 1,
          name : 'Vegetarian',
          navigationName : '',
          childCategoryData : [
            {
              id : 1,
              name : 'Leafy Veggies',
              navigationName : '',
            },
            {
              id : 2,
              name : 'Exotic Veggies',
              navigationName : '',
            }
          ] 
        }
      ]
    },
    {
      id: 2,
      name: 'ONLINE SLOTS AVAILABILITY',
      navigationName: '',
      subCategoryData : [
        {
          id : 1,
          name : 'Morning',
          navigationName : '',
          childCategoryData : [
            {
              id : 1,
              name : '6am - 8am',
              navigationName : '',
            },
            {
              id : 2,
              name : '10am - 12am',
              navigationName : '',
            }
          ] 
        },
        {
          id : 1,
          name : 'Night',
          navigationName : '',
          childCategoryData : [
            {
              id : 1,
              name : '6pm - 8pm',
              navigationName : '',
            },
            {
              id : 2,
              name : '10pm - 11:59pm',
              navigationName : '',
            }
          ] 
        }
      ]
    },
    {
      id: 3,
      name: 'SHOP BY CATEGORY',
      navigationName: '',
      subCategoryData : [
        {
          id : 1,
          name : 'Flat 40% Off',
          navigationName : '',
          childCategoryData : [] 
        },
        {
          id : 1,
          name : 'Happy Hours',
          navigationName : '',
          childCategoryData : [] 
        }
      ]
    },
    {
      id: 4,
      name: 'Favourites',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 5,
      name: 'My Orders',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 6,
      name: 'Blog',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 7,
      name: 'NB TV',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 8,
      name: 'Latest Offers',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 9,
      name: "What's Trending",
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 10,
      name: 'Best Sellers',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 11,
      name: 'Recently Purchased',
      navigationName: '',
      subCategoryData : []
    },
    {
      id: 12,
      name: 'Your Recently Viewed',
      navigationName: '',
      subCategoryData : []
    },
  ];

  const plusUrl = 'https://media.istockphoto.com/id/688550958/vector/black-plus-sign-positive-symbol.jpg?s=2048x2048&w=is&k=20&c=yYctB_ye3GL-rnDZ6jUK2kj8KeziyYJZf4CpFiCAChc=';
  const minusUrl = 'https://thumbs.dreamstime.com/z/minus-sign-icon-vector-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133735659.jpg';
  
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
  
    const [activeSuperCategoryIndex, setActiveSuperCategoryIndex] =  useState(null);
    const [activeSubCategoryIndex, setActiveSubcategoryIndex] = useState(null);
   
  
   
  
    const renderDrawerItem = ({item, index}) => {
      return (
        <>
          <TouchableOpacity
           style={{height : 50,width : '100%',backgroundColor : 'black',justifyContent : 'space-between' ,alignItems : 'center',flexDirection : 'row',paddingHorizontal : 10}}
            activeOpacity={1}
            onPress={() => {
              if(item.subCategoryData.length > 0 && activeSuperCategoryIndex !== index){
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
            {item.subCategoryData.length > 0 && (<Image
             style={{
              width: 15,
              height: 15 ,
            }}
             source={{
             uri: activeSuperCategoryIndex !== null && activeSuperCategoryIndex === index ? minusUrl : plusUrl,
        }}
      />)}
          </TouchableOpacity>
    
         {activeSuperCategoryIndex !== null && item.subCategoryData.length > 0 && activeSuperCategoryIndex === index  && (<FlatList
                    data={item.subCategoryData}
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
              if(item.childCategoryData.length > 0 && activeSubCategoryIndex !== index){
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
              {item.childCategoryData.length > 0 && (<Image
             style={{
              width: 15,
              height: 15 ,
            }}
             source={{
             uri: activeSubCategoryIndex !== null && activeSubCategoryIndex === index ? minusUrl : plusUrl,
        }}
      />)}
          </TouchableOpacity>
          {activeSubCategoryIndex !== null && item.childCategoryData.length > 0 && activeSubCategoryIndex === index && (<FlatList
                    data={item.childCategoryData}
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
          data={SuperCategoryData}
          renderItem={renderDrawerItem}
          keyExtractor={item => item.name}
        />
      </>
    );
  }
  


export default DrawerNavigator;