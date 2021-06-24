import React from 'react';
import styled from 'styled-components';

/**
 * Props
 */


/**
 * Styles
 */


/**
 * Styled Components
 */
const DocumentTemplateContainer = styled.div`
    display: flex;
`;

const DocumentTemplateWrapper = styled.div`
    display: flex;
    text-align: center;
`;

/**
 * Main Component
 */
const DocumentTemplate = () => {

    return (
        <DocumentTemplateContainer>
            <DocumentTemplateWrapper>
                Document Template
            </DocumentTemplateWrapper>
        </DocumentTemplateContainer>
    )
}

export default DocumentTemplate;
