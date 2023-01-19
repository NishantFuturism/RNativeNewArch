import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList} from 'react-native';
const ProductListItem = ({item,index}) => {
    console.log("ProductListItem")
    return(
        <Text style={{width : 200,height : 100}}>I am on {index}</Text>
    )
}

export default ProductListItem;