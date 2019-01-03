import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, currentProfileWithId } from '../../actions/actionsProfile';
import { Link } from 'react-router-dom';

import './Profile.css';

class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.user_id) {
            this.props.currentProfileWithId(this.props.match.params.user_id);
        }
    }

    onDelete(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile } = this.props.profile;
        let profileContent;
        let profileButtons;

        if (profile === null) {
            profileContent = (
                <div>
                    <h2>Welcome, { user.name }!</h2>
                    <h3>Start creating your profile...</h3>
                </div>
            )
            profileButtons = (
                <div>
                    <Link to='/create-profile' className="btn-profile">Create profile</Link>
                </div>
            )
        } else {
            if (Object.keys(profile).length > 0) {
                profileContent = (
                    <div>
                        <h2>{ profile.handle }</h2>
                        <p>{ profile.bio }</p>
                    </div>
                )
                profileButtons = (
                    <div>
                        <Link to='/edit-profile' className="btn-profile">Edit profile</Link>
                        <button onClick={this.onDelete.bind(this)} className="btn-profile btn-button">Delete account</button>
                    </div>
                )
            } 
        }

        return (
            <div className="app-profile">
                <aside className="profile-aside">
                    { profileButtons }
                </aside>

                <div className="profile-info">
                    { profileContent }

                    <div className="user-posts">
                        Posts here
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    currentProfileWithId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(stateProps, { deleteAccount, currentProfileWithId })(Profile);
