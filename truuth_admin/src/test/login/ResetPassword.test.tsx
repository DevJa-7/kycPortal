import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { ResetPassword } from 'shared_components/src/components/login';

import store from '../../store';
import { resetPasswordTestContents } from '../mocks/login/login';
import { getTestForContents } from '../common/utils';

const Component = () => {
    return (
        <Provider store={store}>
            <ResetPassword />
        </Provider>
    );
};

describe('Test for Modal "Send Code":', () => {
    /**
     * Initialize
     */
    const wrapper = mount(<Component/>);

    /**
     *  Check if redering.
     */
    it('Check rendering', () => {
      expect(wrapper).not.toBeNull();
    });

    /**
     *  Check if some elements exist.
     */
    getTestForContents(wrapper, resetPasswordTestContents);
});
