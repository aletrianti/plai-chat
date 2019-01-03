import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../../../actions/actionsAuth';

import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        // Check if the user is authenticated
        // Then redirect to the dashboard
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        // If there are errors, return them
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.login(data);
    }
    
    render() {
        const { errors } = this.state;

        return (
        <div className="app-login">
            <form className="login-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className={classnames('form-group-input', {'invalid': errors.email})} name="email" placeholder="e-mail" value={this.state.email} onChange={this.onChange}/>
                    {errors.email && (<div className="form-error">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input type="password" className={classnames('form-group-input', {'invalid': errors.password})} name="password" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                    {errors.password && (<div className="form-error">{errors.password}</div>)}
                </div>

                <input type="submit" value="Login"/>
            </form>
        </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(stateProps, { login })(Login);
