import Types from '../Types';

const initialState = {
  products: [],
  productSearchResult : [],
  isListView : true,
  isGridView : false
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
      case Types.PRODUCTS.IS_LIST_VIEW:
          return {
            ...state,
            isListView: action.payload,
          }; 
      case Types.PRODUCTS.IS_GRID_VIEW:
            return {
              ...state,
              isGridView : action.payload,
            };    
    default:
      return state;
  }
};
