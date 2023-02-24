import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList} from 'react-native';
const ProductListItem = ({item,index}) => {
    return(
        <Text style={{width : 200,height : 100}}>I am {item.name} {index + 1} and {item.status}</Text>
    )
}

export default ProductListItem;