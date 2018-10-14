import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { operations } from '../../../state/auth';
import { CenterInfo } from '../../components/general';

const queryString = require('query-string');

/* eslint camelcase: 0 */

class LoginResult extends Component {
    state = {
        loading: false,
        error: '',
    };

    componentDidMount() {
        const { location, validateLogin, history } = this.props;

        clearTimeout(this.loadingTimeout);
        this.loadingTimeout = setTimeout(() => {
            this.setState({ loading: true });
        }, 200);

        const {
            access_token = '',
            token_type = '',
            expires_in = '',
            state = '',
        } = queryString.parse(location.hash);

        validateLogin(access_token, token_type, expires_in, state).then(({ error }) => {
            clearTimeout(this.loadingTimeout);
            if (error) {
                this.setState({ loading: false, error });
            } else {
                history.push('/');
            }
        });
    }

    render() {
        const { loading, error } = this.state;

        return (
            <CenterInfo>
                {loading && 'Logging in...'}
                {error && 'An error occurred, please try again'}
            </CenterInfo>
        );
    }
}

LoginResult.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        validateLogin: (code, state, error) =>
            dispatch(operations.validateLogin(code, state, error)),
    };
};

const ConnectedLoginResult = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginResult)
);

export { ConnectedLoginResult as LoginResult };