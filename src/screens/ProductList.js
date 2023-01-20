import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from '../components/ProductsListItem';
import Colors from '../constants/Colors';
import { fetchProducts } from '../redux/actions/Product';

const ProductList = props => {
    var onEndReachedCalledDuringMomentum = false;
    const dispatch = useDispatch();
    const fetchedProducts = useSelector(state => state.product.products);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageLimit,setPageLimit] = useState(100);

    const [isIntialLoading,setIsIntialLoading] = useState(false);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const [isLoadingRefresh,setIsLoadingRefresh] = useState(false);
    
    const keyExtractor = useCallback((item) => item.id.toString(),[]);

    const getItemLayout = useCallback((data,index) => ({
        length : 100,
        offset : 100 * index,
        index
    }),[]);

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
             dispatch(fetchProducts(pageNumber,pageLimit,fetchedProducts)).then(res => {setIsIntialLoading(false);setIsLoadingRefresh(false);console.log("res")} );
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


    return (
        <>
        <View>
                  {isIntialLoading && ( <View style={{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    {renderLoader()}
                  </View> )}
                  {!isIntialLoading && (<FlatList
                    data={fetchedProducts}
                    initialNumToRender={50}
                    // extraData={fetchedProducts}
                    renderItem={ProductListItem}
                    keyExtractor={keyExtractor}
                    // getItemCount={getItemCount}
                    // getItem={getItem}
                    ItemSeparatorComponent={() => <ItemDivider />}
                    // refreshing={isMoreProdsLoading}
                    onMomentumScrollBegin={() => {
                    //   setIsMoreProdsLoading(true);
                    setIsLoadingMore(false);
                      onEndReachedCalledDuringMomentum = false;
                    }}
                    // scrollEventThrottle={250}
                    onEndReached={() => {
                      console.log('inside onEndReached');
                      // if (isMoreProducts) {
                      // setIsMoreProdsLoading(true);

                      //setProdIndex(1 + products.length);
                    //   console.log('inside onEndReached');
                      if (!onEndReachedCalledDuringMomentum && !isLoadingMore) {
                        console.log("inside onEndReachedMomentum");
                        // setIsLoadingMore(true);
                        onEndReachedCalledDuringMomentum = true;
                        // offset = offset + 10;
                        setIsLoadingMore(true);
                        setPageNumber(pageNumber + 1);
                        // getProductsList();
                      }
                      // }
                      
                    }}
                    ListEmptyComponent={RenderEmptyItem}
                    onEndReachedThreshold={0.5}
                    getItemLayout={getItemLayout}
                    ListFooterComponent={isLoadingMore ?  renderLoader : null}
                    onRefresh={() => {
                      // setIsIntialLoading(true);
                        setIsLoadingRefresh(true);
                        setPageNumber(1);
                        // getProductsList();
                    }}
                    refreshing={isLoadingRefresh}
                    maxToRenderPerBatch={50}
                  />)}
                
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
    },
  });

export default ProductList;

