import * as ActionTypes from './actionTypes';
import { ProductAction } from './actions';
import {
    IProductItem
} from 'shared_components/src/service/models';

type Product = {
    products:   IProductItem[],
    product:    IProductItem,
}

const initialState: Product = {
    products:   [],
    product:    {} as IProductItem,
}

const ProductReducer = (
    state: Product = initialState,
    action: ProductAction,
) => {
    switch (action.type) {

        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };

        case ActionTypes.SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };

        default:
            return state;
    }
}

export default ProductReducer;
