import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Image, View, Text, StyleSheet, TextInput, FlatList, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from './ProductsListItem';
import { clearSearchStore, fetchProductsByName } from '../redux/actions/Product';
import ReusableFlatlist from './ReusableFlatlist';
import { ProductItemConstants } from '../constants/ProductItemConstants';

let debounceHandler = null;

const Search = props => {
  const dispatch = useDispatch();
  const [searchText, onChangeSearchText] = useState('');
  const [isFocused, setFocused] = useState(false);
  const didMount = useRef(false);
  const fetchedProductSearchedResult = useSelector(state => state.product.productSearchResult);
  const listViewState = useSelector(state => state.product.isListView);
  const gridViewState = useSelector(state => state.product.isGridView);
  const RenderEmptyItem = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
        <Text>No Users to Show.</Text>
      </View>
    )
  }

  const getProductsBySearch = () => {
    try {
      dispatch(fetchProductsByName(searchText)).then(res => { console.log("res") });
    } catch (error) {
      console.error(error);
    }
  };

  const ItemDivider = () => {
    return (
      <View style={{
        height: 1,
        backgroundColor: 'red',
        marginTop: 20,
        marginBottom: 15
      }} />
    )
  }

  const renderLoader = useCallback(() => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }, []);

  const loadMoreButton = () => {
    return (
      <TouchableOpacity 
       onPress={() => {
       }}
      style={{width : '50%',justifyContent :'center',alignItems : 'center',height : 70,backgroundColor : 'green',marginBottom : 30 }}>
        <Text>Load More...</Text>
      </TouchableOpacity>
    )
  }


  const flatListHeader = () => {
    return (
      <TouchableWithoutFeedback
      onPress={() => {
        setFocused(false);
        Keyboard.dismiss();
      }} accessible={false}>
      <>
        <View style={{
          width: '90%',
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
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const getItemLayout = useCallback((data, index) => ({
    length: 100,
    offset: 100 * index,
    index
  }), []);

  useEffect(() => {
    if (searchText == '') dispatch(clearSearchStore());

    if (didMount.current) {
      debounceHandler = setTimeout(() => {
        if (searchText != '') getProductsBySearch();
      }, 3000);
      //cleanUp function
      return () => {
        clearTimeout(debounceHandler);
      };
    } else {
      didMount.current = true;
    }

  }, [searchText]);

  const configuration = {
    enableLazyLoading: false,
    enablePullToRefresh: false,
    isItemDimensionDynamic: false,
    isAutoLoadMore : false,
    data: fetchedProductSearchedResult,
    initialNumToRender: 50,
    keyExtract: keyExtractor,
    itemDivider: ItemDivider,
    renderLoaderComponent: renderLoader,
    isLoadingMore: false,
    refreshing: false,
    maxToRenderPerBatch: 50,
    getItemStaticDimension: { height: 100 },
    ListFooterComponent: null,
    itemToRender: ProductItemConstants,
    listView : listViewState,
    gridView : gridViewState,
    loadMoreButton : null,
  }

 

  return (
    <>      
           {flatListHeader()}
          <ReusableFlatlist
            config={configuration}
          />
       
    </>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#f2f2f2',
    borderColor: '#74b124',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchImage: {
    height: 32,
    width: 32,
    marginLeft: 10
  }
});

export default Search;