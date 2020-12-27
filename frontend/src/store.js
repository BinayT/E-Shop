import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productListReducer,
  productItemReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const initialState = {};

const reducer = combineReducers({
  productsList: productListReducer,
  productList: productItemReducer,
  cart: cartReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
