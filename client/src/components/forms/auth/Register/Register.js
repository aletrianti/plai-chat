import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

import './Register.css';

export default class Register extends Component {
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
        axios
            .post('/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors: err.response.data}));
    }
    
    render() {
        const { errors } = this.state;

        return (
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
                <input type="text" className={classnames('form-group-input', {'invalid': errors.password})} name="password" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                {errors.password && (<div className="form-error">{errors.password}</div>)}
            </div>
            <div className="form-group">
                <input type="text" className={classnames('form-group-input', {'invalid': errors.password2})} name="password2" placeholder="password2" value={this.state.password2} onChange={this.onChange}/>
                {errors.password2 && (<div className="form-error">{errors.password2}</div>)}
            </div>

            <input type="submit" value="Sign up with e-mail"/>
        </form>
        )
    }
}