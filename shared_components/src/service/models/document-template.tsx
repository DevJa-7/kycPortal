import { DOCUMENT_TYPES } from '../../common/constants';

// Document Template
export interface IDocumentTemplateItem {
    id:     number,
    key:    string,
    label:  string,
}

export interface IDocumentTemplate {
    _id?: string,
    __v?: number,
    updatedAt?: Date,
    updatedBy?: string,
    createdAt?: Date,
    createdBy?: string,
    country: {
        code: string,
        name: string,
    },
    documentType: {
        code: string,
        name: string,
    },
    maxPageCount: number,
    name?: string,
    textractRules?: any,
}

export interface IDocuments {
    count: number,
    limit: number,
    page: number,
    pageCount: number,
    items: IDocumentTemplate[],
}

export interface IDocumentTemplateType {
    code: DOCUMENT_TYPES,
    maxPageCount?: number,
    name: string,
}
