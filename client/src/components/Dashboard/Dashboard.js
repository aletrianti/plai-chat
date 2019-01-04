import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/actionsPost';
import Posts from '../sub-components/Post/Posts';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.post;
        let postContent;

        if (posts === null) {
            postContent = 'No posts yet...'
        } else {
            postContent = <Posts posts={posts}/>
        }

        return (
            <div className="app-dashboard">
                <aside className="dashboard-aside">
                    <Link to="new-post">Create a new post</Link>
                </aside>

                <div className="dashboard-content">
                    { postContent }
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    post: state.post,
    errors: state.errors
});

export default connect(stateProps, { getPosts })(Dashboard);
