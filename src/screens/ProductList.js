import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ReusableFlatlist from '../components/ReusableFlatlist';
import Colors from '../constants/Colors';
import { ProductItemConstants } from '../constants/ProductItemConstants';
import { fetchProducts } from '../redux/actions/Product';

const ProductList = props => {
    var onEndReachedCalledDuringMomentum = false;
    const dispatch = useDispatch();
    const fetchedProducts = useSelector(state => state.product.products);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageLimit,setPageLimit] = useState(10);

    const [isIntialLoading,setIsIntialLoading] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isLoadingRefresh,setIsLoadingRefresh] = useState(false);
    
    const keyExtractor = useCallback((item) => item.id.toString(),[]);


    useEffect(() => {
        setIsIntialLoading(true);
        // setPageNumber(1);
        // getProductsList();    
      }, []);
 
      useEffect(() => {
        // setIsLoadingMore(true);
        // setPageNumber(pageNumber + 1);
        getProductsList();
      },[pageNumber])

    const getProductsList = () => {
          try {
             dispatch(fetchProducts(pageNumber,pageLimit,fetchedProducts)).then(res => {setIsIntialLoading(false);setIsLoadingRefresh(false);setIsLoadingMore(false);console.log("res")} );
          } catch (error) {
            console.error(error);
          }
      };

      const renderLoader = useCallback(() => {
        return(
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
      },[]);

      const configuration = {
        enableLazyLoading : true,
        enablePullToRefresh : true,
        isItemDimensionDynamic : false,
        listView : false,
        gridView : true,
        data:fetchedProducts,
        initialNumToRender : 50,
        keyExtract : keyExtractor,
        itemDivider : ItemDivider,
        renderLoaderComponent : renderLoader,
        isLoadingMore : isLoadingMore,
        refreshing : isLoadingRefresh,
        maxToRenderPerBatch : 50,
        getItemStaticDimension : {height : 100},
        ListFooterComponent : isLoadingMore ?  renderLoader : null,
        itemToRender : ProductItemConstants,
      }


    return (
        <>
        <View>
                  {isIntialLoading && ( <View style={{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    {renderLoader()}
                  </View> )}

                  {!isIntialLoading && (<ReusableFlatlist 
                    config={configuration}
                    scrollBegin={() => {
                      onEndReachedCalledDuringMomentum = false;
                    }}
                    onBottomReached={() => {
                      if (!onEndReachedCalledDuringMomentum && !isLoadingMore && fetchedProducts.length > 0) {
                        onEndReachedCalledDuringMomentum = true;
                        setIsLoadingMore(true);
                        setPageNumber(pageNumber + 1);
                      }
                    }}
                    onRefresh={() => {
                      if(pageNumber > 1){
                        setIsLoadingRefresh(true);
                        setPageNumber(1);
                      }
                       
                    }}
                     /> )}
                  
                
        </View>
        </>
    )
}

const RenderEmptyItem = () => {
    return (
        <View style={{flex : 1,justifyContent : 'center',alignItems : 'center',backgroundColor : 'blue'}}>
        <Text>No Items to Show.</Text>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      marginBottom : 30
    },
  });

export default ProductList;