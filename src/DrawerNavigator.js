import React, {useState, useEffect, useCallback} from 'react';
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
    const [subMenuIndexes, setOfSubMenuIndexes] =  useState([]);
    const [nestedLevels,setNestedLevels] = useState([]);
    const [nestedMenus,setNestedMenus] = useState([]);
    // const [activeSubCategoryIndex, setActiveSubcategoryIndex] = useState(null);
    // const [renderDrawerTimes,setRenderDrawerTimes] = useState()
    // const [activeTreeTracker,setActiveTreeTracker] = useState([0,2,4,5]);
   let counter = -1;
    
   useEffect(() => {
       console.log("activeSuperCategoryIndexactiveSuperCategoryIndex",subMenuIndexes);
      //  renderMenus()
   },[subMenuIndexes])

   useEffect(() => {
    if(nestedMenus){
      if(nestedMenus.length > 0){
        console.log(nestedMenus[0].submenu);
      }
    }
   },[nestedMenus])

  
    const renderSubmenus = ({item, index}) => {
      return (
        <>
          <TouchableOpacity
           style={{height : 50,width : '100%',backgroundColor : 'grey',justifyContent : 'space-between' ,alignItems : 'center',flexDirection : 'row',paddingHorizontal : 10}}
            activeOpacity={1}
            onPress={() => {
              console.log("index clicked",index);
              // if(item.submenu && item.submenu.length > 0){
              //   setOfSubMenuIndexes(oldArray => [...oldArray, index]);
              // }
              if(item.submenu && item.submenu.length > 0){
                setNestedMenus(oldArray => [...oldArray, item]);
              }
          
            }}>
            <Text
            style={{color : 'white'}}
             >
              {item.title}
            </Text>
            {item.submenu && item.submenu.length > 0 && (<Image
             style={{
              width: 15,
              height: 15 ,
            }}
             source={{
             uri: nestedMenus.length > 0 && item.title == nestedMenus[nestedMenus.length - 1].title ? minusImgUrl : plusImgUrl,
        }}
      />)}
          </TouchableOpacity>
         {item.submenu && nestedMenus.length > 0 && item.title == nestedMenus[nestedMenus.length - 1].title && renderMenus(item.submenu)}

            
          
  
        </>
      );
    };
  
 
    const renderMenus = useCallback((drawerData) => {
      // console.log("renderParentItem",index);
      {counter++}
      {console.log("counter",counter)}
      return(
        <FlatList
          data={drawerData}
          renderItem={renderSubmenus}
          keyExtractor={(item,index) => index.toString()}
        />
      )
    },[nestedMenus])
  
  
    return (
      <>
       {renderMenus(drawerData)}
      </>
    );
  }
  


export default DrawerNavigator;