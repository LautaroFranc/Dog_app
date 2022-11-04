import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
// import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
