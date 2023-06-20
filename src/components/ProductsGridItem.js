import React from "react";
import { Image, Text, View } from "react-native";
import Colors from "../constants/Colors";
import Network from "../utility/Network";

const ProductsGridItem = ({item,index}) => {
     return (
        <View style={{justifyContent : 'center', alignItems : "center" ,width : 150, height : 150,borderColor : Colors.dividerColor,borderRadius : 10,borderWidth : 0.5,marginHorizontal : 3,backgroundColor : 'black'}}>
                <Image
        style={{
            width : 50,height : 50,resizeMode : 'contain'
        }}
        source={{uri : `${Network.baseUrl + item.imageUrl}`}}
      />
                <Text style={{color : 'white'}}>{index + 1}.{item.title}</Text>
        </View>
     )
}

export default ProductsGridItem;