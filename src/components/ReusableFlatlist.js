import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, ActivityIndicatorComponent, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const ReusableFlatlist = (props) => {

    const ItemDivider = () => {
        return (
            <View style={{ height: 1,
                backgroundColor: Colors.primary,
                marginTop: 20,
                marginBottom: 15}}/>
        ) }

        const RenderEmptyItem = () => {
            return (
                <View style={{flex : 1,justifyContent : 'center',alignItems : 'center',backgroundColor : 'blue'}}>
                <Text>No Items to Show.</Text>
                </View>
            )
        }
    
        const getItemLayout = useCallback((data,index) => ({
            length : props.isItemDimensionDynamic === true ? props.getItemStaticDimension.height : 100,
            offset :  props.isItemDimensionDynamic === true ? props.getItemStaticDimension.height : 100 * index,
            index
        }),[]);
    

   return(
                   <FlatList
                    data={props.data ? props.data : []}
                    initialNumToRender={props.initialNumToRender ? props.initialNumToRender :  10}
                    renderItem={props.itemToRender ? props.itemToRender : null }
                    keyExtractor={props.keyExtract ? props.keyExtract : null}
                    ItemSeparatorComponent={props.itemDivider ? props.itemDivider : null}
                    onMomentumScrollBegin={() => {
                       props.scrollBegin();
                    }}
                    // scrollEventThrottle={250}
                    onEndReached={() => {
                     props.onBottomReached();
                    }}
                    ListEmptyComponent={RenderEmptyItem}
                    onEndReachedThreshold={0.5}
                    getItemLayout={props.isItemDimensionDynamic === true ? getItemLayout : null}
                    ListFooterComponent={props.isLoadingMore ? props.renderLoaderComponent : null}
                    onRefresh={() => {
                     props.onRefresh();
                    }}
                    refreshing={props.refreshing}
                    maxToRenderPerBatch={props.maxToRenderPerBatch ? props.maxToRenderPerBatch : 50}
                  />
   )

                
}

export default ReusableFlatlist;