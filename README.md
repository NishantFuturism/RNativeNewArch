# react-native-multi-feature-flatlist

[![NPM](https://nodei.co/npm/react-native-paginate.png?downloads=true)](https://nodei.co/npm/react-native-multi-feature-flatlist/)

**A ReactNative's Flatlist component with multi-feature accessibility.**

By installing this component, you will be able to render multiple cards in addition to a grid view and a list view with pagination.You can switch from list to grid and vice-versa via switch button on top right.You can also opt for types of loadmore options i.e. if you want mobile to automatically handle pagination or Leave it to the user to load more 10 item.If you do not require a feature, you can deactivate or activate it by passing props to the component.As an example, see the image below.

There's a Search Component you can find in App.js,it is commented but it demonstrates how you can use the flatlist with minimalist features.Also there's a search functionality that fetches data from server and rehydrated the flatlist.The most important feature of search component is it does not follow the traditional way of fetching data on every key hit by user.But instead uses technique called Throttling.So request will only go to server when user stop pressing the keys.
Advantage of Throttling - 
On contrary to fetching data on every key press which burdens the server,it actually relaxes server and UI which tends to increase the performance of application drastically.

Note : you can change the milliseconds,the number which is responsible to wait and requesting data after last key press.

## Very Important Note :
Inside App.js - Do not use ProductList and Search Components at a time.Please Comment atleast one of them.

<img src='01-grid-list-pagination/public/RNFlatlistMultiFeature.png' alt='img' />

## Installation

Install `react-native-multi-feature-flatlist` with [npm](https://www.npmjs.com/):

```
npm install react-native-multi-feature-flatlist--save

```

## Usage

```javascript

import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator,Switch, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ReusableFlatlist from '../components/ReusableFlatlist';
import Colors from '../constants/Colors';
import { ProductItemConstants } from '../constants/ProductItemConstants';
import { fetchProducts,toggleProductListView,toggleProductGridView } from '../redux/actions/Product';

const ProductList = props => {
    var onEndReachedCalledDuringMomentum = false;
    const dispatch = useDispatch();
    const fetchedProducts = useSelector(state => state.product.products);
    const listViewState = useSelector(state => state.product.isListView);
    const gridViewState = useSelector(state => state.product.isGridView);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageLimit,setPageLimit] = useState(10);

    const [isIntialLoading,setIsIntialLoading] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isLoadingRefresh,setIsLoadingRefresh] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);


    const toggleViewHandler = () => setIsEnabled(!isEnabled);


  

    const keyExtractor = useCallback((item) => item.id.toString(),[]);


    useEffect(() => {
        setIsIntialLoading(true);  
      }, []);
 
      useEffect(() => {
        getProductsList();
      },[pageNumber])


      useEffect(() => {
        if(!isEnabled){
          dispatch(toggleProductListView(false));
          dispatch(toggleProductGridView(true));
        }else{
          dispatch(toggleProductListView(true));
          dispatch(toggleProductGridView(false));
        }
        
      },[isEnabled])


    const getProductsList = () => {
          try {
             dispatch(fetchProducts(pageNumber,pageLimit,fetchedProducts)).then(res => {setIsIntialLoading(false);setIsLoadingRefresh(false);setIsLoadingMore(false);console.log("res")} );
          } catch (error) {
            console.error(error);
          }
      };

      const renderSwitchButton = () => {
        return (
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleViewHandler}
        value={isEnabled}
      />
        )
      }
 
      const renderLoader = useCallback(() => {
        return(
            <ActivityIndicator size="large" color="#00ff00" />
        )
      },[]);

      const renderFooterLoader = useCallback(() => {
        return(
            <ActivityIndicator style={{marginBottom : 30}} size="large" color="#00ff00" />
        )
      },[]);

      const loadMoreButton = () => {
        return (
          <TouchableOpacity 
           onPress={() => {
            onBottomReachedCalled();
           }}
          style={{width : '50%',justifyContent :'center',alignItems : 'center',height : 70,backgroundColor : 'green',marginBottom : 30 }}>
            <Text>Load More...</Text>
          </TouchableOpacity>
        )
      }

    const onBottomReachedCalled = () => {
      if (!onEndReachedCalledDuringMomentum && !isLoadingMore && fetchedProducts.length > 0) {
        onEndReachedCalledDuringMomentum = true;
        setIsLoadingMore(true);
        setPageNumber(pageNumber + 1);
      }
    }


    const configuration = {
      enableLazyLoading : true,
      enablePullToRefresh : true,
      isItemDimensionDynamic : false,
      isAutoLoadMore : true,
      data:fetchedProducts,
      initialNumToRender : 50,
      keyExtract : keyExtractor,
      itemDivider : ItemDivider,
      renderLoaderComponent : renderFooterLoader,
      isLoadingMore : isLoadingMore,
      refreshing : isLoadingRefresh,
      maxToRenderPerBatch : 50,
      getItemStaticDimension : {height : 100},
      itemToRender : ProductItemConstants,
      listView : listViewState,
      gridView : gridViewState,
      loadMoreButton : loadMoreButton,
   }


    return (
        <View>
                  {isIntialLoading && (<View style={{flex : 1,backgroundColor : 'red'}}>
                    {renderLoader()}
                  </View> )}
                  {!isIntialLoading && renderSwitchButton()}
                  {!isIntialLoading && (<ReusableFlatlist
                    config={configuration}
                    scrollBegin={() => {
                      onEndReachedCalledDuringMomentum = false;
                    }}
                    onBottomReached={() => {
                      onBottomReachedCalled();
                    }}
                    onRefresh={() => {
                      if(pageNumber > 1){
                        setIsLoadingRefresh(true);
                        setPageNumber(1);
                      }    
                    }}
                     /> )}
                  
                
        </View>
    )
}


const ItemDivider = () => {
    return (
        <View style={{ height: 1,
            backgroundColor: Colors.primary,
            marginTop: 20,
            marginBottom: 15}}/>
    )
}

export default ProductList;

```



## App.js with Redux Store
```javascript

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
// import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNBootSplash from "react-native-bootsplash";
import Redux from './src/redux';
import ProductList from './src/screens/ProductList';
import Search from './src/components/Search';
import ScreenWrapper from './src/components/ScreenWrapper';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
      RNBootSplash.hide();
      console.log("Bootsplash has been hidden successfully");
  }, []);

  return (
    <Redux>
      <ScreenWrapper disableScrollView={true}>
      <ProductList/>
      {/* <Search/> */}
      </ScreenWrapper>
    </Redux>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


```

## Props

| Name                     | Type       | Description                                                                                                                                                            |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                   | `array`    | **Required.** The array which contains data to be render into the cards.                                                                                                                               |
| `configuration`                 | `object`   | **Required.** The object contains boolean parameters to enable/disable features.Objects contains below keys : 
      enableLazyLoading 
      enablePullToRefresh,
      isItemDimensionDynamic,
      isAutoLoadMore,
      data,
      initialNumToRender,
      keyExtract,
      itemDivider,
      renderLoaderComponent,
      isLoadingMore,
      refreshing,
      maxToRenderPerBatch,
      getItemStaticDimension,
      itemToRender,
      listView,
      gridView,
      loadMoreButton,
 as you see in the above code in line no 107 to 123.                                                                                                                                   |