export interface IAPICredentials {
    token:        string;
    activeSecret: string;
    formerSecret: string;
}

export interface ICallBack {
    url:           string;
    token:         string;
    activeSecrect: string;
}

export interface IDataRetentionPolicy {
    transactionDeletionEnabled: boolean;
    dataDeletionEnabled:        boolean;
    period:                     number;
}

export interface ISupportingDocument {
    sequence: ISequence[];
}

export interface ICountry {
    name: string;
    code: string;
}

export interface IDocumentType {
    code:        string;
    name:        string;
    twoSided:    boolean;
    faceCheck:   boolean;
    expiryCheck: boolean;
}

export interface ISequence {
    order:             number;
    requiredPoints:    number;
    availableDocument: IDocument[];
}

export interface IDocument {
    name:           string;
    category:       string;
    documentPoints: number;
    documentType:   IDocumentType;
    country:        ICountry;
    documentOrder?: number;
}


export interface IIdentityProofing {
    identityFrameworkId: string;
    name:                string;
    description:         string;
    level:               IIdentityLevel[];
}

export interface IIdentityLevel {
    code:                 string;
    description:          string;
    faceMatchRequired:    boolean;
    allowLinkingDocument: boolean;
    additionalDocument:   IDocument[];
    supportingDocument:   ISupportingDocument;
}

export interface ISelectItem {
    name: string,
    value: any,
    list: Array<any>,
}

export interface ICountryItem {
    alpha2Code: string,
    alpha3Code: string,
    name: string,
}

export interface IUserRole {
    name: string,
    displayName: string,
    scope: string,
    visible: boolean,
    resources: Array<string>,
}
