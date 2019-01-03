import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { register } from '../../../../actions/actionsAuth';
import { withRouter } from 'react-router-dom';

import './Register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.register(newUser, this.props.history);
    }
    
    render() {
        const { errors } = this.state;

        return (
        <div className="app-register">
            <form className="register-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className={classnames('form-group-input', {'invalid': errors.name})}  name="name" placeholder="name" value={this.state.name} onChange={this.onChange}/>
                    {errors.name && (<div className="form-error">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input type="text" className={classnames('form-group-input', {'invalid': errors.email})} name="email" placeholder="e-mail" value={this.state.email} onChange={this.onChange}/>
                    {errors.email && (<div className="form-error">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input type="password" className={classnames('form-group-input', {'invalid': errors.password})} name="password" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                    {errors.password && (<div className="form-error">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input type="password" className={classnames('form-group-input', {'invalid': errors.password2})} name="password2" placeholder="password2" value={this.state.password2} onChange={this.onChange}/>
                    {errors.password2 && (<div className="form-error">{errors.password2}</div>)}
                </div>

                <input type="submit" value="Sign up with e-mail"/>
            </form>
        </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(stateProps, { register })(withRouter(Register));