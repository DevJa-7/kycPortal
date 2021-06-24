import { IUserRole } from './common';

/**
 * Product List
 */
export interface IProductItem {
    code: string,
    name: string,
    roles: Array<IUserRole>
}

export interface IProductList {
    items: Array<IProductItem>,
    count: number,
    limit: number,
    page: number,
    pageCount: number
}
