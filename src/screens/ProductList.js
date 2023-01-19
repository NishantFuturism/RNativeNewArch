import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from '../components/ProductsListItem';
import Colors from '../constants/Colors';
import { fetchProducts } from '../redux/actions/Product';

const ProductList = props => {
    const dispatch = useDispatch();
    const fetchedProducts = useSelector(state => state.product.products);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageLimit,setPageLimit] = useState(100);
    const [isLoadingMore,setIsLoadingMore] = useState(false);
    const keyExtractor = useCallback((item) => item.id.toString(),[]);

    const getItemLayout = useCallback((data,index) => ({
        length : 100,
        offset : 100 * index,
        index
    }),[]);

    useEffect(() => {
        console.log('inside first useEffect');
        setPageNumber(1);
        getProductsList();    
      }, []);

    const getProductsList = () => {
          try {
             dispatch(fetchProducts(pageNumber,pageLimit,fetchedProducts)).then(res => setIsLoadingMore(false));
          } catch (error) {
            console.error(error);
          }
      };

      const renderFooterItem = () => {
        return(
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
      }


    var onEndReachedCalledDuringMomentum = false;
    return (
        <>
        <View>
                  <FlatList
                    data={fetchedProducts}
                    // extraData={fetchedProducts}
                    renderItem={ProductListItem}
                    keyExtractor={keyExtractor}
                    // getItemCount={getItemCount}
                    // getItem={getItem}
                    ItemSeparatorComponent={() => <ItemDivider />}
                    // refreshing={isMoreProdsLoading}
                    onMomentumScrollBegin={() => {
                    //   setIsMoreProdsLoading(true);
                      onEndReachedCalledDuringMomentum = false;
                    }}
                    onEndReached={() => {
                      console.log('inside onEndReached');
                      // if (isMoreProducts) {
                      // setIsMoreProdsLoading(true);

                      //setProdIndex(1 + products.length);
                    //   console.log('inside onEndReached');
                      if (!onEndReachedCalledDuringMomentum) {
                        setIsLoadingMore(true);
                        onEndReachedCalledDuringMomentum = true;
                        // offset = offset + 10;
                        setPageNumber(pageNumber + 1);
                        getProductsList();
                      }
                      // }
                      
                    }}
                    ListEmptyComponent={RenderEmptyItem}
                    onEndReachedThreshold={0.5}
                    getItemLayout={getItemLayout}
                    ListFooterComponent={renderFooterItem}
                  />
                
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

