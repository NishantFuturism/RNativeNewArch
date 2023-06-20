import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator,Switch, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ReusableFlatlist from '../components/ReusableFlatlist';
import Colors from '../constants/Colors';
import { ProductItemConstants } from '../constants/ProductItemConstants';
import { fetchProducts,toggleProductListView,toggleProductGridView } from '../redux/actions/Product';

const ProductList = props => {
    var onEndReachedCalledDuringMomentum = false;
    const dispatch = useDispatch();
    const fetchedProducts = useSelector(state => state.product.products);
    const fetchedProductsPageDetatils = useSelector(state => state.product.productsPageDetails);
    const listViewState = useSelector(state => state.product.isListView);
    const gridViewState = useSelector(state => state.product.isGridView);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageLimit,setPageLimit] = useState(10);

    const [isIntialLoading,setIsIntialLoading] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isLoadingRefresh,setIsLoadingRefresh] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const [isFocused, setFocused] = useState(false);
    const [searchText, onChangeSearchText] = useState('');
    
    const [sortActive, setSortActive] = useState(false);
    const [sortActiveIndex,setSortActiveIndex] = useState([3]);
    const toggleViewHandler = () => setIsEnabled(!isEnabled);


    const filterObj = {
      titleSort : false,
      descriptionSort : false,
      priceSort : false,
      createdSort : false
    }

    const sortArray = [
      'Title',
      'Description',
      'Price',
      'CreatedAt'
    ]
  

    const keyExtractor = useCallback((item,index) => index.toString(),[]);


    useEffect(() => {
        setIsIntialLoading(true);  
      }, []);

      useEffect(() => {
        if(sortActiveIndex == 0){filterObj.titleSort = true}
        else if(sortActiveIndex == 1){filterObj.descriptionSort = true}
        else if(sortActiveIndex == 2){filterObj.priceSort = true}
        else if(sortActiveIndex == 3){filterObj.createdSort = true}
        getProductsList();
      },[sortActiveIndex])
 
      useEffect(() => {
        getProductsList();
      },[pageNumber])

      useEffect(() => {
        console.log("fetchedProductsPageDetatils====>>>",fetchedProductsPageDetatils);
      },[fetchedProductsPageDetatils])

      useEffect(() => {
        getProductsList();
      
      },[searchText])




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
             dispatch(fetchProducts(pageNumber,pageLimit,fetchedProducts,searchText,filterObj)).then(res => {setIsIntialLoading(false);setIsLoadingRefresh(false);setIsLoadingMore(false);console.log("res")} );
          } catch (error) {
            console.error(error);
          }
      };

      const flatListHeader = () => {
        return (
          <TouchableWithoutFeedback
          onPress={() => {
            setFocused(false);
            Keyboard.dismiss();
          }} accessible={false}>
          <>
            <View style={{
              width: '80%',
              alignSelf: 'center',
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: isFocused ? '#0430d0' : 'lightgrey',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems : 'center',
              paddingHorizontal : 10,
            }}>
              <TextInput
                style={{
                  height: 34,
                  fontSize: 20,
                  color: '#181b1e',
                  width: '70%',
                  marginHorizontal: 10,
                  height: 70,
                }}
                accessibilityLabel="search input"
                onFocus={() => { setFocused(true) }}
                placeholderTextColor={'grey'}
                onChangeText={onChangeSearchText}
                value={searchText}
                placeholder="Search"
                keyboardType="default"
                
              />
            <TouchableOpacity onPress={() => {
              onChangeSearchText('');
            }}>
              <Image
                style={{
                  width: 20, height: 20, resizeMode: 'contain'
                }}
                source={require('../../assets/close.png')}
              />
            </TouchableOpacity>
            </View>
        </>
        </TouchableWithoutFeedback>
        )
      } 
      
      const filterBox = () => {
        return(
          <>
            <TouchableOpacity style={{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}} onPress={() => setSortActive(!sortActive)}>
               <Text style={{fontSize : 21,marginRight : 20}}>Sort By</Text>
               <Image style={{height : 20,width : 20}} source={sortActive ? require('../../assets/arrow-down.png') : require('../../assets/up-arrow.png')}/>
            </TouchableOpacity>
            {sortActive && (<View style={{ position : 'absolute',alignSelf : 'center',top : 140,backgroundColor : 'white',width : 200,borderWidth : 1,borderColor : 'black',justifyContent : 'space-evenly',padding : 10,height : 200,zIndex : 99}}>
            {sortArray.map((item,index) => <TouchableOpacity onPress={() => {setSortActiveIndex(index)}} key={index}><Text style={{borderColor : 'black',borderWidth : 0.5,padding : 5,textAlign : 'center',fontSize : 17,backgroundColor : index === sortActiveIndex ? 'red' : 'white'}}>{item}</Text></TouchableOpacity>)}
            </View>)}
            </>

        )
      }

      const renderSwitchButton = () => {
        return (
          <View accessible={true} accessibilityElementsHidden={false} style={{flexDirection : 'row',alignItems : 'center',justifyContent : 'space-evenly'}}>
          {/* <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleViewHandler}
        value={isEnabled}
      /> */}
      {flatListHeader()}
      
      <View>
      
      <TouchableOpacity onPress={toggleViewHandler}>
        <Image 
      style={{width : 25,height : 25,marginBottom : 5,backgroundColor : isEnabled ? 'orange' : 'white',borderRadius : 3}}
       source={require('../../assets/grid.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleViewHandler}>
        <Image 
      style={{width : 25,height : 25,backgroundColor : !isEnabled ? 'orange' : 'white',borderRadius : 3}}
       source={require('../../assets/list.png')}
        />
      </TouchableOpacity>
      </View>
          </View>
          
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
        console.log("inside onBottomReachedCalled IF");
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
                  {!isIntialLoading && filterBox()}
                  {!isIntialLoading && (<ReusableFlatlist
                    config={configuration}
                    scrollBegin={() => {
                      onEndReachedCalledDuringMomentum = false;
                    }}
                    onBottomReached={() => {
                      if(fetchedProducts.length <= pageLimit) return;
                      console.log("onBottomReached");
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