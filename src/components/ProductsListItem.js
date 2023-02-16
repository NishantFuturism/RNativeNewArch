import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList} from 'react-native';
const ProductListItem = ({item,index}) => {
    return(
        <Text style={{width : 200,height : 100}}>I am {item.name} and on {index + 1}</Text>
    )
}

export default ProductListItem;