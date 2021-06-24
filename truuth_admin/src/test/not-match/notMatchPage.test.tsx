import React from 'react';
import { mount } from 'enzyme';
import { NotMatch } from 'shared_components/src/components/common';
import { Provider } from 'react-redux';
import store from '../../store';
import { getTestForContents } from '../common/utils';
import { notMatchTestContents } from '../mocks/notMatch/notMatch';

const Component = () => {
    return (
        <Provider store={store}>
            <NotMatch />
        </Provider>
    );
};

describe('Test for notMatch page  :', () => {
    const wrapper = mount(<Component />);

    /**
     *  Check if redering.
     */
    it('Check rendering', () => {
        expect(wrapper).not.toBeNull();
    });

    /**
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, notMatchTestContents);
});
