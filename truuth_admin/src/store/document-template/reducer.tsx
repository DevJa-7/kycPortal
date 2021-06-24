import * as ActionTypes from './actionTypes';
import { DocumentTemplateAction } from './actions';
import { IDocuments } from 'shared_components/src/service/models/document-template';

type DocumentTemplate = {
    documents: IDocuments,
    documentPage: number,
}

const initialState: DocumentTemplate = {
    documents: {
        docs: [],
        count: 0,
        limit: 10,
        page: 1,
        pageCount: 1,
    } as unknown as IDocuments,
    documentPage: 1,
}

const Reducer = (state: DocumentTemplate = initialState, action: DocumentTemplateAction) => {
    switch (action.type) {
        case ActionTypes.SET_DOCUMENT_LIST:
            return {
                ...state,
                documents: action.payload,
            };

        case ActionTypes.SET_DOCUMENT_PAGE_INDEX:
            return {
                ...state,
                documentPage: action.payload,
            };

        default:
            return state;
    }
};

export default Reducer;
