import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { ForgotPasswordNotification } from 'shared_components/src/components/login';

import store from '../../store';
import { forgotPasswordNotificationTestContents } from '../mocks/login/login';
import { getTestForContents } from '../common/utils';

const Component = () => {
    return (
        <Provider store={store}>
            <ForgotPasswordNotification />
        </Provider>
    );
};

describe('Test for Notification Modal "Forgot Password":', () => {
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
    getTestForContents(wrapper, forgotPasswordNotificationTestContents);
});
