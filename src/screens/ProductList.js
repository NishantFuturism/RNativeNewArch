import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator,Switch, TouchableOpacity, Image} from 'react-native';
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
          <>
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleViewHandler}
        value={isEnabled}
      />
      {/* <View>
        <Image 
      style={{width : 25,height : 25}}
       source={{
          uri: isEnabled ? 'https://cdn-icons-png.flaticon.com/512/3603/3603555.png' : 'https://cdn-icons-png.flaticon.com/512/6800/6800771.png',
        }}
        />
      </View> */}
          </>
          
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