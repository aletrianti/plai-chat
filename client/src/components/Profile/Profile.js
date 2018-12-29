import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currentProfile } from '../../actions/actionsProfile';
import { Link } from 'react-router-dom';

class Profile extends Component {
    componentDidMount() {
        this.props.currentProfile();
    }

    render() {
        const { user } = this.props.auth;
        const { profile } = this.props.profile;
        let profileContent;

        if (profile === null) {
            profileContent = <h2>Loading...</h2>;
        } else {
            if (Object.keys(profile).length > 0) {
                // display profile
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
            <div className="profile">
                { profileContent }
            </div>
        )
    }
}

Profile.propTypes = {
    currentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(stateProps, {currentProfile})(Profile);
