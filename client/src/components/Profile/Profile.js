import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currentProfile, deleteAccount } from '../../actions/actionsProfile';
import { Link } from 'react-router-dom';

class Profile extends Component {
    componentDidMount() {
        this.props.currentProfile();
    }

    onDelete(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile } = this.props.profile;
        let profileContent;

        if (profile === null) {
            profileContent = <h2>Loading...</h2>;
        } else {
            if (Object.keys(profile).length > 0) {
                profileContent = (
                    <div>
                        <h2>{ profile.handle }</h2>
                        <p>{ profile.bio }</p>
                        <Link to='/edit-profile' className="btn">Edit profile</Link>
                        <button onClick={this.onDelete.bind(this)} className="btn-button">Delete account</button>
                    </div>
                )
            } else {
                profileContent = (
                    <div>
                        <h2>Welcome, { user.name }!</h2>
                        <h3>Start creating your profile...</h3>
                        <Link to='/create-profile' className="btn">Create profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="app-profile">
                { profileContent }
            </div>
        )
    }
}

Profile.propTypes = {
    currentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(stateProps, { currentProfile, deleteAccount })(Profile);
