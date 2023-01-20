import Types from '../Types';

const initialState = {
  products: [],
  productSearchResult : []
};

export default (state = initialState, action) => {
  //console.log('action.type', action.payload);

  switch (action.type) {
    case Types.PRODUCTS.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
      case Types.PRODUCTS.PRODUCT_SEARCH_SUCCESS:
        return {
          ...state,
          productSearchResult: action.payload,
        }; 
    default:
      return state;
  }
};
