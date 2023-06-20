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
                    horizontal={false}
                    data={props.config.data ? props.config.data : []}
                    contentContainerStyle={{alignItems : 'center'}}
                    numColumns={props.config.listView ? 1 : 2}
                    key={props.config.gridView ? props.config.gridView : props.config.listView}
                    initialNumToRender={props.config.initialNumToRender ? props.config.initialNumToRender :  10}
                    renderItem={props.config.itemToRender ? props.config.listView ? props.config.itemToRender.view.list : props.config.itemToRender.view.grid : null}
                    keyExtractor={props.config.keyExtract ? props.config.keyExtract : null}
                    ItemSeparatorComponent={props.config.itemDivider ? props.config.itemDivider : null}
                    onMomentumScrollBegin={() => {
                        if(props.config.enableLazyLoading && props.config.isAutoLoadMore) props.scrollBegin();  
                    }}
                    // scrollEventThrottle={250}
                    onEndReached={({ distanceFromEnd }) => {
                        console.log("distanceFromEnd",distanceFromEnd);
                        if (distanceFromEnd < 0) return;
                        if(props.config.enableLazyLoading && props.config.isAutoLoadMore)  props.onBottomReached();
                    }}
                    ListEmptyComponent={RenderEmptyItem}
                    onEndReachedThreshold={0.5}
                    getItemLayout={props.config.isItemDimensionDynamic ? getItemLayout : null}
                    ListFooterComponent={
                        props.config.isAutoLoadMore ? props.config.isLoadingMore ?  props.config.renderLoaderComponent : null  : props.config.isLoadingMore ? props.config.renderLoaderComponent : props.config.loadMoreButton
                    }
                    ListFooterComponentStyle={{
                        marginBottom : 30
                    }}

                    onRefresh={() => {
                        if(props.config.enablePullToRefresh) props.onRefresh();
                    }}
                    refreshing={props.config.enablePullToRefresh ? props.config.refreshing : false}
                    maxToRenderPerBatch={props.config.maxToRenderPerBatch ? props.config.maxToRenderPerBatch : 50}
                  />
   )

                
}

export default ReusableFlatlist;