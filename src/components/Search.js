// import React from 'react';
// import { Image, View, Text, StyleSheet } from 'react-native';
// import { theme } from '../constants/Theme';
// import { useNavigation } from '@react-navigation/native';

// const Search = () => {
//     const navigation = useNavigation();
//     return (
//         <View style={theme.searchMainContainer} onTouchEnd={() => navigation.navigate('Search')}>
//             <View style={styles.searchContainer}>
//                 <Image source={require('../../assets/images/icon-search-personal-screen.png')} style={styles.searchImage} />
//                 <Text style={{ marginLeft: 5, color: '#181b1f', fontFamily: 'CeraPRO-Bold' }}>Search</Text>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     searchContainer: {
//         backgroundColor: '#f2f2f2',
//         borderColor: '#74b124',
//         marginLeft: 5,
//         marginRight: 5,
//         borderRadius: 20,
//         height: 40,
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     searchImage: {
//         height: 32,
//         width: 32,
//         marginLeft: 10
//     }
// });

// export default Search;