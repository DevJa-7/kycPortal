import * as ActionTypes from './actionTypes';
import {
    IDocuments,
} from 'shared_components/src/service/models/document-template';

export const setDocumentList = (list: IDocuments) => ({
    type: ActionTypes.SET_DOCUMENT_LIST,
    payload: list
});

export const setDocumentPage = (pageIndex: number) => ({
    type: ActionTypes.SET_DOCUMENT_PAGE_INDEX,
    payload: pageIndex
});

export type DocumentTemplateAction =
    | ReturnType<typeof setDocumentList>
    | ReturnType<typeof setDocumentPage>;
