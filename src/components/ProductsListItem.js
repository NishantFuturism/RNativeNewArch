import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, Dimensions, Image} from 'react-native';
import Network from '../utility/Network';
const ProductListItem = ({item,index}) => {
    return(
        <View style={{
            width : Dimensions.get('window').width - 20,
            height :  200,
            justifyContent : 'space-evenly',
            alignItems : 'center',
            // flexDirection : 'row',
        }}>
                   <Image
        style={{
            width : 100,height : 100,resizeMode : 'contain'
        }}
        source={{uri : `${Network.baseUrl + item.imageUrl}`}}
        />
            <Text>{index + 1}. I am {item.title} priced at {item.price}</Text>
        </View>
    )
}

export default ProductListItem;