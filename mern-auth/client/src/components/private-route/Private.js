import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Landing from '../layout/Landing';

const Private = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            auth.isAuthenticated === false ? (
                <Redirect to="/" component={Landing} />
            ) : (
                <Component {...props} />
            )
        }
    />
);

Private.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps) (Private);