import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/actionsProfile';

import './CreateProfile.css';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            bio: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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
            handle: this.state.handle,
            bio: this.state.bio,
        }
        this.props.createProfile(data, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="app-create-profile">
                <div className="form-text">
                    <h1>Create your profile</h1>
                    <h4>* = required fields</h4>
                </div>
                
                <form className="create-profile-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className={classnames('form-group-input', {'invalid': errors.handle})} name="handle" placeholder="Enter a nickname *" value={this.state.handle} onChange={this.onChange}/>
                        {errors.handle && (<div className="form-error">{errors.handle}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea type="text" className={classnames('form-group-input', {'invalid': errors.bio})} name="bio" placeholder="Enter a bio" value={this.state.bio} onChange={this.onChange}></textarea>
                        {errors.bio && (<div className="form-error">{errors.bio}</div>)}
                    </div>

                    <input className="form-button" type="submit" value="Confirm"/>
                </form>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(stateProps, { createProfile })(withRouter(CreateProfile));
