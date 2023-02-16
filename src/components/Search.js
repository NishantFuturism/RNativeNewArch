import React, { useCallback, useState,useEffect, useRef } from 'react';
import { Image, View, Text, StyleSheet,TextInput,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductListItem from './ProductsListItem';
import { clearSearchStore, fetchProductsByName } from '../redux/actions/Product';

let debounceHandler = null;

const Search = props => {
    const dispatch = useDispatch();
    const [searchText, onChangeSearchText] = useState('');
    const didMount = useRef(false);
    const fetchedProductSearchedResult = useSelector(state => state.product.productSearchResult);

    const RenderEmptyItem = () => {
        return (
            <View style={{flex : 1,justifyContent : 'center',alignItems : 'center',backgroundColor : 'blue'}}>
            <Text>No Users to Show.</Text>
            </View>
        )
    }

    const getProductsBySearch = () => {
        try {
           dispatch(fetchProductsByName(searchText)).then(res => {console.log("res")} );
        } catch (error) {
          console.error(error);
        }
    };
    
    const ItemDivider = () => {
        return (
            <View style={{ height: 1,
                backgroundColor: 'red',
                marginTop: 20,
                marginBottom: 15}}/>
        )
    }

    const renderLoader = useCallback(() => {
        return(
            <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
      },[]);

     
      const keyExtractor = useCallback((item) => item.id.toString(),[]);

      const getItemLayout = useCallback((data,index) => ({
          length : 100,
          offset : 100 * index,
          index
      }),[]);
      
      useEffect(() => {
        if(searchText == '') dispatch(clearSearchStore());
        
        if (didMount.current) {
            debounceHandler = setTimeout(() => {
                if(searchText != '') getProductsBySearch();
            }, 3000);
            //cleanUp function
            return () => {
              clearTimeout(debounceHandler);
            };
          } else {
            didMount.current = true;
          }
        
      }, [searchText]);

    return(
        <>
        <TextInput
                style={{
                  width: '60%',
                  height: 55,
                  // backgroundColor: 'transparent',
                  color: 'black',
                  fontSize: 16,
                //   fontFamily: 'CeraPRO-Regular',
                  // padding : 10,
                  borderColor : 'black',
                  borderWidth : 1,
                  marginVertical : 10
                }}
                accessibilityLabel="search input"
                // ref={inputEl}
                placeholderTextColor={'red'}
                onChangeText={onChangeSearchText}
                value={searchText}
                placeholder="Search"
                keyboardType="phone-pad"
                // autoFocus={inputEl}
                // onSubmitEditing={Keyboard.dismiss}
                // ref={textareaRef}
                // onFocus={(e) => e.persist()}
              />
        <FlatList
            data={fetchedProductSearchedResult}
            renderItem={ProductListItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => <ItemDivider />}
            ListEmptyComponent={RenderEmptyItem}
            getItemLayout={getItemLayout}
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