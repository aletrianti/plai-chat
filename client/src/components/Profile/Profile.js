import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, currentProfileWithId } from '../../actions/actionsProfile';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/actionsPost';
import Posts from '../sub-components/Post/Posts';

import './Profile.css';

class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.user_id) {
            this.props.currentProfileWithId(this.props.match.params.user_id);
        }

        this.props.getPosts();
    }

    onDelete(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile } = this.props.profile;
        const { posts } = this.props.post;
        
        let profileContent;
        let profileButtons;
        let postContent;

        if (profile === null) {
            profileContent = (
                <div className="profile-user-info no-profile">
                    <h2>Welcome, { user.name }!</h2>
                    <h3>Start creating your profile...</h3>
                </div>
            )
            profileButtons = (
                <div>
                    <Link to='/create-profile' className="btn-profile create-profile">Create profile</Link>
                </div>
            )
        } else {
            if (Object.keys(profile).length > 0) {
                profileContent = (
                    <div className="profile-user-info">
                        <img src={require("../../assets/icons/user_profile_pic.png")} alt="user profile" />
                        <div className="user-handle-bio">
                            <h2>{ profile.handle }</h2>
                            <p>{ profile.bio }</p>
                        </div>    
                    </div>
                )
                profileButtons = (
                    <div>
                        <Link to='/edit-profile' className="btn-profile edit-btn">Edit profile</Link>
                        <button onClick={this.onDelete.bind(this)} className="btn-profile delete-btn">Delete account</button>
                    </div>
                )
            } 
        }

        if (posts === null) {
            postContent = (
                <span className="center-message">No posts yet... Refresh the page.</span>
            )
        } else {
            postContent = <Posts posts={posts} />
        }

        return (
            <div className="app-profile">
                <aside className="profile-aside">
                    { profileButtons }
                </aside>

                <div className="profile-info">
                    { profileContent }

                    <div className="user-posts">
                        { postContent }
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
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    profile: state.profile,
    post: state.post,
    auth: state.auth
});

export default connect(stateProps, { deleteAccount, currentProfileWithId, getPosts })(Profile);
