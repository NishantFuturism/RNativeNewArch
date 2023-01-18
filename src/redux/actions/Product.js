import Types from '../Types';
import Network from '../../utility/Network';

export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want!
    try {
      // const response = await fetch(
      //   Network.urlgetSearchDetailsPanIndia,
      //   Network.get_UrlEncodedRequest_With_Headers(header),
      // );
      // const json = await response.json();
      // console.log('jsonjsonjson', JSON.stringify(json));
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};







// export const applySelectedFilters = filterObj => {
//   return async dispatch => {
//     // any async code you want!
//     try {
//       dispatch({ type: Types.PRODUCTS.FILTER_APPLY_SUCCESS, payload: filterObj });
//     } catch (err) {
//       dispatch({
//         type: Types.PRODUCTS.FILTER_APPLY_FAILURE,
//         payload: new Error(err),
//       });
//     }
//   };
// };



