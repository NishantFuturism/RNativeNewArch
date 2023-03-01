import React, { useCallback, useEffect, useState } from 'react';
import {Text,View,StyleSheet, FlatList, Dimensions, Image} from 'react-native';
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
        source={require('../../assets/bootsplash_logo_original.png')}
      />
            <Text>{index + 1}. I am {item.name} and {item.status}</Text>
        </View>
    )
}

export default ProductListItem;