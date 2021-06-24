import * as ActionTypes from './actionTypes';
import { IProductItem } from 'shared_components/src/service/models/product';

export const setProducts = (list: IProductItem[]) => ({
    type: ActionTypes.SET_PRODUCTS,
    payload: list
});

export const setProduct = (item: IProductItem | undefined) => ({
    type: ActionTypes.SET_PRODUCT,
    payload: item || {} as IProductItem,
});

export type ProductAction =
    | ReturnType<typeof setProducts>
    | ReturnType<typeof setProduct>;
