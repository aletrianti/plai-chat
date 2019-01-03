import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, currentProfile } from '../../../actions/actionsProfile';
import isEmpty from '../../../validation/empty';

import './EditProfile.css';

class EditProfile extends Component {
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

    componentDidMount() {
        this.props.currentProfile();
    }

    componentWillReceiveProps(nextProps) {
        // If there are errors, return them
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }

        // Check if there is a profile 
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            
            // If profile fields are empty, make is a ''
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            // If profile fields are not empty, fill them in with existing data
            this.setState({
                handle: profile.handle,
                bio: profile.bio
            });
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
            <div className="app-edit-profile">
                <div className="form-text">
                    <h1>Edit your profile</h1>
                </div>
                
                <form className="edit-profile-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className={classnames('form-group-input', {'invalid': errors.handle})} name="handle" placeholder="Enter a nickname *" value={this.state.handle} onChange={this.onChange}/>
                        {errors.handle && (<div className="form-error">{errors.handle}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea type="text" className={classnames('form-group-input', {'invalid': errors.bio})} name="bio" placeholder="Enter a bio" value={this.state.bio} onChange={this.onChange}></textarea>
                        {errors.bio && (<div className="form-error">{errors.bio}</div>)}
                    </div>

                    <input className="form-button" type="submit" value="Edit"/>
                </form>
            </div>
        )
    }
}

EditProfile.propTypes = {
    currentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(stateProps, { createProfile, currentProfile })(withRouter(EditProfile));
