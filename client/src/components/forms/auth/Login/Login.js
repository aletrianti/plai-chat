import React, { Component } from 'react';
import classnames from 'classnames';

import './Login.css';

export default class Login extends Component {
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user);
    }
    
    render() {
        const { errors } = this.state;

        return (
        <form className="login-form" onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="text" className={classnames('form-group-input', {'invalid': errors.email})} name="email" placeholder="e-mail" value={this.state.email} onChange={this.onChange}/>
                {errors.email && (<div className="form-error">{errors.email}</div>)}
            </div>
            <div className="form-group">
                <input type="text" className={classnames('form-group-input', {'invalid': errors.password})} name="password" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                {errors.password && (<div className="form-error">{errors.password}</div>)}
            </div>

            <input type="submit" value="Login"/>
        </form>
        )
    }
}
