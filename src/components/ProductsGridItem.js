import { Text, View } from "react-native";
import Colors from "../constants/Colors";

const ProductsGridItem = ({item,index}) => {
     return (
        <View style={{justifyContent : 'center', alignItems : "center" ,width : 150, height : 150,borderColor : Colors.dividerColor,borderRadius : 10,borderWidth : 0.5,marginHorizontal : 3,backgroundColor : 'black'}}>
                <Text style={{color : 'white'}}>{index + 1}.{item.name}</Text>
        </View>
     )
}

export default ProductsGridItem;