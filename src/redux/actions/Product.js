import Types from '../Types';
import Network from '../../utility/Network';

export const fetchProducts = (page = 1,per_page = 100,productsFromUI) => {
  return async dispatch => {
    // any async code you want!
    try {
      const url = Network.users + '?' + 'page=' + page + '&' + 'per_page=' + per_page;
      const response = await fetch(
        url ,
        {
          method: 'GET',
          headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
           },
        }
      );
      const jsonResponse = await response.json();
      
      if(response.status === 200){
        console.log("page",page);
        dispatch({
          type: Types.PRODUCTS.PRODUCT_LIST_SUCCESS,
          payload: page > 1 ? productsFromUI.concat(jsonResponse) :  jsonResponse,
        });
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchProductsByName = (inputValue = '') => {
  return async dispatch => {
    // any async code you want!
    try {
      const url = Network.searchUsersByName + inputValue;
      const response = await fetch(
        url ,
        {
          method: 'GET',
          headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
           },
        }
      );
      const jsonResponse = await response.json();
      
      if(response.status === 200){
        console.log("userSearchResult",jsonResponse);
        dispatch({
          type: Types.PRODUCTS.PRODUCT_SEARCH_SUCCESS,
          payload: jsonResponse,
        });
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};







export const clearSearchStore = () => {
  return async dispatch => {
    // any async code you want!
    try {
      dispatch({ type: Types.PRODUCTS.PRODUCT_SEARCH_SUCCESS, payload: [] });
    } catch (err) {
      console.log(err);
    }
  };
};



