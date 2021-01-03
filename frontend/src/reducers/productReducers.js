import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_ERROR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_RESET,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productItemReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_ITEM_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_ITEM_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ITEM_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case CREATE_PRODUCT_ERROR:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
